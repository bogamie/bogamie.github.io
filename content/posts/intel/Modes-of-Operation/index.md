+++
date = '2026-02-13T12:09:37+09:00'
draft = false
title = 'Modes of Operation'
categories = ['Intel']
+++
## IA-32 아키텍처

IA-32 아키텍처는 3개의 operating 모드와 1개의 quasi-operating 모드를 지원

### Protected mode

- 프로세서의 기본 운영 모드
- 풍부한 아키텍처 기능, 높은 유연성, 고성능, 기존 서프트웨어 베이스와의 하위 호환성 제공
 - 풍부한 아키텍처 기능, 높은 유연성, 고성능, 기존 소프트웨어 베이스와의 하위 호환성 제공
- 보호된 멀티태스킹 환경 제공
- 이 모드에서 virtual-8086 모드를 활성화할 수 있음
    - 단, virtual-8086 모드는 독립된 프로세서 모드가 아니라 protected 모드의 한 속성으로 동작

### Real-address mode

- Intel 8086 프로세서의 프로그래밍 환경을 제공
- 전원 인가 또는 리셋 직후 프로세서는 이 모드에서 시작
- protected 모드나 system management 모드로 전환할 수 있는 기능과 같은 몇 가지 확장 제공

### System management mode(SMM)

- 모든 IA-32 프로세서에 포함된 표준 아키텍처 기능
- 운영체제 또는 실행 환경에 전원 관리나 OEM 차별화 기능을 구현할 수 있는 투명한 메커니즘 제공
- 외부 SMI 핀(SMI#)이 활성화되거나 APIC로부터 SMI를 수신하면 진입
- SMM 진입 시:
    - 현재 실행 중인 프로그램 또는 태스크의 기본 컨텍스트를 저장
    - 분리된 주소 공간으로 전환
    - SMM 전용 코드를 투명하게 실행
- SMM에서 복귀하면, 시스템 관리 인터럽트 이전의 상태로 복원됨

### Virtual-8086 mode

- protected 모드에서 프로세서는 virtual-8086 모드라 불리는 quasi-operating 모드를 지원
- 이 모드는 프로세서가 보호된 멀티태스킹 환경에서 8086 소프트웨어를 실행할 수 있음

## Intel 64 아키텍처

Intel 64 아키텍처는 IA-32 아키텍처의 모든 operating 모드를 지원하고 추가로 IA-32e 모드를 지원

### IA-32e mode

- 2개의 sub-modes를 지원
- **compatibility mode**
    - 64비트 운영체제 하에서 대부분의 기존 16비트 및 32비트 애플리케이션을 재컴파일 없이 실행 가능
    - 64-bit 모드 및 protected 모드에서 지원되는 모든 privilege level 지원
    - Virtual-8086 모드에서 실행되는 애플리케이션이나 하드웨어 태스크 관리 기능을 사용하는 애플리케이션은 동작하지 않음
    - 운영체제가 코드 세그먼트 단위로 활성화
    - 하나의 64비트 OS가 64-bit 모드의 64비트 애플리케이션과 compatibility 모드의 기존 32비트 애플리케이션을 동시에 지원 가능
    - 실행 환경은 32-bit protected 모드와 유사
    - 애플리케이션은 linear address space의 첫 4GiB만 접근 가능
    - 16비트 및 32비트 주소/오퍼랜드 크기 사용
    - PAE(Physical Address Extensions)를 통해 4GiB 이상의 물리 메모리 접근 가능
- **64-bit mode**
    - 64-bit linear addressing 제공
    - 일반 목적 레지스터와 SIMD 확장 레지스터 수가 8개에서 16개로 확장
        - 일반 목적 레지스터는 64비트로 확장
        - 확장 레지스터 접근을 위해 새로운 opcode prefix(REX) 도입
    - 64GiB보다 큰 물리 주소 공간 지원
    - 운영체제가 코드 세그먼트 단위로 활성화
    - 기본 주소 크기: 64비트
    - 기본 오퍼랜드 크기: 32비트
    - REX prefix와 operand size override prefix를 조합하여 명령어 단위로 오퍼랜드 크기 변경 가능

## Operating modes의 전환

![sdm-vol-3a_66.png](img/sdm-vol-3a_66.png#dark-invert)

- 전원이 켜지거나 리셋이 발생하면 프로세서는 real-address 모드로 전환
- control 레지스터 CR0의 PE flag는 프로세서가 real-address 모드와 protected 모드 중에 어떤 모드로 동작할지 제어함
- EFLAGS 레지스터의 VM flag는 프로세서가 protected 모드로 동작하는지, virtual-8086 모드로 동작하는지를 결정함
- protected 모드와 virtual-8086 모드 간의 전환은 태스크 스위치의 일부로 수행되거나 인터럽트 또는 예외 핸들러에서 복귀하는 과정에서 이루어짐
- LMA bit(IA32_EFER.LMA[10])는 프로세서가 IA-32e 모드로 동작하는지 결정함
- IA-32e 모드로 동작할 때, 64-bit sub-mode 또는 compatibility sub-mode인지는 코드 세그먼트의 CS.L bit로 결정됨
- 프로세서는 페이징을 활성화하고 LME bit(IA32_EFER.LME[8])를 설정함으로써 protected 모드에서 IA-32e 모드로 진입함
- 프로세서는 real-address, protected, virtual-8086, IA-32e 모드 동작 중 SMI를 수신하면 SMM으로 전환함
- RSM 명령어가 실행되면 프로세서는 SMI가 발생했을 당시의 모드로 항상 복귀함

# Extended Feature Enable Register(EFER 레지스터)

IA32_EFER MSR은 IA-32e 모드의 활성화 및 동작과 관련된 여러 필드를 제공함

![sdm-vol-3a_67_1.png](img/sdm-vol-3a_67_1.png#dark-invert)

| 비트 | 필드 이름 | 접근 권한 | 설명 |
| --- | --- | --- | --- |
| 0 | SYSCALL Enable (IA32_EFER.SCE) | R/W | 64비트 모드에서 `SYSCALL` / `SYSRET` 명령어를 활성화한다. |
| 7:1 | Reserved | - | 예약됨 (사용 불가). |
| 8 | IA-32e Mode Enable (IA32_EFER.LME) | R/W | IA-32e 모드(64비트 모드) 동작을 활성화한다. |
| 9 | Reserved | - | 예약됨 (사용 불가). |
| 10 | IA-32e Mode Active (IA32_EFER.LMA) | R | IA-32e 모드가 현재 활성 상태임을 나타낸다. 설정되어 있으면 64비트 모드가 동작 중임을 의미한다. |
| 11 | Execute Disable Bit Enable (IA32_EFER.NXE) | R/W | XD 비트가 설정된 PAE 페이지에서 명령어 인출을 금지하여 페이지 접근을 제한하는 기능을 활성화한다. |
| 63:12 | Reserved | - | 예약됨 (사용 불가). |