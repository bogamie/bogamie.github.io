+++
date = '2026-03-25T13:47:46+09:00'
draft = false
title = 'Higher Half Kernel'
categories = ['OS Project']
+++
## Identity Mapping의 한계

- **가상 주소 공간 낭비**
    - 물리 주소와 동일하게 매핑하므로, 가상 주소 공간을 유연하게 활용하지 못함
- **커널/유저 공간 분리 부족**
    - identity mapping만 사용할 경우 커널과 유저 공간이 명확히 분리되지 않음
    - 보안 및 안정성 측면에서 취약 (잘못된 접근 시 커널 메모리 손상 가능)
- **확장성 제한**
    - 물리 메모리 크기에 직접적으로 의존
    - 고용량 메모리 시스템에서 유연한 메모리 관리 어려움
- **메모리 보호 기능 활용 제한**
    - paging의 주요 목적 중 하나인 접근 제어(read/write/execute) 활용이 제한적
    - 커널 메모리 보호, guard page 설정 등이 어려움
- **커널 relocation 불가능**
    - 커널이 특정 물리 주소에 고정됨
    - 부트로더나 하드웨어 환경에 따라 유연한 로딩이 어려움
- **Higher-Half Kernel로의 전환 필요성**
    - 커널을 고정된 높은 가상 주소(예: 0xC0000000 이상)에 배치
    - 사용자 공간과 명확히 분리
    - 물리 메모리와 독립적인 가상 주소 설계 가능
- **결론**
    - Identity mapping은 초기 부트 단계에서는 유용하지만,
    - 운영체제 커널 설계에서는 **보안, 확장성, 유연성 측면에서 한계가 명확**함
    - 따라서 대부분의 현대 OS는 higher-half kernel 구조를 채택함

# VMA vs LMA

## VMA

> Virtual Memory Address
> 
- 프로세스(실행 중인 프로그램)가 참조하는 논리적인 메모리 주소

```
KERNEL_VMA = 0xFFFFFFFF80000000;
```

- 커널은 상위 가상 주소 영역(high-half)에 배치됨

## LMA

> Load Memory Address
> 
- 컴파일된 프로그램의 특정 섹션(코드나 데이터)이 ROM, 플래시 메모리, 또는 디스크와 같은 저장 매체에 **실제로 적재(Load)되어 있는 물리적인 주소**

```
KERNEL_LMA = 0x100000;
```

- 여기서 커널은 물리적으로 대략 1MiB 위치에 실린다고 설정됨

## 결론

- 커널은 실제로는 1MiB 근처 물리 메모리에 로드되지만 실행은 `0xFFFFFFFF80000000` 같은 높은 가상 주소에서 수행함
- 정리하면
    - 부트로더가 커널 이미지를 물리 메모리 `0x100000`에 올림
    - 초기 부트 코드가 페이지 테이블을 세팅
    - 물리 `0x100000` 일대를 `0xFFFFFFFF80000000`에 매핑
    - 이후 커널은 high-half 주소로 실행

# linker.ld

```
ENTRY(_start)

KERNEL_VMA = 0xFFFFFFFF80000000;
KERNEL_LMA = 0x100000;

SECTIONS
{
  . = KERNEL_VMA;

  _kernel_start = .;

  .multiboot2 : AT(KERNEL_LMA) ALIGN(8)
  {
    *(.multiboot2)
  }

  .text : ALIGN(16) AT(ADDR(.text) - KERNEL_VMA + KERNEL_LMA)
  {
    *(.text*)
  }

  .rodata : ALIGN(16) AT(ADDR(.rodata) - KERNEL_VMA + KERNEL_LMA)
  {
    *(.rodata*)
  }

  .data : ALIGN(16) AT(ADDR(.data) - KERNEL_VMA + KERNEL_LMA)
  {
    *(.data*)
  }

  .bss : ALIGN(16) AT(ADDR(.bss) - KERNEL_VMA + KERNEL_LMA)
  {
    __bss_start = .;
    *(COMMON) *(.bss*)
    __bss_end = .;
  }

  _kernel_end = ALIGN(4096);
}
```

- 실행 시 가상 주소(VMA)는 `0xFFFFFFFF80000000`부터 시작
- 실제 파일/메모리 적재 주소(LMA)는 `0x100000`(1 MiB) 부근에 놓이게 함

## `ENTRY(_start)`

```
ENTRY(_start)
```

- 프로그램의 엔트리 포인트(entry point)를 `_start` 심볼로 지정함
- ELF 헤더의 entry address는 `_start`가 위치한 주소가 됨
- 보통 `_start`는 부트 직후 가장 먼저 실행되는 어셈블리 진입점임

## 상수 정의

```
KERNEL_VMA = 0xFFFFFFFF80000000;
KERNEL_LMA = 0x100000;
```

