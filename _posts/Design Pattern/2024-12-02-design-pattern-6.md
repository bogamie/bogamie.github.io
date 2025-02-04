---
title:  "6. Factory Method Pattern"
excerpt: "&nbsp;&nbsp; 객체를 생성하기 위한 인터페이스는 선언하지만 어떤 클래스의 인스턴스를 생성할지는 서브 클래스에서 결정하게 한다. 팩토리 메서드는 객체 생성을 서브 클래스로 미루어 처리하도록 한다."
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

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/6208cb21-0876-49e6-b545-cd714de11e76#center" alt="image" height="75%" width="75%" onclick="showImage(this)">

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

* 클래스 생성과 사용의 처리 로직을 분리하여 결합도를 낮추고자 할 때
* 객체를 캡슐화하여 정보 은닉 처리를 하고자 할 때
* 라이브러리 또는 프레임워크 사용자에게 구성 요소를 확장하는 방법을 제공할 때
* 기존 객체를 재구성하는 대신 기존 객체를 재사용하여 리소스를 절약하고자 할 때

### i. 자동차 공장

* 자동차 제조 공장에서의 소프트웨어 시스템을 생각해보자. 제조 회사는 자동차, 트럭, 오토바이 등 다양한 종류의 차량을 생산한다. 이때 팩토리 메서드 패턴을 사용하여 다양한 차량 유형의 생성을 간소화 시킬 수 있다.

### ii. 게임 개발

* 게임에서 다양한 캐릭터, 무기, 아이템을 생성할 때 팩토리 메서드 패턴을 사용한다.
* 예를 들어, RPG 게임에서 캐릭터를 생성할 때 팩토리 메서드 패턴을 통해 전사, 마법사, 궁수 등 다양한 캐릭터를 생성할 수 있다.

# 6.2 추상 팩토리 패턴이란?

## a. 의도

&nbsp;&nbsp; 추상 팩토리 패턴은 서로 관련되거나 의존하는 객체들을 구체적인 클래스를 사용하지 않고 인터페이스나 추상 클래스를 통해 생성할 수 있도록 한다. 이를 통해 시스템이 여러 객체의 집합으로 구성할 수 있게 하며, 높은 수준 유연성을 제공하고 생성된 객체들이 서로 호환되도록 보장한다.

## b. 동기

&nbsp;&nbsp; 어떤 애플리케이션이 GUI의 다양한 테마와 같은 여러 가지 사용자 인터페이스 스타일을 지원해야 하는 상황을 가정해보자. 추상 메서드 패턴을 적용하지 않는다면 코드베이스는 각 지원되는 스타일에 대한 조건문으로 가득 차게 되어 시스템을 확장하거나 수정하는 것이 어려워질 것이다. 추상 팩토리 패턴은 객체 생성 과정을 캡슐화함으로써 클라이언트 코드가 구체적인 클래스가 아닌 추상 인터페이스를 통해 작업하도록 한다.

## c. 구조

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/f2a4062e-988a-4024-9690-33a12736c679#center" alt="image" height="100%" width="100%" onclick="showImage(this)">

### i. Client

* Client는 객체와 상호작용하기 위해 AbstractFactory와 AbstractProduct로 정의된 인터페이스를 사용한다.

### ii. The Creator classes

#### 가. AbstractFactory

* AbstractFactory는 제품들의 집합을 생성하기 위한 메서드를 정의한다.

#### 나. ConcreteFactory

* AbstractFactory 인터페이스를 구현하여 연관된 제품들의 집합을 생성한다.

### iii. The Product classes

#### 가. AbstractProduct

* 제품의 종류에 대한 인터페이스를 정의한다.

#### 나. Product

* AbstractProduct 인터페이스를 구현하고 해당 팩토리에서 생성된 구체적인 제품을 나타낸다.

## d. 결과

### i. 장점

#### 가. 구체 클래스들의 분리

* 클라이언트 코드가 구체 클래스의 세부사항으로부터 격리되어 있어 유연성과 유지보수성이 향상된다.
  
#### 나. 일관된 집합

* 생성된 객체들이 서로 호환되고 동일한 집합에 속하도록 보장한다.

### ii. 단점

#### 가. 복잡성

* 새로운 재품이나 집합을 추가하려면 인터페이스를 확장하고 새로운 클래스를 구현해야하므로 복잡성이 증가할 수 있다.
  
#### 나. 런타임 오버헤드 (Run-time Overhead)

* 런타입에 복잡한 객체를 생성해야 하는 경우 성능 오버헤드가 발생할 수 있다.

## e. 사용 시기

