---
title:  "5. Decorator Pattern"
excerpt: "&nbsp;&nbsp; 데코레이터 패턴은 객체에 추가적인 책임을 동적으로 부여하기 위해 사용한다. 데코레이터는 기능을 확장하기 위해 서브 클래스를 사용하는 것보다 유연한 대안을 제공한다."
date:   2024-12-01 21:47:05 +0900
categories: Design Pattern
permalink: posts/5-decorator-pattern
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 5.1 데코레이터 패턴이란?

## a. 의도

&nbsp;&nbsp; 객체에 추가적인 책임을 동적으로 부여하기 위해 사용한다. 데코레이터는 기능을 확장하기 위해 서브 클래스를 사용하는 것보다 유연한 대안을 제공한다.

## b. 동기

&nbsp;&nbsp; 사용하고자 하는 객체가 필요한 기본 기능을 수행하지만, 객체의 기본 기능 이전이나 이후에 부가적인 기능을 추가해야 할 경우가 있다. 따라서 객체의 기능을 확장하기 위해 서브 클래스를 사용하는 대신, 데코레이터 패턴을 사용하여 객체를 동적으로 확장할 수 있는 방법을 제공한다.

## c. 구조

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/942091c2-5141-4153-8921-dcd934101a80#center" alt="image" height="75%" width="75%" onclick="showImage(this)">

### i. Component

* 인터페이스나 추상 클래스로 구현된다.
* 모든 구체적인 컴포넌트와 데코레이터가 이를 구현하거나 상속받아 동일한 인터페이스를 가지게 한다.

### ii. ConcreteComponent

* Component의 구체적인 구현이다.
* 기본 기능을 구현한 클래스이다.
* 데코레이터 클래스를 사용하여 이 클래스에 새로운 기능을 동적으로 추가한다.

### iii. Decorator

* Has-A 관계를 통해 Component를 참조하며, 이를 감싸는 역할을 한다.
* Decorator는 Component를 상속 또는 구현하여 Component와 동일한 인터페이스를 가지며, 사용자 입장에서 Decorator와 Component를 구분하지 않고 사용할 수 있다.

### iv. ConcreteDecorator

* Decorator의 구체적인 구현이다.
* Decorator를 상속받아 새로운 기능을 추가하거나 기존 기능을 확장한다.
* 기능을 확장하거나 새로운 기능을 추가한다.

## d. 결과

&nbsp;&nbsp; 추가될 기능은 작은 객체에 포함된다. 이로 인해 해당 기능을 구체적인 컴포넌트에 이전이나 이후에 동적으로 추가할 수 있는 장점이 있다. 또한 데코레이터는 자신이 장식하는 대상의 기능 앞뒤에 새로운 기능을 추가할 수 있다. 하지만, 인스턴스화 과정은 반드시 구체적인 컴포넌트에서 끝나게 된다.

### i. 장점

#### 가. 유현한 확장성

* 데코레이터 패턴은 객체의 구조나 동작을 변경하지 않고 동적으로 새로운 기능을 추가할 수 있도록 한다. 이를 통해 시스템의 다른 부분에 영향을 끼치지 않고도 객체의 기능을 확장하고 수정한다.
  
#### 나. 유지보수의 용이성

* 데코레이터 패턴은 단일 책임 원칙을 준수하기 때문에, 각각의 Decorator 클래스는 특정 기능을 추가하는 역할만 담당한다. 이 특징은 시스템의 기능을 유지보수하기 쉽게 만들며, 각 Decorator 클래스를 독립적으로 수정하거나 교체할 수 있다.

#### 다. 개방-폐쇄 원칙(OCP)

* 데코레이터 패턴은 개방-폐쇄 원칙을 따르며, 이는 클래스가 확장에는 열려있으나 수정에는 닫혀있음을 의미한다. 기존 코드를 수정하지 않고도 객체에 새로운 기능을 쉽게 추가할 수 있다.

#### 라. 재사용성

* 데코레이터 패턴은 기존 Decorator 클래스를 재사용하여 다른 객체에도 새로운 시능을 추가할 수 있도록 함으로써 코드의 재사용성을 높인다.

### i. 단점

#### 가. 복잡성

* 데코레이터 패턴은 여러 개의 Decorator 클래스가 사용될 때 코드가 복잡해질 수 있다. 이로 인해 패턴에 익숙하지 않은 개발자들에게는 코드를 이해하고 유지보수하는데 어려움을 줄 수 있다.
  
#### 나. 성능 오버헤드

* 각 Decorator 클래스가 자신의 작업을 수행한 후 다음 데코레이터로 호출을 위임해야 하므로 성능 오버헤드가 발생할 수 있다. 특히 많은 수의 Decorator 클래스가 사용된다면 시스템 성능에 영향을 줄 수 있다.

#### 다. 의존성 주입

* 데코레이터 패턴은 의존성 주입 프레임워크를 사용하는 시스템에서 구현하기 어려울 수 있다. 프레임워크가 데코레이터 패턴을 인지해야 하고, 데코레이터 객체가 어떻게 생성되는지 알아야 하기 때문이다.

## e. 사용 시기

### i. 비디오 스트리밍 플랫폼

