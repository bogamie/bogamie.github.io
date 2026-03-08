+++
date = '2026-03-04T12:13:30+09:00'
draft = true
title = 'Interrupt and Exception Handling'
categories = ['Intel']
+++
- Interrupt와 Exception은 시스템, 프로세서 또는 현재 실행 중인 프로그램/task에서 어떤 조건이 발생했음을 나타내는 이벤트임
- 이러한 이벤트는 보통 현재 실행 중인 프로그램 또는 태스크의 실행을 중단시키고 interrupt handler 또는 exception handler라는 특별한 소프트웨어 루틴(또는 태스트)으로 강제적으로 실행 흐름을 이동시킴
- 프로세서가 interrupt 또는 exception에 대응하여 수행하는 동작을 servicing(또는 handling)이라고 함

## Interrupt

- 프로그램 실행 중 임의의 시점에 발생함
- 하드웨어 신호에 의해 발생함
- 주변 장치 서비스 요청과 같은 프로세서 외부 이벤트 처리에 사용됨
- 소프트웨어도 `INT n` 명령어를 실행하여 interrupt를 발생시킬 수 있음

## Exception

- 프로세서가 명령어 실행 중 오류 조건을 감지할 때 발생함
- 예:
    - 0으로 나누기
    - 보호 위반
    - 페이지 폴트
    - 내부 머신 오류

## 처리 과정

1. interrupt 또는 exception이 발생하면 현재 실행 중인 procedure 또는 task는 일시 중단됨
2. 이후 프로세서는 interrupt/exception handler를 실행함
3. handler 실행이 완료되면 중단되었던 procedure 또는 task 실행을 다시 이어서 수행함
- 아래와 같은 경우에서는 정상적인 실행 복구가 이루어지지 않을 수 있음
    - exception 복구가 불가능한 경우
    - interrupt로 인해 프로그램이 종료된 경우

# Exception과 Interrupt vectors

- 각 exception과 특별 처리가 필요한 interrupt에는 고유 식별 번호(vector number)가 할당됨
- 프로세서는 이 vector number를 interrupt descriptor table(IDT)의 인덱스로 사용함
- IDT는 해당 exception 또는 interrupt handler의 entry point를 제공함

## Vector Number