* 시스템이 여러 객체들의 집합으로 구성되어야 할 때
* 시스템이 객체들의 생성, 구성, 표현 방법과 독립적이어야 할 때
* 서로 연관되거나 의존적인 객체들의 집합을 반드시 함께 사용하여야 하고, 시스템이 여러 집합을 지원해야 할 때
  * 특정 집합에 속하는 객체들끼리만 호환되어야 한다.
  * 예를 들어 Windows UI와 Mac UI 객체가 서로 호환되지 않고 각각의 스타일로 유지되어야 한다.

# 6.3 Pizza Store

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

## b. 팩토리 메서드 패턴 적용

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/cada99f2-fcfc-44ff-bbbc-0ee362df71ab#center" alt="image" height="100%" width="100%" onclick="showImage(this)">

### i. The Creator classes

#### 가. PizzaStore

```Java
public abstract class PizzaStore {
    public Pizza orderPizza(String type) {
        Pizza pizza;

        pizza = createPizza(type);

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }

    abstract Pizza createPizza(String type);
}
```

#### 나. NYPizzaStore

```Java
public class NYPizzaStore extends PizzaStore {
    Pizza createPizza(String item) {
        if (item.equals("cheese")) {
            return new NYStyleCheesePizza();
        } else if (item.equals("veggie")) {
            return new NYStyleVeggiePizza();
        } else if (item.equals("clam")) {
            return new NYStyleClamPizza();
        } else if (item.equals("pepperoni")) {
            return new NYStylePepperoniPizza();
        } else return null;
    }
}
```

#### 다. ChicagoPizzaStore

```Java
public class ChicagoPizzaStore extends PizzaStore {
    Pizza createPizza(String item) {
        if (item.equals("cheese")) {
            return new ChicagoStyleCheesePizza();
        } else if (item.equals("veggie")) {
            return new ChicagoStyleVeggiePizza();
        } else if (item.equals("clam")) {
            return new ChicagoStyleClamPizza();
        } else if (item.equals("pepperoni")) {
            return new ChicagoStylePepperoniPizza();
        } else return null;
    }
}
```

#### 라. NYPizzaStore

```Java
public class NYPizzaStore extends PizzaStore {
    Pizza createPizza(String item) {
        if (item.equals("cheese")) {
            return new NYStyleCheesePizza();
        } else if (item.equals("veggie")) {
            return new NYStyleVeggiePizza();
        } else if (item.equals("clam")) {
            return new NYStyleClamPizza();
        } else if (item.equals("pepperoni")) {
            return new NYStylePepperoniPizza();
        } else return null;
    }
}
```

### ii. The Product classes

#### 가. Pizza

```Java
import java.util.ArrayList;

public abstract class Pizza {
    String name;
    String dough;
    String sauce;
    ArrayList<String> toppings = new ArrayList<String>();

    void prepare() {
        System.out.println("Preparing " + name);
        System.out.println("Tossing dough...");
        System.out.println("Adding sauce...");
        System.out.println("Adding toppings: ");
        for (String topping : toppings) {
            System.out.println("       " + topping);
        }
    }

    void bake() {
        System.out.println("Bake for 25 minutes at 350");
    }

    void cut() {
        System.out.println("Cutting the pizza into diagonal slices");
    }

    void box() {
        System.out.println("Place pizza in official PizzaStore box");
    }

    public String getName() {
        return name;
    }
}
```

#### 나. NYStyleCheesePizza

```Java
public class NYStyleCheesePizza extends Pizza {
    public NYStyleCheesePizza() {
        name = "NY Style Sauce and Cheese Pizza";
        dough = "Thin Crust Dough";
        sauce = "Marinara Sauce";

        toppings.add("Grated Reggiano Cheese");
    }
}
```

#### 다. ChicagoStyleCheesePizza

```Java
public class ChicagoStyleCheesePizza extends Pizza {
    public ChicagoStyleCheesePizza() {
        name = "Chicago Style Deep Dish Cheese Pizza";
        dough = "Extra Thick Crust Dough";
        sauce = "Plum Tomato Sauce";

        toppings.add("Shredded Mozzarella Cheese");
    }

    void cut() {
        System.out.println("Cutting the pizza into square slices");
    }
}
```

### iii. Main

```Java
public class App {
    public static void main(String[] args) throws Exception {
        PizzaStore nyStore = new NYPizzaStore();
        PizzaStore chicagoStore = new ChicagoPizzaStore();

        Pizza pizza = nyStore.orderPizza("cheese");
        System.out.println("Ethan ordered a " + pizza.getName() + "\n");

        pizza = chicagoStore.orderPizza("cheese");
        System.out.println("Joel ordered a " + pizza.getName() + "\n");
    }
}
```

### iv. 결과

