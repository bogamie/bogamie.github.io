---
title:  "2."
excerpt: "&nbsp;&nbsp; "
date:   2024-09-03 12:14:34 +0900
categories: Design Pattern
permalink: posts/2-test
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 2.1 객체 지향

## a. 객체 지향 기술(Object Oriented Technology)

&nbsp;&nbsp; 객체 지향 기술은 객체 지향 프로그래밍(Object Oriented Programming)을 기반으로 하는 기술을 말한다. OOT의 **Adaptive to Change**는 소프트웨어가 변경되는 요구 사항이나 환경에 쉽게 적응할 수 있는 능력을 의미한다. 이는 유연한 설계, 확장 용이성, 리팩토링 등의 측면에서 중요하다.

## b. 객체 지향 프로그래밍(Object Oriented Programming)

### i. OOP의 기본 원칙

#### 가. **추상화**(Abstraction)
* 개념을 설정하고 특정 객체가 어떤 기능을 수행하는지 정의한다.
* 예를 들어, 자동차의 가속 페달은 속도를 증가시키고 브레이크 페달은 속도를 감소시킨다.

#### 나. **캡슐화**(Encapsulation)
* 객체의 속성과 행위를 하나로 묶고, 외부에서 접근을 제한한다.
* 객체의 속성은 **필드**(Field)로, 행위는 **메서드**(Method)로 구현한다.
* 객체의 내부 구현 방식은 숨기고, 외부에서 접근할 수 있는 인터페이스만 제공한다.
* 사용자는 객체가 어떻게 작동하는지 알 필요 없이 인터페이스만 사용하면 된다.

#### 다. **모듈화**(Modularity)
* 프로그램을 여러 개의 모듈로 나누어 개발하는 방법이다.
* 높은 응집도(Highly Cohesion)와 낮은 결합도(Low Coupling)를 유지한다.
* **응집도**(Cohesion)
    * 관련된 코드들은 최대한 한 곳에 모아두어 코드의 가독성과 유지보수성을 높인다.
* **결합도**(Coupling)
    * 객체는 최소한의 의존성만을 가지며, 다른 객체에 대한 의존성을 최소화한다.

#### 라. **계층화**(Hierarchy)
* 코드 재사용을 위한 상속(Inheritance)을 통해 계층 구조를 만든다.
* 이때 계층화와 상속은 다른 개념이다. 상속은 계층화를 위한 수단 중 하나일 뿐이다.

### ii. OOP의 디자인 원칙-SOLID

#### 가. **단일 책임 원칙**(Single Responsibility Principle)
    * 클래스는 단 하나의 책임만