![sdm-vol-1-2abcd-3abcd-4_3337.png](img/sdm-vol-1-2abcd-3abcd-4_3337.png#dark-invert)

- vector number의 범위: 0~255
- 0~31
    - Intel 64 / IA-32 아키텍처에서 예약된 범위
    - 아키텍처에서 정의된 exception과 interrupt에 사용됨
    - 이 범위의 모든 번호가 현재 사용되는 것은 아님
    - 정의되지 않은 번호도 예약이므로 사용하면 안 됨
- 32~255
    - 사용자 정의 interrupt(user-defined interrupts) 범위
    - Intel 아키텍처에서 예약되지 않았음
    - 일반적으로 외부 I/O 장치가 프로세서에 interrupt를 보내기 위해 사용됨
    - 이는 외부 하드웨어 interrupt 메커니즘을 통해 전달됨

# Interrupt 발생 원인

- 프로세서는 다음 두 가지 소스로부터 interrupt를 받음
    1. External interrupts (hardware generated)
    2. Software-generated interrupts

# Exception 발생 원인

- 프로세서는 다음 세 가지 소스로부터 exception을 받음
    1. 프로세서가 프로그램 실행 중 오류를 감지하여 발생하는 exception
    2. 소프트웨어에 의해 생성되는 exception
    3. 하드웨어 오류 감지로 인해 발생하는 exception

# 32-bit Mode

## Interrupt Descriptor Table (32-bits)

![sdm-vol-1-2abcd-3abcd-4_3345.png](img/sdm-vol-1-2abcd-3abcd-4_3345.png#dark-invert)

### 역할

- IDT는 각 exception 또는 interrupt vector를 해당 handler의 gate descriptor와 연결함
- gate descriptor는 해당 exception/interrupt를 처리할 procedure 또는 task의 정보를 포함함

### 구조

- IDT는 descriptor 배열임
- protected 모드에서 각 descriptor의 크기: 8 bytes
- GDT/LDT와 유사하지만 IDT의 첫 번째 entry는 descriptor를 포함할 수 있음
- IDT base 주소는 캐시 라인 채우기 성능을 향상시키기 위해 8-byte 경계로 정렬하는 것이 권장됨
- IDT는 선형 주소 공간 어디에나 위치할 수 있음
- 프로세서는 IDTR 레지스터를 통해 IDT 위치를 찾음

### IDT 인덱스 계산

- 프로세서는 interrupt 또는 exception vector 값 x 8을 수행하여 IDT entry 주소를 계산함
- descriptor 크기가 8 bytes이기 때문임

### IDT 크기

- vector 범위: 0~255
- 따라서 최대 256개의 descriptor가 필요함
- 하지만 실제로 발생 가능한 vector만 descriptor가 필요하므로 256보다 적을 수 있음
- 사용하지 않는 entry는 **Present flag = 0**으로 설정해야 함

### limit 값

- byte 단위
- base + limit = 마지막 유효 바이트 주소
- limit = 0 → 정확히 1 byte 유효
- IDT entry가 항상 8 bytes이므로 limit 값은 다음 형태여야 함

```bash
limit = 8N - 1
```

## Exception and Interrupt Handling

- 프로세서는 exception 또는 interrupt handler 호출을 `CALL` 명령어로 procedure 또는 태스크를 호출하는 방식과 유사하게 처리함
- exception 또는 interrupt에 응답할 때 프로세서는 exception 또는 interrupt vector를 IDT의 디스크립터 인덱스로 사용함
- 인덱스가 interrupt gate 또는 trap gate를 가리키는 경우
    - 프로세서는 call gate를 통한 CALL과 유사한 방식으로 exception- 또는 interrupt-handler를 호출함
- 인덱스가 task gate를 가리키는 경우
    - 프로세서는 task gate를 통한 CALL과 유사한 방식으로 exception- 또는 interrupt-handler task로 task switch를 수행함

### Exception- or Interrupt-Handler Procedures

![sdm-vol-1-2abcd-3abcd-4_3347.png](img/sdm-vol-1-2abcd-3abcd-4_3347.png#dark-invert)

- interrupt gate 및 trap gate
    - 현재 실행 중인 태스크의 컨텍스트에서 실행되는 exception 또는 interrupt handler procedure를 참조함
- gate의 세그먼트 셀렉터
    - GDT 또는 현재 LDT에 있는 실행 가능한 코드 세그먼트의 디스크립터를 가리킴
- gate 디스크립터의 오프셋 필드
    - exception- 또는 interrupt-handler procedure의 시작 지점을 가리킴

![sdm-vol-1-2abcd-3abcd-4_3348.png](img/a9f231e2-7481-4d4d-a789-27d38ac0771e.png#dark-invert)

- 더 낮은 권한 레벨(숫자상으로 더 작음)에서 핸들러가 실행될 경우
    - 스택 전환이 발생함
    1. 현재 실행 중인 태스크의 TSS(Task-State Segment)에서 핸들러용 스택 세그먼트 셀렉터 및 스택 포인터를 획득함
    2. 프로세서는 이 새 스택에 인터럽트된 procedure의 stack segment selector와 스택 포인터를 push함
    3. 새 스택에 현재의 EFLAGS, CS, EIP 레지스터 상태를 저장함
    4. 예외로 인한 에러 코드가 있는 경우 EIP 값 이후에 새 스택에 push함

![sdm-vol-1-2abcd-3abcd-4_3348.png](img/951b3ab9-d9b7-45d9-b9bd-3b55bc189648.png#dark-invert)

- 인터럽트된 procedure와 동일한 권한 레벨에서 핸들러가 실행될 경우
    - 스택 전환이 발생하지 않음
    1. 현재 스택에 현재의 EFLAGS, CS, EIP 레지스터 상태를 저장함
    2. 예외로 인한 에러 코드가 있는 경우 EIP 값 이후에 새 스택에 push함
- exception- 또는 interrupt-handler에서 복귀 시 동작
    - 핸들러는 반드시 IRET (또는 IRETD) 명령어를 사용하여 복귀해야 함
    - IRET 명령어는 저장된 플래그를 EFLAGS 레지스터에 복원하는 기능이 있음(RET 명령어와의 차이점)
    - EFLAGS 레지스터의 IOPL 필드는 CPL이 0일 때만 복원됨
    - IF 플래그는 CPL이 IOPL보다 작거나 같을 때만 변경됨
    - 핸들러 호출 시 스택 전환이 발생했다면 IRET 복귀 시 인터럽트 된 procedure의 스택으로 다시 전환함

# 64-Bit Mode

## 개요

* 64-Bit 모드에서 interrupt와 exception handling은 non-64-bit 모드와 동일함
* 다음과 같은 차이점이 존재함
  * IDT가 가리키는 모든 interrupt handler는 64-bit code에 있어야 함
    * 단, SMI handler에는 적용되지 않음
  * interrupt 발생 시 stack에 push되는 값의 크기는 항상 64 bits
    * processor는 8-byte zero-extended store를 사용함
  * interrupt 발생 시 stack pointer (SS:RSP)가 항상 push됨
    * legacy mode에서는 현재 privilege level(CPL) 변경 여부에 따라 조건적으로 push됨
  * CPL 변경이 발생하면 새로운 SS 값은 NULL로 설정됨
  * IRET 동작이 변경됨
  * 새로운 interrupt stack-switch mechanism이 존재함
  * interrupt stack frame의 정렬 방식이 기존과 다름

## 64-Bit Mode IDT

* **IDT Gate의 크기 및 주소 지정**
  * 64-bit mode에서 interrupt gate와 trap gate의 크기는 16바이트로 확장됨
  * Instruction pointer(RIP)를 위한 64비트 offset을 제공하므로, ISR(Interrupt Service Routine)이 linear-address space의 어느 곳에든 위치할 수 있음
  * IDT index는 interrupt vector에 16을 곱하여(scaling) 계산됨
* **Gate Descriptor의 구조**
![sdm-vol-1-2abcd-3abcd-4_3355.png](img/sdm-vol-1-2abcd-3abcd-4_3355.png#dark-invert)
  * Descriptor의 하위 8바이트(bytes 7:0)는 legacy 32-bit interrupt gate와 유사하나 완전히 동일하지는 않음
  * Type 필드는 bytes 7:4의 bits 11:8에 위치함![sdm-vol-1-2abcd-3abcd-4_3235.png](img/sdm-vol-1-2abcd-3abcd-4_3235.png#dark-invert)
  * IST(Interrupt Stack Table) 필드는 bytes 7:4의 bits 4:0에 위치하며 stack switching 메커니즘에 사용됨
  * Descriptor의 상위 4바이트(bytes 11:8)는 target RIP의 상위 32비트를 canonical form으로 유지함
* **제약 사항 및 예외(Exception) 발생 조건**
  * 소프트웨어가 참조하려는 target RIP가 canonical form이 아닐 경우, #GP(General-Protection Exception)가 발생함
  * Interrupt gate가 참조하는 target code segment는 반드시 64-bit code segment(CS.L = 1, CS.D = 0)여야 함
  * Target이 64-bit code segment가 아닐 경우, IDT vector number를 error code로 포함하는 #GP가 발생함
* **IA-32e Mode에서의 호환성 처리**
  * IA-32e mode(64-bit mode 및 compatibility mode 모두 포함)에서는 오직 64-bit interrupt gate와 64-bit trap gate만 참조할 수 있음
  * 기존의 legacy 32-bit interrupt 또는 trap gate type(0EH 또는 0FH)은 IA-32e mode에서 64-bit gate type으로 재정의됨
  * IA-32e mode에는 32-bit interrupt/trap gate type이 존재하지 않음
  * 만약 16-bit interrupt/trap gate(06H 또는 07H)를 참조하려고 시도하면 #GP(0)가 발생함

## 64-Bit Mode Stack Frame

* **Interrupt Stack Frame Push 크기 및 동작**
  * Legacy mode에서는 IDT entry 크기(16 bits 또는 32 bits)가 interrupt-stack-frame의 push 크기를 결정하며, CPL 변경이 있을 때만 SS:ESP가 push 됨
  * 64-bit mode에서는 64-bit mode gate만 참조할 수 있으므로, interrupt stack-frame의 push 크기가 8 bytes로 고정됨
  * 64-bit mode에서는 CPL 변경 여부와 무관하게 SS:RSP가 항상(unconditionally) push 됨
* **Stack Frame 크기의 일관성 유지**
  * SS:RSP가 무조건 push 되기 때문에 (error code를 제외하면) OS는 모든 interrupt에 대해 일관된 interrupt-stack-frame 크기를 확보할 수 있음
  * INTn instruction이나 외부 INTR# signal에 의해 발생하는 interrupt의 ISR 진입점에서는 이러한 일관성을 유지하기 위해 추가적인 error code place-holder를 push 하기도 함
* **RSP 정렬 (Alignment)**
  * Legacy mode에서는 stack frame이 push 될 때 stack pointer가 임의의 alignment를 가질 수 있어, 이후 handler가 수행하는 push들도 정렬되지 않을 수 있음
  * IA-32e mode에서는 stack frame을 push 하기 전에 RSP를 16-byte boundary로 정렬함
  * Interrupt handler가 호출될 때 stack frame 자체도 16-byte boundary에 맞춰짐
  * 이전 RSP 값(정렬되지 않았을 수 있는 값)은 새로 정렬된 stack에 무조건 저장되며, 이후 IRET에 의해 자동으로 복원되므로 processor는 interrupt 발생 시 새로운 RSP를 임의로 재정렬할 수 있음
* **RSP 정렬의 이점 및 적용 조건**
  * 이러한 정렬은 interrupt를 재활성화하기 전에 exception 및 interrupt frame이 16-byte boundary를 갖도록 보장함
  * 결과적으로 16-byte XMM register 저장에 최적화된 stack format을 구성할 수 있으며, interrupt handler가 XMM register를 save/restore 할 때 더 빠른 16-byte aligned load/store 명령어(MOVUPS 대신 MOVAPS)를 사용할 수 있게 함
  * LMA = 1일 때 RSP 정렬은 항상 수행되지만, 이는 stack switch나 IST가 사용되지 않는 kernel-mode 경우에만 실질적인 의미를 가짐
  * Stack switch나 IST가 발생하는 경우, OS가 이미 TSS 내부에 적절히 정렬된 RSP 값을 설정해 두었다고 간주함

## IRET in IA-32e Mode

* **IRET의 Operand Size 및 Stack Pop 동작**
  * IA-32e mode에서 IRET는 8-byte operand size로 실행됨 (하드웨어적으로 강제되는 것은 아니나, IRET가 필요한 동작을 위해 stack이 8-byte 포맷으로 구성되어 있기 때문)
  * IA-32e mode의 interrupt stack-frame push는 항상 8 bytes 단위이므로, IRET는 스택에서 8-byte item들을 pop해야 함
  * 이는 IRET 명령어 앞에 64-bit operand-size prefix를 선행시켜 수행됨
  * Pop되는 크기는 instruction의 address size에 의해 결정되며, SS/ESP/RSP의 크기 조정(size adjustment)은 stack size에 의해 결정됨
* **운영 모드에 따른 SS:RSP Pop 조건**
  * **64-bit mode:** IRET가 실행될 때 interrupt stack frame에서 SS:RSP를 CPL 변경 여부와 무관하게 무조건(unconditionally) pop함
    * Target code segment가 64-bit mode에서 실행되거나 target CPL = 0인 경우라도 무조건 pop을 수행함 (이는 인터럽트 발생 시 항상 SS:RSP가 push되기 때문임)
  * **Compatibility mode:** CPL 변경이 있을 때만 스택에서 SS:RSP를 pop함
    * 이를 통해 compatibility mode에서 legacy application이 IRET 명령어를 사용할 때 정상적으로 실행될 수 있도록 보장함
* **NULL SS Selector 처리 및 중첩된 예외(Nested Transfer) 지원**
  * IA-32e mode에서 IRET는 특정 조건(Target mode가 64-bit mode이고 target CPL $\neq$ 3인 경우) 하에 NULL SS selector를 로드하는 것을 허용함
  * Stack switch 메커니즘의 일부로, interrupt나 exception 발생 시 새로운 SS selector를 TSS나 GDT/LDT에서 가져오지 않고 강제로 NULL로 설정함
  * 새로운 SS를 NULL로 설정하는 이유는 이후 발생하는 중첩된(nested) far transfer에서의 return을 올바르게 처리하기 위함임
  * 만약 호출된 procedure 자체가 실행 중 다시 interrupt되면, 스택 프레임에 NULL SS가 push됨
  * 이후 복귀 시 IRET가 스택에서 이 NULL SS를 만나면, 이는 processor에게 새로운 SS descriptor를 로드하지 말라는 일종의 flag 역할을 수행함

## Stack Switching in IA-32e Mode

![sdm-vol-1-2abcd-3abcd-4_3357.png](img/sdm-vol-1-2abcd-3abcd-4_3357.png#dark-invert)

* **Stack-Switching 메커니즘 개요**
  * Intel 64 architecture의 64-bit 확장에서는 인터럽트 발생 시 자동으로 stack frame을 전환하기 위해, 수정된 버전의 legacy stack-switching 메커니즘과 IST(Interrupt Stack Table)라는 대안적 메커니즘을 구현함
  * IA-32 mode에서는 기존 legacy IA-32 stack-switch 메커니즘이 변경 없이 그대로 사용됨
* **IA-32e Mode에서의 Stack Switch 동작 변경 사항**
  * IA-32e mode에서는 legacy stack-switch 메커니즘이 수정됨
  * Interrupt로 인해 64-bit mode privilege-level 변경이 발생하여 stack switch가 일어날 때, 새로운 SS(Stack Segment) descriptor를 로드하지 않음
  * 대신 IA-32e mode는 TSS에서 inner-level RSP만 로드함
* **NULL SS Selector 처리 및 중첩(Nested) 전송 지원**
  * 새로운 SS selector는 강제로 NULL로 설정되며, SS selector의 RPL 필드는 새로운 CPL 값으로 설정됨
  * 새로운 SS를 NULL로 설정하는 이유는 중첩된(nested) far transfer(far CALL, INT, interrupt, exception)를 올바르게 처리하기 위함임
* **이전 스택 정보의 저장 및 복원**
  * Stack switch 시 이전(old) SS와 RSP는 새로운 스택에 저장(save)됨
  * 이후 IRET 명령어가 실행될 때, 스택에서 이 이전 SS를 pop하여 SS 레지스터에 로드함
  * 요약하자면, IA-32e mode의 stack switch는 새로운 SS selector를 TSS에서 로드하지 않고 강제로 NULL로 설정한다는 점을 제외하면 legacy stack switch와 동일하게 동작함

## Interrupt Stack Table

* **IST (Interrupt Stack Table) 메커니즘 개요**
  * IA-32e mode에서만 사용 가능한 새로운 stack-switching 메커니즘으로, 64-bit mode TSS(Task-State Segment)의 일부로 구현됨
  * 기존의 수정된 legacy stack-switching 메커니즘의 대안으로 제공되며, 활성화될 경우 무조건적으로(unconditionally) stack switch를 수행함
  * IDT entry의 필드를 사용하여 개별 interrupt-vector 단위로 활성화 여부를 지정할 수 있음 (즉, 일부 vector는 legacy 메커니즘을, 다른 vector는 IST 메커니즘을 사용하도록 혼용 가능함)
* **IST 도입 목적 (Motivation)**
  * NMI, Double-fault, Machine-check와 같은 특정 interrupt들이 항상 신뢰할 수 있는 스택(known good stack)에서 실행되도록 보장하기 위함
  * Legacy mode에서는 IDT 내의 task gate를 참조하는 task-switch 메커니즘을 통해 known good stack을 설정할 수 있었으나, IA-32e mode에서는 legacy task-switch 메커니즘이 더 이상 지원되지 않기 때문에 대안으로 도입됨
* **IST의 구조 및 참조 방식**
  * TSS 내에 최대 7개의 IST pointer를 제공함
  * IDT의 interrupt-gate descriptor 내에 포함된 3-bit IST index 필드가 TSS의 IST 섹션에 대한 offset 역할을 하여 특정 포인터를 참조함
  * 만약 IDT 게이트의 IST index 값이 0으로 설정되어 있으면, IST를 사용하지 않고 기존의 수정된 legacy stack-switching 메커니즘이 사용됨
* **IST를 통한 Interrupt 발생 시 동작**
  * 프로세서는 IST pointer가 가리키는 값을 새로운 RSP에 로드함
  * 새로운 SS(Stack Segment) selector는 강제로 NULL로 설정되며, SS selector의 RPL 필드는 새로운 CPL로 설정됨
  * 이전 스택 및 상태 정보인 old SS, RSP, RFLAGS, CS, RIP가 새로운 스택에 차례대로 push됨
  * 이후 일반적인 interrupt 처리 과정을 동일하게 진행함