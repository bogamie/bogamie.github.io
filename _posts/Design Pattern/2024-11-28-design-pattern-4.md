---
title:  "4. Observer Pattern"
excerpt: "&nbsp;&nbsp; "
date:   2024-11-28 21:24:33 +0900
categories: Design Pattern
permalink: posts/4-observer-pattern
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 4.1 옵저버 패턴이란?

## a. 의도

&nbsp;&nbsp; 객체 간에 일대다 의존 관계를 정의하여, 하나의 객체가 변경되면 그 변경된 객체를 의존하는 다른 객체들이 알림을 받고 자동으로 업데이트하도록 하기 위함이다.

## b. 동기

&nbsp;&nbsp; 어떤 이벤트가 발생했음을 다른 다양한 객체들에게 통지할 필요가 있다.

## c. 결과

&nbsp;&nbsp; 발행자(Subject)는 특정 이벤트의 하위 집합에만 관심있는 관찰자(Observers)들에게 그들이 필요하지 않는 이벤트도 알려줄 수 있다. 만약 발행자가 관찰자에게 알림을 보낸 후, 관찰자가 추가적인 정보를 요청한다면 추가적인 의사소통이 필요할 것이다.

## d. 구조

<img class="lazy" data-src="https://github.com/user-attachments/assets/f8e39eb8-e7b4-4fd7-9bd1-8ffb9ec47c4b#center" alt="image" height="75%" width="75%">

### i. 관찰 대상자

#### 가. Subject

* Subject 인터페이스로 관찰 대상자를 정의한다.
* Object는 Observer에 자기 자신을 등록하거나 삭제하기 위해 이 인터페이스를 사용한다.
* 각각의 Subject는 많은 Observer를 가질 수 있다.
  
#### 나. ConcreteSubject

* Subject 인터페이스를 구현하는 Concrete Subject는 관찰 당하는 대상자 역할이다.
* register, remove 메서드와 Subject의 상태가 변화할 때마다 모든 Observer를 업데이트 하기 위한 `notifyObservers()` 메서드를 구현한다.
* 상태를 설정하거나 얻기 위한 세터, 게터를 가지고 있다.

### ii. 관찰자

#### 가. Observer

* 모든 잠재적인 Observer는 Observer 인터페이스를 구현해야 할 필요가 있다.
* 이 Observer 인터페이스는 `update()` 메서드 하나만 가지고 있다. 이 메서드는 Subject의 상태가 변할 때만 호출된다.

#### 나. ConcreteObserver

* Concrete Observer는 Observer 인터페이스를 구현하는 어떠한 클래스도 될 수 있다.
* 각각의 Observer는 Concrete Subject에 등록하여 업데이트를 수신한다.

# 4.2 Weather Monitoring Application

#