```Text
Preparing NY Style Sauce and Cheese Pizza
Tossing dough...
Adding sauce...
Adding toppings: 
       Grated Reggiano Cheese
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Ethan ordered a NY Style Sauce and Cheese Pizza

Preparing Chicago Style Deep Dish Cheese Pizza
Tossing dough...
Adding sauce...
Adding toppings:
       Shredded Mozzarella Cheese
Bake for 25 minutes at 350
Cutting the pizza into square slices
Place pizza in official PizzaStore box
Joel ordered a Chicago Style Deep Dish Cheese Pizza
```

&nbsp;&nbsp; 팩토리 메서드 패턴을 적용하여 객체 생성 책임을 분리하였다. PizzaStore 클래스의 `createPizza()` 메서드를 통해 객체 생성 책임을 서브 클래스로 위임하였다. 이를 통해 이전 코드의 문제점 중 단일 책임 원칙(SRP)을 해결하였다.

&nbsp;&nbsp; 하지만 피자 객체 생성을 팩토리에 위임하는 것이 아닌 PizzaStore 클래스에서 직접 생성한다. 따라서 PizzaStore는 모든 피자 객체에 의존하게 되어 피자 객체를 수정하거나 추가한다면 PizzaStore 클래스에 영향을 미치게 된다. 우리는 이것을 PizzaStore가 피자 객체에 의존한다고 말한다. 이는 의존관계 역전 원칙(DIP)을 위반하는 것이다.

## c. 추상 팩토리 패턴 적용

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/904d42ce-c0cb-48a1-afd2-9f9b0fbbefa2#center" alt="image" height="100%" width="100%" onclick="showImage(this)">

&nbsp;&nbsp; 따라서 위에서 언급한 문제를 해결하기 위해 추상 팩토리 패턴을 적용한다.

### i. The Creator classes

#### 가. PizzaStore

```Java
public abstract class PizzaStore {
    protected abstract Pizza createPizza(String item);

    public Pizza orderPizza(String type) {
        Pizza pizza = createPizza(type);
        System.out.println("--- Making a " + pizza.getName() + " ---");
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        return pizza;
    }
}
```

#### 나. NYPizzaStore

```Java
public class NYPizzaStore extends PizzaStore {
    protected Pizza createPizza(String item) {
        Pizza pizza = null;
        PizzaIngredientFactory ingredientFactory = new NYPizzaIngredientFactory();

        if (item.equals("cheese")) {
            pizza = new CheesePizza(ingredientFactory);
            pizza.setName("New York Style Cheese Pizza");
        } else if (item.equals("veggie")) {
            pizza = new VeggiePizza(ingredientFactory);
            pizza.setName("New York Style Veggie Pizza");
        } else if (item.equals("clam")) {
            pizza = new ClamPizza(ingredientFactory);
            pizza.setName("New York Style Clam Pizza");
        } else if (item.equals("pepperoni")) {
            pizza = new PepperoniPizza(ingredientFactory);
            pizza.setName("New York Style Pepperoni Pizza");
        }

        return pizza;
    }
}
```

#### 다. PizzaIngredientFactory

```Java
public interface PizzaIngredientFactory {
    public Dough createDough();
    public Sauce createSauce();
    public Cheese createCheese();
    public Veggies[] createVeggies();
    public Pepperoni createPepperoni();
    public Clams createClam();
}
```

#### 라. NYPizzaIngredientFactory

```Java
public class NYPizzaIngredientFactory implements PizzaIngredientFactory {
    public Dough createDough() {
        return new ThinCrustDough();
    }

    public Sauce createSauce() {
        return new MarinaraSauce();
    }

    public Cheese createCheese() {
        return new ReggianoCheese();
    }

    public Veggies[] createVeggies() {
        Veggies veggies[] = { new Garlic(),
                              new Onion(),
                              new Mushroom(),
                              new RedPepper() };
        return veggies;
    }

    public Pepperoni createPepperoni() {
        return new SlicedPepperoni();
    }

    public Clams createClam() {
        return new FreshClams();
    }
}
```

### ii. The Product classes

#### 가. Pizza

```Java
public abstract class Pizza {
    String name;

    Dough dough;
    Sauce sauce;
    Veggies veggies[];
    Cheese cheese;
    Pepperoni pepperoni;
    Clams clam;

    abstract void prepare();

    void bake() {
        System.out.println("Bake for 25 minutes at 350");
    }

    void cut() {
        System.out.println("Cutting the pizza into diagonal slices");
    }

    void box() {
        System.out.println("Place pizza in official PizzaStore box");
    }

    void setName(String name) {
        this.name = name;
    }

    String getName() {
        return name;
    }

    public String toString() {
        StringBuffer result = new StringBuffer();
        result.append("---- " + name + " ----\n");
        if (dough != null) {
            result.append(dough);
            result.append("\n");
        }
        if (sauce != null) {
            result.append(sauce);
            result.append("\n");
        }
        if (cheese != null) {
            result.append(cheese);
            result.append("\n");
        }
        if (veggies != null) {
            for (int i = 0; i < veggies.length; i++) {
                result.append(veggies[i]);
                if (i < veggies.length-1) {
                    result.append(", ");
                }
            }
            result.append("\n");
        }
        if (clam != null) {
            result.append(clam);
            result.append("\n");
        }
        if (pepperoni != null) {
            result.append(pepperoni);
            result.append("\n");
        }
        return result.toString();
    }
}
```