- 링커 스크립트 내에서 사용하는 상수 심볼
    - `KERNEL_VMA`: 커널이 실행될 가상 시작 주소
    - `KERNEL_LMA`: 커널이 로드될 물리 시작 주소

## `SECTIONS { … }`

```
SECTIONS
{
	...
}
```

- 이 블록 안에서 최종 ELF의 섹션 배치가 결정됨

## 위치 카운터 `.`

- `.`은 현재 위치 카운터(location counter)임
- 다음 섹션을 어디에 배치할 것인지를 나타냄

```
. = KERNEL_VMA;
```

- 이 코드에서는
    - 현재 주소를 `0xFFFFFFFF80000000`으로 설정
    - 이후 나오는 출력 섹션들은 기본적으로 이 주소부터 시작함
- 커널의 VMA 기준 시작 주소를 정한 것임

## `_kernel_start = .;`

```
_kernel_start = .;
```

- 현재 위치 카운터 값을 `_kernel_start`라는 심볼에 저장함
- 현재 `.`은 `KERNEL_VMA`이므로 `_kernel_start == 0xFFFFFFFF80000000`과 같음

## `.multiboot2` 섹션

```
.multiboot2 : AT(KERNEL_LMA) ALIGN(8)
{
  *(.multiboot2)
}
```

- Multiboot2를 사용하는 부트로더(예: GRUB)는 커널 이미지 안에서 Multiboot2 헤더를 찾음
- `ALIGN(8)`: 8바이트 정렬, 섹션의 시작 주소를 8의 배수에 맞춤
- `AT(KERNEL_LMA)`: 섹션의 LMA를 `0x100000`으로 강제함
- Multiboot2 spec상 헤더는 **low memory (첫 몇 MB)** 안에 있어야 함

## `.text` 섹션

```
.text : ALIGN(16) AT(ADDR(.text) - KERNEL_VMA + KERNEL_LMA)
{
  *(.text*)
}
```

- 실행 가능한 코드 섹션
    - 커널 초기화 함수
    - 일반 C 함수
    - 인터럽트 핸들러 코드 등
- `ALIGN(16)`: `.text` 시작 주소를 16바이트 경계에 맞춤
- `AT(ADDR(.text) - KERNEL_VMA + KERNEL_LMA)`
    - `ADDR(.text)`: `.text`의 VMA 주소를 의미
    - 만약 `.text`가 가상 주소 `0xFFFFFFFF80001000`에 시작한다고 하면, `ADDR(.text) = 0xFFFFFFFF80001000`임
    - `ADDR(.text) - KERNEL_VMA + KERNEL_LMA` = text의 가상주소 - 커널 가상 시작주소 + 커널 물리 시작주소

### 예시

- 가정
    - `KERNEL_VMA = 0xFFFFFFFF80000000`
    - `KERNEL_LMA = 0x00100000`
    - `.text` VMA = `0xFFFFFFFF80001000`
- `.text`의 LMA는:

```
0xFFFFFFFF80001000
- 0xFFFFFFFF80000000
+ 0x00100000
= 0x00101000
```

- 즉
    - 실행 주소: `0xFFFFFFFF80001000`
    - 로드 주소: `0x00101000`

## `.rodata` 섹션

```
.rodata : ALIGN(16) AT(ADDR(.rodata) - KERNEL_VMA + KERNEL_LMA)
{
  *(.rodata*)
}
```

- 읽기 전용 데이터 섹션
    - 문자열 리터럴
    - `const` 전역 변수
    - 점프 테이블
    - 읽기 전용 테이블 데이터

## `.data` 섹션

```
.data : ALIGN(16) AT(ADDR(.data) - KERNEL_VMA + KERNEL_LMA)
{
  *(.data*)
}
```

- 초기값이 있는 쓰기 가능한 전역/정적 변수

## `.bss` 섹션

```
.bss : ALIGN(16) AT(ADDR(.bss) - KERNEL_VMA + KERNEL_LMA)
{
  __bss_start = .;
  *(COMMON) *(.bss*)
  __bss_end = .;
}
```

- 초기값이 없는 전역/정적 변수

## `_kernel_end = ALIGN(4096);`

```
_kernel_end = ALIGN(4096);
```

- 현재 위치를 기준으로 **다음 4096바이트 경계로 올림한 주소**를 `_kernel_end`에 저장

## 실행 결과

### 가상 주소

```
0xFFFFFFFF80000000   _kernel_start
    [ .multiboot2 ]
    [ .text       ]
    [ .rodata     ]
    [ .data       ]
    [ .bss        ]
0xFFFFFFFF8000xxxx   _kernel_end (page aligned)
```

### 물리 적재 주소

```
0x00100000           .multiboot2 LMA
    [ .text      ]
    [ .rodata    ]
    [ .data      ]
    [ .bss       ]
0x0010xxxx
```