---
title:  "8. Command Pattern"
excerpt: "&nbsp;&nbsp; "
date:   2024-12-12 18:38:14 +0900
categories: Design Pattern
permalink: post/8-command-pattern
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 8.1 커맨드 패턴이란?

## a. 의도

&nbsp;&nbsp; 커맨드 패턴은 요청을 객체로 캡슐화하여 클라이언트를 다양한 요청으로 매개변수화할 수 있도록 하며, 요청을 큐에 저장하거나 실행 취소 기능을 지원하기 위해 사용한다. 이 패턴은 요청을 자체적인 동작을 가진 독립적인 객체로 변환하여 송신자와 수신자를 분리하기 위한 목적이 있다.

## b. 동기

&nbsp;&nbsp; 어떤 애플리케이션이 실행 취소 가능한 작업을 지원해야 하거나, 요청을 큐에 저장해야 하거나, 요청의 송신자와 수신자를 분리하고 싶을 때를 생각해보자. 커맨드 패턴은 이러한 상황을 위한 해결책을 제공한다. 이 패턴은 명령 실행, 큐잉(queueing), 실행 취소 작업과 관련된 다양한 요구사항을 체계적으로 처리할 수 있도록 설계되었다.

## c. 구조

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/ec053e7a-4b9c-4d37-8f9d-7def4f40279e#center" alt="image" height="100%" width="100%" onclick="showImage(this)">

### a. Client

* 클라이언트는 ConcreteCommand 객체를 생성하고 Receiver 객체를 생성한 객체에 연결한다.

### b. Invoker

* Invoker는 명령을 보유하고 있으며, 특정 시점에서 명령의 `execute()` 메서드를 호출하여 요청을 실행하도록 한다.

### c. Command

* Command 인터페이스는 모든 명령을 위한 인터페이스를 정의한다.
* `execute()` 메서드를 통해 명령이 호출되며 이 메서드는 Receiver에게 작업을 수행하도록 요청한다.
* `undo()` 메서드를 통해 명령을 실행 취소할 수 있도록 한다.

### d. ConcreteCommand

* ConcreteCommand는 작업과 Receiver 사이를 연결한다. Invoker는 `execute()`를 호출하여 요청을 전달하고 ConcreteCommand는 Receiver에서 하나 이상의 작업을 호출하여 요청을 수행한다.
* `execute()` 메서드는 요청을 수행하기 위해 Receiver에서 필요한 작업을 호출한다.

### e. Receiver

* Receiver는 요청을 처리하기 위해 필요한 작업을 어떤 방식으로 수행할지 알고 있는 객체이다.
* 어떤 클래스든 Receiver 역할을 할 수 있다.

## d. 결과

### i. 장점

#### 가. 의존성 감소

* 명령을 호출하는 객체와 명령을 수행하는 객체를 분리하여 의존성을 줄인다.

#### 나. 실행 취소·재실행 기능

* 각 명령은 `undo()` 메서드만 구현하면 실행 취소 기능을 제공할 수 있다.
* 명령을 스택에 저장하고 실행 취소 시 스택의 맨 위 명령에 대해 `undo()`를 실행하면 된다.

#### 다. 명령의 유연성

* 명령들을 조합하여 복잡한 명령을 구현할 수 있다.
* 예를 들어 BoldCommand와 ItalicCommand를 조합하여 BoldItalicCommand를 만들 수 있다.
* 명령을 바로 실행하지 않고 나중에 실행할 수 있다.

#### 라. SRP·DIP 준수

* 커맨드 패턴은 단일 책임 원칙(SRP)과 의존 역전 원칙(DIP)을 준수한다.

### ii. 단점

#### 가. 코드 복잡성 증가

* 각 명령마다 새로운 클래스르 만들어야 하므로 코드가 복잡해질 수 있다.
  
#### 나. 과도한 설계

* 명령이 적을 경우, 커맨드 패턴을 사용하면 오히려 설계가 복잡해질 수 있다.

## e. 사용 시기

* 클라이언트를 요청으로 매개변수화해야 할 때, 커맨드 패턴은 요청을 객체로 캡슐화할 수 있게 해준다.
* 요청을 큐에 저장하는 것을 가능하게 하며, 대기 중인 다양한 명령으로 명령 큐를 생성할 수 있다.
* 실행 취소 작업이 필요한 시스템에서 명령 실행 전 객체의 상태를 저장함으로써 실행 취소 기능을 제공할 수 있다.

### i. 

* 

### ii. 

* 

### iii. 

* 

# 8.2 

## a. 안 좋은 예시

&nbsp;&nbsp; 

## b. 패턴 적용

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/08a82186-f060-46fe-8342-567b76556f6f#center" alt="image" height="100%" width="100%" onclick="showImage(this)">