#### 나. CheesePizza

```Java
public class CheesePizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;
 
    public CheesePizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }
 
    void prepare() {
        System.out.println("Preparing " + name);
        dough = ingredientFactory.createDough();
        sauce = ingredientFactory.createSauce();
        cheese = ingredientFactory.createCheese();
    }
}
```

#### 다. Dough

```Java
public interface Dough {
    String toString();
}
```

#### 라. ThinCrustDough

```Java
public class ThinCrustDough implements Dough {
    public String toString() {
        return "Thin Crust Dough";
    }
}
```

### iii. Main

```Java
public class App {
    public static void main(String[] args) throws Exception {
		PizzaStore nyStore = new NYPizzaStore();
		PizzaStore chicagoStore = new ChicagoPizzaStore();
 
		Pizza pizza = nyStore.orderPizza("cheese");
		System.out.println("Ethan ordered a " + pizza + "\n");
 
		pizza = chicagoStore.orderPizza("cheese");
		System.out.println("Joel ordered a " + pizza + "\n");

		pizza = nyStore.orderPizza("clam");
		System.out.println("Ethan ordered a " + pizza + "\n");
 
		pizza = chicagoStore.orderPizza("clam");
		System.out.println("Joel ordered a " + pizza + "\n");

		pizza = nyStore.orderPizza("pepperoni");
		System.out.println("Ethan ordered a " + pizza + "\n");
 
		pizza = chicagoStore.orderPizza("pepperoni");
		System.out.println("Joel ordered a " + pizza + "\n");

		pizza = nyStore.orderPizza("veggie");
		System.out.println("Ethan ordered a " + pizza + "\n");
 
		pizza = chicagoStore.orderPizza("veggie");
		System.out.println("Joel ordered a " + pizza + "\n");    
    }
}
```

### iv. 결과

```Text
--- Making a New York Style Cheese Pizza ---
Preparing New York Style Cheese Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Ethan ordered a ---- New York Style Cheese Pizza ----
Thin Crust Dough
Marinara Sauce
Reggiano Cheese


--- Making a Chicago Style Cheese Pizza ---
Preparing Chicago Style Cheese Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Joel ordered a ---- Chicago Style Cheese Pizza ----
Thick Crust Dough
Plum Tomato Sauce
Mozzarella Cheese


--- Making a New York Style Clam Pizza ---
Preparing New York Style Clam Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Ethan ordered a ---- New York Style Clam Pizza ----
Thin Crust Dough
Marinara Sauce
Reggiano Cheese
Fresh Clams


--- Making a Chicago Style Clam Pizza ---
Preparing Chicago Style Clam Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Joel ordered a ---- Chicago Style Clam Pizza ----
Thick Crust Dough
Plum Tomato Sauce
Mozzarella Cheese
Frozen Clams


--- Making a New York Style Pepperoni Pizza ---
Preparing New York Style Pepperoni Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Ethan ordered a ---- New York Style Pepperoni Pizza ----
Thin Crust Dough
Marinara Sauce
Reggiano Cheese
Garlic, Onion, Mushroom, RedPepper
Sliced Pepperoni


--- Making a Chicago Style Pepperoni Pizza ---
Preparing Chicago Style Pepperoni Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Joel ordered a ---- Chicago Style Pepperoni Pizza ----
Thick Crust Dough
Plum Tomato Sauce
Mozzarella Cheese
Black Olives, Spinach, Eggplant
Sliced Pepperoni


--- Making a New York Style Veggie Pizza ---
Preparing New York Style Veggie Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Ethan ordered a ---- New York Style Veggie Pizza ----
Thin Crust Dough
Marinara Sauce
Reggiano Cheese
Garlic, Onion, Mushroom, RedPepper


--- Making a Chicago Style Veggie Pizza ---
Preparing Chicago Style Veggie Pizza
Bake for 25 minutes at 350
Cutting the pizza into diagonal slices
Place pizza in official PizzaStore box
Joel ordered a ---- Chicago Style Veggie Pizza ----
Thick Crust Dough
Plum Tomato Sauce
Mozzarella Cheese
Black Olives, Spinach, Eggplant
```