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

* 64-Bit 모드의 차이점


## Interrupt Tasks