+++
date = '2026-03-22T02:19:30+09:00'
draft = false
title = 'Paging Implementation'
categories = ['Project OS']
+++

# 개요

- x86_64 환경에서 4-level paging을 초기화하고 커널 영역을 identity mapping 하는 과정을 구현
- PML4/PDPT/PD/PT 계층 구조 작성
- 가상 주소 → 물리 주소 매핑 함수 구현
- CR3 레지스터를 통한 paging 활성화

# 개념

x86_64는 4단계 페이지 테이블 구조를 사용함:

![sdm-vol-1-2abcd-3abcd-4_3268_1.png](img/sdm-vol-1-2abcd-3abcd-4_3268_1.png#dark-invert)

- PML4 (Level 4)
- PDPT (Level 3)
- PD (Level 2)
- PT (Level 1)
- 각 테이블은 512 entries (9bit index)로 구성됨

```
┌────────────────┬──────────────────┬────────────────┬──────────────────┬──────────────────────┐
│      PML4      │       PDPT       │       PD       │        PT        │        Offset        │
└────────────────┴──────────────────┴────────────────┴──────────────────┴──────────────────────┘
 47            39 38              30 29            21 20              12 11                   0
```

- 가상 주소는 위와 같이 구성되므로 이를 기반으로 각 레벨의 인덱스를 계산함

```c
pml4_i = (va >> 39) & 0x1FF; // 0x1FF = 0b0001_1111_1111 (9bit)
pdpt_i = (va >> 30) & 0x1FF;
pd_i   = (va >> 21) & 0x1FF;
pt_i   = (va >> 12) & 0x1FF;
```

# 설계

## 데이터 구조

```c
typedef uint64_t pte_t;             // Page Table Entry
typedef uint64_t page_table_t[512]; // Page Table (512 entries)
```

- 각 entry는 64-bit
- 각 테이블에는 512개의 entries가 존재함

![image.png](img/image.png#dark-invert)

- 플래그는 많지만 현재 구현에서 필요한 것만 사용함

```c
#define PAGE_PRESENT    (1ULL << 0)  // 페이지 존재 여부
#define PAGE_RW         (1ULL << 1)  // Read/Write 허용
#define PAGE_USER       (1ULL << 2)  // User 접근 가능
#define PAGE_GLOBAL     (1ULL << 8)  // TLB에서 flush되지 않는 페이지
#define PAGE_NX         (1ULL << 63) // Execute 금지
```

# 구현

## Entry 생성

```c
static inline uint64_t make_entry(uint64_t phys, uint64_t flags) {
    return (phys & PAGE_ADDR_MASK) | flags;
}
```

- 페이지 테이블 엔트리를 생성하는 함수
- 물리 주소 부분과 속성 플래그 부분을 하나의 64-bit 값으로 합쳐서 CPU가 해석할 수 있는 엔트리 형태로 만듦
- 매핑할 물리 주소(`phys`)와 엔트리에 넣을 플래그 비트(`flags`)를 인자로 받음

### 동작

```c
// #define PAGE_ADDR_MASK  0x000FFFFFFFFFF000ULL
(phys & PAGE_ADDR_MASK) | flags;
```

- `phys & PAGE_ADDR_MASK`: 물리 주소에서 주소로 유효한 비트만 남김
- `| flags`: bitwise OR 연산을 하여 속성 비트 추가함

## Paging 초기화

```c
void paging_init(void) {
    uint64_t* pml4 = pmm_alloc_page();
    memset(pml4, 0, PAGE_SIZE);

    uint64_t start = (uint64_t)&_kernel_start;
    uint64_t end   = (uint64_t)&_kernel_end;

    // page align
    start &= ~0xFFF;
    end = (end + 0xFFF) & ~0xFFF;

    for (uint64_t addr = start; addr < end; addr += PAGE_SIZE) {
        map_page(pml4, addr, addr, PAGE_RW);
    }

    // CR3 switch
    load_cr3((uint64_t)pml4);
}
```

- 새로운 PML4를 만들고 커널 영역을 identity mapping 한 뒤, CR3를 통해 이 페이지 테이블을 활성화함

### PML4 할당 + 초기화

```c
uint64_t* pml4 = pmm_alloc_page();
memset(pml4, 0, PAGE_SIZE);
```

- PMM에서 프레임 하나 할당 받음
- 이걸 PML4 테이블로 사용함
- 모든 entry를 0으로 초기화함

### 커널 영역

```c
ENTRY(_start)

SECTIONS
{
  . = 1M;

  _kernel_start = .;

  .multiboot2 : ALIGN(8) { *(.multiboot2) }

  .text : ALIGN(16) { *(.text*) }
  .rodata : ALIGN(16) { *(.rodata*) }
  .data : ALIGN(16) { *(.data*) }
  .bss : ALIGN(16) {
    __bss_start = .;
    *(COMMON) *(.bss*)
    __bss_end = .;
  }

  _kernel_end = ALIGN(4096);
}
```

```c
uint64_t start = (uint64_t)&_kernel_start;
uint64_t end   = (uint64_t)&_kernel_end;
```

- 링커 스크립트에서 정의된 심볼로 커널의 코드/데이터가 메모리에 올라간 범위를 얻음

### 페이지 정렬

```c
// page align
start &= ~0xFFF;
end = (end + 0xFFF) & ~0xFFF;
```

- start → 아래로 정렬 (floor)
- end → 위로 정렬(ceil)
- 페이지 단위로 mapping 하기 위함

### identity mapping

```c
for (uint64_t addr = start; addr < end; addr += PAGE_SIZE) {
    map_page(pml4, addr, addr, PAGE_RW);
}
```

- 커널이 현재 사용 중인 물리 주소를 그대로 가상 주소로 접근 가능하게 만듦
- 즉 가상 주소 == 물리 주소임
- 구현이 매우 단순하지만 유저/커널 분리 불가능하며 보안에 매우 취약함
- 또한 주소 공간 활용이 비효율적임
- 일단은 구현이 비교적 쉬우니깐 이걸로 구현함
- paging 켜기 전에 이미 실행 중인 코드가 paging 켠 후에도 같은 주소에서 실행되어야 하므로 identity mapping을 사용함

### CR3 로드

```c
// CR3 switch
load_cr3((uint64_t)pml4);
```

- CPU에게 생성한 pml4를 사용하라고 지시

```c
static inline void load_cr3(uint64_t pml4_phys) {
    asm volatile(
		    "mov %0, %%cr3"
		    :
		    : "r"(pml4_phys)
		    : "memory"
		);
}
```

- `pml4_phys`를 `CR3` 레지스터에 넣어 새로운 PML4를 기준으로 주소 변환을 하도록 함

## 가상 주소 매핑

```c
void map_page(uint64_t* pml4, uint64_t va, uint64_t pa, uint64_t flags);
```

- 주어진 가상 주소 `va`가 물리 주소 `pa`를 가리키도록 4단계 페이지 테이블을 따라 내려가며 필요한 테이블을 생성하고 PT entry를 설정하는 역할을 함

### 가상 주소 분해

```c
uint64_t pml4_i = (va >> 39) & 0x1FF;
uint64_t pdpt_i = (va >> 30) & 0x1FF;
uint64_t pd_i   = (va >> 21) & 0x1FF;
uint64_t pt_i   = (va >> 12) & 0x1FF;
```

- 가상 주소를 4단계 index로 분해
- 각 단계에서 사용할 entry 번호를 계산함

### PML4 → PDPT

```c
if (!(pml4[pml4_i] & PAGE_PRESENT)) {
    uint64_t* pdpt = pmm_alloc_page();
    memset(pdpt, 0, PAGE_SIZE);
    pml4[pml4_i] = make_entry((uint64_t)pdpt, PAGE_PRESENT | PAGE_RW);
}
```

- 해당 PML4 entry가 비어 있으면 새로운 PDPT 테이블을 할당하고 엔트리를 생성하여 연결함

```c
uint64_t* pdpt = (uint64_t*)(pml4[pml4_i] & PAGE_ADDR_MASK);
```

- entry에서 주소 부분만 추출하여 PDPT 포인터로 사용
- 이후 PDPT→PD/PD→PT도 마찬가지 방법으로 진행

### PT

```c
pt[pt_i] = make_entry(pa, flags | PAGE_PRESENT);
```

- PT의 entry에 물리 주소 + flags 기록
- 이 시점에서 mapping이 완료 됨

### 결과

- 이 함수를 실행한 이후에는 va→pa가 성립하며 CPU는 page walk를 통해 해당 물리 주소에 접근할 수 있게 됨

# 한계점

- 지금 구현된 페이징은 identity mapping 기반의 minimal 페이징임
- 커널 실행을 위한 최소한의 기능만 구현했고 다음 장부터는 운영체제 수준의 메모리 관리 기능을 구현할 예정임