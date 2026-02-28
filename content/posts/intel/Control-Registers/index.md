+++
date = '2026-03-01T01:14:44+09:00'
draft = false
title = 'Control Registers'
categories = ['Intel']
+++
![sdm-vol-3a_73.png](img/sdm-vol-3a_73.png#dark-invert)

- control register는 프로세서의 operating 모드와 현재 실행 중인 태스크의 특성을 결정함
    - 32bit 모드와 compatibility 모드에서 32bits 크기를 가짐

# 64-bit 모드

- 64-bit 모드에서는 64bits 크기로 확장됨
- `MOV CRn` 명령어를 사용해서 해당 레지스터의 비트를 조작함
    - 이 명령어에 대한 오퍼랜드 크기의 prefix는 무시됨
- MOV 명령어의 control register 간 이동 형식을 사용하여 읽고 쓸 수 있음
- protected 모드에서 MOV 명령어는 privilege level 0에서만 제어 레지스터를 읽거나 로드할 수 있도록 허용함

---

# CR0

![sdm-vol-1-2abcd-3abcd-4_3208.png](img/bffcb2f2-4137-4e4b-8c72-b0d0ac32cea3.png#dark-invert)

- 프로세서의 operating 모드와 상태를 제어하는 시스템 제어 플래그를 포함

## CR0.PG

- **Paging**
- 1이면 페이징 활성화, 0이면 비활성화
- 페이징이 꺼져 있으면 선형 주소는 물리 주소로 간주함
- PE 플래스가 1이어야 PG 플래그가 유효함
    - PE=0인데 PG=1로 설정하면 → general-protection exception (#GP) 발생
- Intel 64 프로세서에서 IA-32e 모드 활성화/비활성화 시에도 PG 비트 수정 필요

## CR0.PE

- **Protection Enable**
- PE = 1 → protected mode 활성화
- PE = 0 → real-address mode 활성화
- 이 플래그는 paging을 직접 활성화하지 않음
- 세그먼트 수준의 보호 기능만 활성화함
- paging을 활성화하려면 PE와 PG 플래그를 모두 설정해야 함

## CR0.WP

- **Write Protect**
- WP = 1 → supervisor-level에서도 read-only 페이지에 대한 쓰기가 금지됨
- WP = 0 → supervisor-level에서는 U/S 비트 설정과 관계없이 read-only 페이지에 쓰기가 가능함
- UNIX와 같은 운영체제가 fork 시 사용하는 copy-on-write 기법 구현을 용이하게 함
- 소프트웨어가 CR4.CET를 설정하기 전에 반드시 CR0.WP가 설정되어 있어야 함
- CR4.CET = 1인 동안에는 CR0.WP를 클리어할 수 없음
- 기타
    
    ## CR0.CD
    
    - **Cache Disable**
    - CD=0, NW=0 → CPU 캐시 시스템이 전체 물리 메모리에 대해 활성화됨
    - CD=1 → 캐시 사용이 제한됨
    - 프로세서의 캐시 접근을 완전히 막으려면:
        - CD=1로 설정
        - 캐시를 무효화(invalidate) 해야 함 (캐시 히트 방지)
    
    ## CR0.NW
    
    - **Not Write-through**
    - NW=0, CD=0 → 캐시 write-back(또는 구형 CPU에선 write-through) 활성화
    - 캐시에 히트한 쓰기 동작에 대해
        - 최신 프로세서: **write-back 방식**
        - Intel486: **write-through 방식**
    - CD와 NW 조합에 따라 캐시 동작 방식이 달라짐
    
    ![sdm-vol-1-2abcd-3abcd-4_3615.png](img/sdm-vol-1-2abcd-3abcd-4_3615.png#dark-invert)
    
    ## CR0.AM
    
    - **Alignment Mask**
    - AM = 1 → 자동 정렬 검사(alignment checking)를 활성화함
    - AM = 0 → 정렬 검사 비활성화
    - 정렬 검사는 다음 조건을 모두 만족할 때만 수행됨
        - CR0.AM = 1
        - EFLAGS 레지스터의 AC 플래그 = 1
        - CPL = 3
        - 프로세서가 protected 또는 virtual-8086 모드에서 동작 중

---

# CR1

- 예약됨

---

# CR2

![sdm-vol-1-2abcd-3abcd-4_3208.png](img/99c672c2-ec0a-4850-8ddb-2d56e6f8c52b.png#dark-invert)

- page-fault linear 주소(page fault를 발생시킨 linear 주소)를 포함함

---

# CR3

![sdm-vol-1-2abcd-3abcd-4_3208.png](img/7780acee-f7d6-428a-9fb2-a7514acd66d1.png#dark-invert)

- 현재 활성화된 페이징 구조체의 최상위 테이블의 물리 주소(Physical Address)를 저장
- 베이스 주소는 상위 비트들만 지정됨(하위 12비트 제외)
- 하위 12비트는 0으로 간주함
    
    → 페이지 테이블은 4KB 경계에 정렬되어야 함
    
- PCD, PWT 플래그는 해당 페이징 구조체의 캐싱 정책을 결정
- LAM_U57, LAM_U48 플래그는 사용자 주소에 대한 linear-address 마스킹을 제어함
- Physical Address Extension(PAE)를 사용할 경우, CR3 레지스터는 page-directory-pointer table의 베이스 주소를 포함
- 4단계 페이징에서는 CR3 레지스터가 PML4 테이블의 베이스 주소를 포함
- PCID가 활성화된 경우, CR3의 형식은 위 그림과 다름

## CR3.LAM_U48

- **User LAM48 enable**
- LAM_U48 = 1 && LAM_U57 = 0 → LAM48 활성화됨
- LAM48은 유저 포인터에 대해 선형 주소의 비트 62:48을 마스킹함

## CR3.LAM_U57

- **User LAM57 enable**
- LAM_U57 = 1 → 유저 포인터에 대해 LAM57이 활성화됨
                            CR3.LAM_U48보다 우선되어 이를 override함
- LAM57은 선형 주소의 비트 62:57을 마스킹함

## CR3.PCD

- **Page-level Cache Disable**
- 현재 페이징 구조 계층의 첫 번째 페이징 구조에 접근할 때 사용되는 메모리 타입을 제어함
- 아래 경우에는 이 비트가 사용되지 않음
    - 페이징이 비활성화된 경우
    - PAE 페이징 사용 시
    - 4레벨 또는 5레벨 페이징에서 CR4.PCIDE = 1인 경우

## CR3.PWT

- **Page-level Write-Through**
- CR3.PCD와 동일

---

# CR4

![sdm-vol-1-2abcd-3abcd-4_3208.png](img/2612fdf2-0834-44ea-8bb3-70388c6a0cce.png#dark-invert)

- 여러 아키텍처 확장을 활성화하고 특정 프로세서 기능에 대한 운영체제 또는 실행 환경의 지원 여부를 나타내는 플래그 집합을 포함함
- CR4[63:32] 비트는 IA-32e 모드에서만 사용할 수 있는 기능들을 위한 것
64-bit 모드에 진입한 이후에 활성화됨
IA-32e 모드가 아닐 때는 아무런 영향을 주지 않음

## CR4.PCIDE

- **PCID-Enable**
- PCIDE = 1 → process-context identifier(PCID) 기능이 활성화됨
- IA-32e 모드에서만 적용됨
- IA32_EFER.LMA = 1일 때만 의미가 있음

## CR4.LA57

- 57-bit linear addresses
- IA-32e 모드일 때,
    - LA57 = 1 → 5-level paging을 사용하고 57비트 선형 주소를 변환함
    - LA57 = 0 → 4-level paging을 사용하고 48비트 선형 주소를 변환함
- IA-32e 모드에서는 수정할 수 없으므로 들어가기 전 미리 설정해야 함

## CR4.PGE

- **Page Global Enable**
- PGE = 1 → global page 기능 활성화
- PGE = 0 → global page 기능 비활성화
- Global page 기능은 자주 사용되거나 공유되는 페이지를 모든 사용자에 대해 global로 표시할 수 있게 함
- Global 표시는 다음 엔트리의 비트 8(global page)로 설정됨
    - Page-directory-pointer-table entry
    - Page-directory entry
    - Page-table entry
- Global page는 다음 경우에도 translation-lookaside buffer(TLB)에러 flush되지 않음
    - 태스트 전환 시
    - CR3 레지스터에 쓰기 수행 시
- Global page 기능을 활성화할 때는
    - CR0.PG를 설정하여 페이징을 활성화해야 함
    - 그 다음에 CR4.PGE를 설정해야 함
    - 이 순서를 반대로 하면 프로그램 정확성과 프로세서 성능에 영향을 줄 수 있음

## CR4.PAE

- **Physical Address Extension**
- PAE = 1 → 32비트를 초과하는 물리 주소를 생성하는 페이징이 활성화 됨
- PAE = 0 → 물리 주소가 32비트로 제한됨
- IA-32e 모드에 진입하기 전에 반드시 설정되어 있어야 함

---

# CR8

![sdm-vol-1-2abcd-3abcd-4_3208.png](img/bc1b5358-f3be-4ad6-9fd1-d71d9000b524.png#dark-invert)

- CR8[3:0]을 통해 로컬 APIC의 Task-Priority Register(TRR) 7:4번 비트에 읽고 쓰기 접근을 제공함
- CR8[3:0] 비트는 task-priority class를 의미하며 해당 task-priority class보다 낮은 모든 인터럽트는 차단됨
- 값이 15이면 모든 우선순위 클래스의 인터럽트를 차단함
- 값이 0이면 어떤 인터럽트도 차단하지 않음
- 64-bit 모드에서만 접근할 수 있음
- TPR 값에 대한 인터럽트 차단 효과는 프로세서의 모드에 상관없이 동작함