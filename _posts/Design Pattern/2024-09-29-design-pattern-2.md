---
title:  "2. 객체 지향"
excerpt: "&nbsp;&nbsp; 객체 지향 기술(OOT)과 객체 지향 프로그래밍(OOP)에 대해 다룬다. OOP의 기본 원칙인 추상화, 캡슐화, 모듈화, 계층화 등이 설명되며, OOP의 디자인 원칙 SOLID를 소개한다."
date:   2024-09-29 17:23:34 +0900
categories: Design Pattern
permalink: posts/2-object-oriented
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 2.1 객체 지향 기술(Object Oriented Technology)

&nbsp;&nbsp; 객체 지향 기술은 객체 지향 프로그래밍(Object Oriented Programming)을 기반으로 하는 기술을 말한다. OOT의 **Adaptive to Change**는 소프트웨어가 변경되는 요구 사항이나 환경에 쉽게 적응할 수 있는 능력을 의미한다. 이는 유연한 설계, 확장 용이성, 리팩토링 등의 측면에서 중요하다.

<div class="bg"></div>

# 2.2 객체 지향 프로그래밍(Object Oriented Programming)

## a. OOP의 기본 원칙

### i. **추상화**(Abstraction)
* 개념을 설정하고 특정 객체가 어떤 기능을 수행하는지 정의한다.
* 객체의 본질적인 특징만 드러내고, 불필요한 세부사항은 숨긴다.
* 예를 들어, 자동차의 가속 페달은 속도를 증가시키고 브레이크 페달은 속도를 감소시킨다.

#### 가. 위배될 경우
* **SRP**(Single Responsibility Principle) 위배
  * 추상화를 지키지 않으면 클래스나 함수가 여러 책임을 가지게 될 수 있다.
  * 객체가 너무 많은 세부 구현을 노출하면, 해당 객체가 여러 책임을 수행하게 되어 SRP를 위반할 가능성이 커진다.
* **OCP**(Open/Closed Principle) 위배
  * 새로운 기능을 추가하거나 수정할 때 기존 코드를 변경해야 할 가능성이 높아져 OCP를 위반할 수 있다.

### ii. **캡슐화**(Encapsulation)
* 객체의 속성과 행위를 하나로 묶고, 외부에서 접근을 제한한다.
* 객체의 속성은 **필드**(Field)로, 행위는 **메서드**(Method)로 구현한다.
* 객체의 내부 구현 방식은 숨기고, 외부에서 접근할 수 있는 인터페이스만 제공한다.
* 사용자는 객체가 어떻게 작동하는지 알 필요 없이 인터페이스만 사용하면 된다.

#### 가

### iii. **모듈화**(Modularity)
* 프로그램을 여러 개의 모듈로 나누어 개발하는 방법이다.
* 높은 응집도(Highly Cohesion)와 낮은 결합도(Low Coupling)를 유지한다.
* **응집도**(Cohesion)
    * 관련된 코드들은 최대한 한 곳에 모아두어 코드의 가독성과 유지보수성을 높인다.
* **결합도**(Coupling)
    * 객체는 최소한의 의존성만을 가지며, 다른 객체에 대한 의존성을 최소화한다.

### iv. **계층화**(Hierarchy)
* 코드 재사용을 위한 상속(Inheritance)을 통해 계층 구조를 만든다.
* 이때 계층화와 상속은 다른 개념이다. 상속은 계층화를 위한 수단 중 하나일 뿐이다.

## b. OOP의 디자인 원칙-SOLID

### i. **SRP**(Single Responsibility Principle)
* 단일 책임 원칙
* 한 클래스는 하나의 책임만 가져야 한다.
* 변경의 원인이 하나여야 한다.

### ii. **OCP**(Open/Closed Principle)
* 개방-폐쇄 원칙
* 소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.
* 새로운 기능을 추가할 때 기존 코드를 최소한으로 변경해야 한다.

### iii. **LSP**(Liskov substitution Principle)
* 리스코프 치환 원칙
* 프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.
* 상속은 is-a 관계여야 하며, 서브 타입은 부모 타입으로 대체 가능해야 한다.

### iv. **ISP**(Interface Segregation Principle)
* 인터페이스 분리 원칙
* 특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.
* 클라이언트는 사용하지 않는 메소드에 의존해서는 안된다.
* 필요한 메소드만을 상속하도록 해야 한다.

### v. **DIP**(Dependency Inversion Principle)
* 의존관계 역전 원칙
* 프로그래머는 추상화에 의존해지, 구체화에 의존하면 안된다.
* 높은 레벨의 모듈은 낮은 레벨의 모듈에 의존해서는 안 되며, 모든 모듈은 추상화에 의존해야 한다.

## c. GRASP 원칙

* GRASP(General Responsibility Assignment Software Patterns)는 객체지향 설계를 위한 9가지 원칙이다.
* 구체적인 구조는 없지만, 소프트웨어 설계의 철학을 제시한다.

> **참고**
>
> * **추상화 