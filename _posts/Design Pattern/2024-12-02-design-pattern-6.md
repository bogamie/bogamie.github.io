---
title:  "6. Factory Method Pattern"
excerpt: "&nbsp;&nbsp; "
date:   2024-12-02 16:22:55 +0900
categories: Design Pattern
permalink: post/6-factory-method-pattern
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 6.1 팩토리 메서드 패턴이란?

## a. 의도

&nbsp;&nbsp; 객체를 생성하기 위한 인터페이스는 선언하지만 어떤 클래스의 인스턴스를 생성할지는 서브 클래스에서 결정하게 한다. 팩토리 메서드는 객체 생성을 서브 클래스로 미루어 처리하도록 한다.

## b. 동기

&nbsp;&nbsp; 객체를 생성할 때 하위 클래스가 어떤 클래스를 인스턴스화할지 재정의할 수 있도록 하려면 어떻게 해야 할까? 클래스로부터 하 클래스가 인스턴스화를 처리하도록(클래스 선택을 연기하려면) 어떻게 해야 할까?

&nbsp;&nbsp; 객체를 생성하기 위한 별도의 추상 작업(팩토리 메서드)을 정의한다. 객체는 팩토리 메서드를 호출하여 생성한다. (팩토리 메서드는 추상 메서드이므로 인스턴스 생성은 하위 클래스에 위임된다).

## c. 구조

<img class="lazy" data-src="https://github.com/user-attachments/assets/6208cb21-0876-49e6-b545-cd714de11e76#center" alt="image" height="75%" width="75%" onclick="showImage(this)">

### i. The Creator classes

#### 가. Factory

* Factory는 팩토리 메서드를 제외하고 제품을 조작하는 모든 메서드의 구현을 포함한다.

#### 나. ConcreteFactory

* ConcreteFactory는 실제로 제품을 생성하는 `factoryMethod()` 메서드를 구현한다.
* ConcreteFactory는 한 개 이상의 ConcreteProduct를 생성하는 책임을 가진다. 이 클래스는 이러한 제품들을 어떻게 생성할지에 대한 정보를 가진 유일한 클래스이다.

### ii. The Product classes

#### 가. Product

* Product는 팩토리 메서드 패턴에서 생성되는 객체의 인터페이스를 정의한다.

#### 나. ConcreteProduct

* ConcreteProduct는 Product 인터페이스를 구현한다.
* 모든 제품은 동일한 인터페이스를 구현해야 하며, 이를 통해 제품을 사용하는 클래스들이 ConcreteProduct가 아닌 Product 인터페이스를 참조 할 수 있다.

## d. 결과

### i. 장점

#### 가. 중앙 집중화된 객체 생성

* 팩토리 메서드 패턴은 객체 생성을 중앙 집중화할 수 있게 해준다. 이를 통해 코드 관리와 유지보수가 더 쉬워지며, 객체 생성을 위한 하나의 진입점을 만들 수 있어 코드가 단순해지고 오류 발생 가능성이 줄어든다.
  
#### 나. 코드 재사용성

* 공통 인터페이스와 구체적인 클래스들을 생성하여 코드 재사용성을 높일 수 있다. 이것은 유사한 기능을 제공하지만 구현 세부 사항이 다른 여러 객체를 생성할 수 있게 하며, 코드의 중복을 줄이고 유지보수를 더 쉽게 만든다.

#### 다. 유연성

* 기존의 코드를 수정하지 않고도 새로운 객체를 추가할 수 있게 한다. 이는 기존 코드를 깨뜨릴 걱정 없이 애플리케이션의 기능을 확장할 수 있다는 것을 의미한다.


#### 라. 테스트 용이성

* 팩토리 메서드 패턴은 코드를 테스트하기 더 쉽게 만든다. 객체 생성을 중앙 집중화하면 테스트 중에 객체를 모의 객체(Mock Object)로 쉽게 대체할 수 있어 애플리케이션의 개별 구성 요소를 분리하여 테스트할 수 있다.

### ii. 단점

#### 가. 복잡성

* 구체적인 클래스나 복잡한 생성 로직이 많아질수록 팩토리 클래스가 지나치게 커지며 관리하기 어려워질 수 있다.
  
#### 나. 높은 응집도

* 팩토리 메서드 패턴은 Factory 클래스와 ConcreteProduct 클래스 간의 높은 응집을 형성할 수 있다. ConcreteProduct 클래스를 변경해야 할 경우, Factory 클래스도 함께 변경해야 할 수 있으며, 이는 오류 발생 가능성을 높일 수 있다.

## e. 사용 시기

### i. 자동차 공장

* 자동차 제조 공장에서의 소프트웨어 시스템을 생각해보자. 제조 회사는 자동차, 트럭, 오토바이 등 다양한 종류의 차량을 생산한다. 이때 팩토리 메서드 패턴을 사용하여 다양한 차량 유형의 생성을 간소화 시킬 수 있다.

### ii. 게임 개발

* 게임에서 다양한 캐릭터, 무기, 아이템을 생성할 때 팩토리 메서드 패턴을 사용한다.
* 예를 들어, RPG 게임에서 캐릭터를 생성할 때 팩토리 메서드 패턴을 통해 전사, 마법사, 궁수 등 다양한 캐릭터를 생성할 수 있다.

# 4.2 Pizza Store

## a. 안 좋은 예시

```Java
Pizza orderPizza(String type) {
    Pizza pizza;

    if (type.equals("cheese")) {
        pizza = new CheesePizza();
    } else if (type.equals("greek")) {
        pizza = new GreekPizza();
    } else if (type.equals("pepperoni")) {
        pizza = new PepperoniPizza();
    } else {
        pizza = null;
    }

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
}
```

&nbsp;&nbsp; 객체 생성 로직이 `orderPizza` 메서드에 직접 작성되어 있어, 단일 책임 원칙(SRP)을 위반한다. 또한 새로운 피자를 추가하려면 `orderPizza` 메서드를 수정해야 하므로 개방-폐쇄 원칙(OCP)을 위반한다. 이러한 문제점들은 강한 응집을 초래하여 코드 확장 및 유지보수를 어렵게 한다.

## b. 팩토리 메소드 패턴 적용

<img class="lazy" data-src="https://github.com/user-attachments/assets/cada99f2-fcfc-44ff-bbbc-0ee362df71ab#center" alt="image" height="100%" width="100%" onclick="showImage(this)">

