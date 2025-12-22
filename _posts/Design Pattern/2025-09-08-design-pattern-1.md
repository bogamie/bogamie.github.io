---
title:  "1. 디자인 패턴의 개요"
excerpt: "&nbsp;&nbsp; 객체 지향 프로그래밍의 객체 개념"
date:   2025-09-08 12:35:49 +0900
categories: Design Pattern
permalink: posts/1-overview-of-design-patterns
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---

# 1.1 객체 지향 프로그래밍

## a. 객체란?
* **객체(Object)**는 현실 세계의 사물이나 개념을 프로그램 안에서 표현한 단위
* 객체는 **속성(Attribute)**과 **행동(Behavior)**을 가짐
  * 속성: 객체가 가지고 있는 데이터나 상태 (예: 자동차의 색상, 모델, 속도)
  * 행동: 객체가 수행할 수 있는 기능이나 메서드 (예: 자동차의 가속, 감속, 방향 전환)

## b. 객체 지향 프로그래밍(OOP)이란?
* **객체 지향 프로그래밍(Object-Oriented Programming, OOP)**은 객체를 중심으로 프로그램을 설계하고 구현하는 프로그래밍 패러다임
* 현실 세계를 모델링하여 **재사용성**, **유지보수성**, **확장성**을 높이는 것을 목표로 함

## c. OOP의 4대 원칙
### i. 추상화(Abstraction)
* **복잡한 시스템에서 중요한 부분만을 추출하여 불필요한 세부 사항을 숨기고 핵심 개념만 표현하는 것**
* 예: 자동차 클래스는 엔진의 내부 동작 방식을 모두 노출하지 않고, `달린다`라는 메서드만 제공

#### a. abstract
* 완전하지 않은 클래스
* 특징
  * `abstract` 키워드를 붙이면 객체 생성 불가(`new` 사용 불가)
  * **상속**을 통해 자식 클래스에서 추상 메서드를 반드시 구현해야 함
  * 단일 상속만 가능
  * 클래스끼리 is-a 관계가 있는 경우 사용
  * 공통 코드 재사용 + 강제성 부여

#### b. interface
* 행동 규격만 정의해 놓은 틀
* 특징
  * 다중 구현 가능 → 클래스가 여러 인터페이스를 동시에 구현 가능
  * 행동 규격을 정의
  * 클래스끼리 is-a 관계가 없는 경우도 사용 가능
  * 공통 코드 재사용 X + 강제성 부여

### ii. 캡슐화(Encapsulation)
* **데이터(속성)와 메서드(행동)를 하나의 객체로 묶고, 외부에서 접근을 제한하는 것.**
* `public`: 외부에서 접근 가능
* `protected`: 같은 패키지 + 상속받은 클래스에서 접근 가능
* `default(package-private)`: 같은 패키지에서만 접근 가능
* `private`: 클래스 내부에서만 접근 가능

### iii. 다형성(Polymorphism)
* **같은 이름의 메서드라도 상황에 따라 다르게 동작하는 성질.**
* **Overloading(오버로딩)**: 같은 이름의 메서드를 매개변수의 타입/개수 다르게 정의
* **Overriding(오버라이딩)**: 부모 클래스의 메서드를 자식 클래스에서 재정의
  
### iv. 상속(Inheritance)
* **부모 클래스의 속성과 메서드를 자식 클래스가 물려받아 재사용**
* 코드 중복 감소, 계층적 구조 형성.
* `extends`(클래스 상속), `implements`(인터페이스 구현) 사용