* 비디오 스트리밍 플랫폼에서 영화나 동영상을 시청할 때, 각 동영상에는 자막, 언어 선택, 화질 선택, 오디오 선택 등 다양한 기능을 추가할 수 있다. 이와 같이 기본 기능에 동적으로 추가적인 기능을 부여할 때 데코레이터 패턴을 사용한다.

# 5.2 Decorating our Beverages

## a. 안 좋은 예시

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/ff089dd3-c43f-47bd-afec-6388eb10d6f3#center" alt="image" height="75%" width="75%" onclick="showImage(this)">

&nbsp;&nbsp; Beverage 클래스는 음료의 모든 재료 속성과 메서드를 포함한다. 새로운 재료가 추가되면 Beverage 클래스와 모든 서브 클래스를 수정해야 하므로 개방-폐쇄 원칙(OCP)을 위반한다. 또한 재료가 많아질수록 코드가 복잡해지고 유지보수가 어려워진다. Beverage 클래스에서 음료의 기본 베이스와 재료 추가, 가격 계산 등을 모두 처리하므로 하나의 클래스가 너무 많은 책임을 갖게 된다. 이는 단일 책임 원칙(SRP)을 위반하는 것이다.

&nbsp;&nbsp; 재료의 다양한 조합을 표현하려면 조합별로 새로운 클래스를 생성해야 하므로 클래스의 수가 기하급수적으로 증가한다. 재료에 따른 has, set 메서드가 반복적으로 사용되며 각 서브클래스에서 비슷한 동작을 수행하는 cost 메서드가 중복된다. 따라서 위 구조는 매우 비효율적이며, 유지보수가 어렵다.

## b. 데코이레터 패턴 적용

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/b0a205a4-5786-486f-89b7-73b342c2b37a#center" alt="image" height="100%" width="100%" onclick="showImage(this)">

### i. Beverage

```java
public abstract class Beverage {
    String description = "Unknown Beverage";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}
```

### ii. CondimentDecorator

```java
public abstract class CondimentDecorator extends Beverage {
    Beverage beverage;
    public abstract String getDescription();
}
```

### iii. Concrete Beverage

#### 가. HouseBlend

```java
public class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "House Blend Coffee";
    }
    
    public double cost() {
        return 0.89;
    }
}
```

#### 나. Espresso

```java
public class Espresso extends Beverage {
    public Espresso() {
        description = "Espresso";
    }

    public double cost() {
        return 1.99;
    }
}
```

#### 다. DarkRoast

```java
public class DarkRoast extends Beverage {
    public DarkRoast() {
        description = "Dark Roast";
    }

    public double cost() {
        return 0.99;
    }
}
```

#### 라. Decaf

```java
public class Decaf extends Beverage {
    public Decaf() {
        description = "Decaf";
    }

    public double cost() {
        return 1.05;
    }
}
```

### iv. Concrete Condiment

#### 가. Milk

```java
public class Milk extends CondimentDecorator {
    public Milk(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Milk";
    }

    public double cost() {
        return beverage.cost() + 0.1;
    }
}
```

#### 나. Mocha

```java
public class Mocha extends CondimentDecorator {
    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    public double cost() {
        return beverage.cost() + 0.2;
    }
}
```

#### 다. Soy

```java
public class Soy extends CondimentDecorator {
    public Soy(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Soy";
    }

    public double cost() {
        return beverage.cost() + 0.15;
    }
}
```

#### 라. Whip

```java
public class Whip extends CondimentDecorator {
    public Whip(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Whip";
    }

    public double cost() {
        return beverage.cost() + 0.1;
    }
}
```

### v. Main

```java
public class App {
    public static void main(String[] args) throws Exception {
        Beverage espresso = new Espresso();
        System.out.println(espresso.getDescription() + " $" + espresso.cost());

        Beverage darkRoast = new DarkRoast();
        darkRoast = new Mocha(darkRoast);
        darkRoast = new Mocha(darkRoast);
        darkRoast = new Whip(darkRoast);
        System.out.println(darkRoast.getDescription() + " $" + darkRoast.cost());

        Beverage houseBlend = new HouseBlend();
        houseBlend = new Soy(houseBlend);
        houseBlend = new Mocha(houseBlend);
        houseBlend = new Whip(houseBlend);
        System.out.println(houseBlend.getDescription() + " $" + houseBlend.cost());
    }
}
```

<!-- 
기말: 코드 나오기는 하는데 코드 중심은 아니다.
반은 누구나 대답할 만한 질문, 25%은 디자인에 관한 이야기, 25%는 디자인 패턴에 관한 이야기
디자인 패턴의 이름, 어디에 적용하는지, 형태
전체의 50%는 내 생각을 물어보는 질문->이러면 디자인 패턴의 특징에 대해 알아야 겠는데?
서술형임. 말이 길면 잘 모르는 것이기 때문에 감점 요소가 될 수 있다. 정말 핵심만 아는 것만 적어라. 괜히 길게 쓰다가 깎인다. 왠만하면 3~4문장으로 끝내라. 어떤 관점에서 이렇게 생각한다.
고수준의 언어를 사용해라. 용어를 제대로 사용해라. 전문가스러운 언어를 사용해라.
시간은 1시간 30분
6시에서 7시 30분까지
 -->