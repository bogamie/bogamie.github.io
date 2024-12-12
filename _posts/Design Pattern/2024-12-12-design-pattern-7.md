---
title: "7. Singleton Pattern"
excerpt: "&nbsp;&nbsp; 특정 클래스가 단 하나의 인스턴스만 가지도록 보장하고, 이를 전역적으로 접근할 수 있는 방법을 제공한다."
date:   2024-12-12 16:09:38 +0900
categories: Design Pattern
permalink: 7-singleton-pattern
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 7.1 싱글톤 패턴이란?

## a. 의도

&nbsp;&nbsp; 특정 클래스가 단 하나의 인스턴스만 가지도록 보장하고, 이를 전역적으로 접근할 수 있는 방법을 제공하기 위함이다. 

## b. 동기

&nbsp;&nbsp; 데이터베이스, 파일 시스템, 프린터 스풀러, 레지스트리와 같이 전역 데이터를 보관하는 시스템 객체들은 시스템 내에서 단 한 번만 생성되고, 시스템의 모든 부분에서 쉽게 접근 가능해야 한다. 이러한 객체들이 한 번만 인스턴스화되도록 보장하는 것이 목표이다.

## c. 구조

<img class="lazy" data-src="https://github.com/user-attachments/assets/d63a7ae8-d1b5-4c19-8215-fe495011e6e0#center" alt="image" height="40%" width="40%" onclick="showImage(this)">

* `uniqueInstance`는 정적 필드로, Singleton 클래스의 유일한 인스턴스를 저장한다.
* `getInstance()` 메서드는 정적 메서드로 클래스 메서드를 의미한다. `Singleton.getInstance()`를 사용해 코드 어디에서나 인스턴스에 접근할 수 있다.
* 싱글톤 패턴을 구현하는 클래스는 유일한 인스턴스를 제공하는 것뿐만 아니라, 자체 데이터와 메서드를 포함한 범용 클래스이다.

## d. 결과

### i. 장점

#### 가. 단일 인스턴스와 전역 접근

* 싱글톤 패턴은 인스턴스가 단 하나만 생성되도록 보장하며, 전역적으로 접근할 수 있는 단일 지점을 제공한다.
* 공유 메서드와 속성의 상호작용을 단순화한다.
  
#### 나. 지연 초기화와 성능 최적화

* 필요할 때만 인스턴스를 생성하므로, 성능을 향상시킬 수 있다.
* 스레드 안전성을 갖춘 싱글톤은 멀티스레드 환경에서도 안전하게 사용할 수 있다.

### ii. 단점

#### 가. 전역 상태와 강한 결합

* 전역 상태를 유지하므로 시스템 동작 추적을 복잡하게 만들고 잠재적인 버그를 유발할 수 있다.
* 싱글톤 클래스에 직접 접근하면 강한 결합을 초래하여 이후 수정, 테스트, 유지보수를 어렵게 만들 수 있다.
  
#### 나. SOLID 원칙 위반 가능성

* 싱글톤 클래스는 인스턴스 생성과 작업 실행이라는 두 가지 책임을 가지므로, 단일 책임 원칙(SRP, Single Responsibility Principle)을 위반할 수 있다.
* 싱글톤으 항상 자신의 인스턴스를 반환하므로, 확장에는 열려 있지 않는다. 이는 개방 폐쇄 원칙(OCP, Open-Closed Principle)을 위반할 수 있다.

## e. 사용 시기

* 애플리케이션 전체에서 하나의 클래스 인스턴스가 필요한 경우
* 애플리케이션 전반에서의 상호작용을 위해 인스턴스에 쉽게 접근해야 하는 경우
* 제한된 리소스를 효율적으로 공유해야 하는 경우
* 중앙 집중식 제어가 필요한 경우

### i. Logger

* 시스템 전반에 걸쳐 로깅 작업을 관리하는 클래스

### ii. 데이터베이스 연결

* 데이터베이스와 상호작용하기 위한 공유 연결을 제공한다.

### iii. 설정 관리자

* 애플리케이션의 설정과 속성을 중앙에서 관리한다.

### iv. 캐시 관리자

* 성능 향상을 위해 캐싱 작업을 처리한다.

### v. 스레드 풀

* 동시에 작동하는 프로그램을 위해 스레드 생성과 실행을 관리한다.

## f. 구현

### i. Eager Initialization

```java
public class Singleton {
    private static final Singleton uniqueInstance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return uniqueInstance;
    }
}
```

* 클래스 로딩 시점에 인스턴스를 생성하므로, 멀티스레드 환경에서 안전하다.
* 초기화 비용이 크거나 인스턴스를 사용하지 않을 경우, 메모리 낭비가 발생할 수 있다.
* 예외 처리를 할 수 없다.
* 인스턴스를 무조건 사용하고 초기화 비용이 크지 않은 경우 적합하다.

### ii. Thread-Safe Initialization

```java
public class Singleton {
    private static Singleton uniqueInstance;

    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
}
```

* `synchronized` 키워드를 사용하여 메서드에 스레드들을 하나씩 접근하도록 설정하여 동기화를 보장한다.
* 여러 모듈들이 반복적으로 객체를 가져올 때 `synchronized` 메서드를 매번 호출하므로 동기화 처리 작업에 오버헤드가 발생하여 성능이 저하될 수 있다.
* 멀티스레드 환경에서 간단히 스레드 안전서을 구현하고 싶을 때 적합하다.

### iv. Double-Checked Locking

```java
public class Singleton {
    private volatile static Singleton uniqueInstance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (uniqueInstance == null) {
            synchronized (Singleton.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

* 두 번의 `if 문`으로 동기화 블록을 최소화하여 성능을 최적화한다.
* `volatile` 키워드를 사용하여 메모리 가시성 문제를 방지한다.
* JDK 1.5 이상에서만 사용 가능하다.

> **Volatile 키워드**
> 
> &nbsp;&nbsp; `volatile` 키워드는 변수를 읽기·쓰기 작업을 CPU 캐시가 아닌 메인 메모리에서 처리하도록 강제한다. 따라서 다른 스레드에서 변수를 읽거나 쓸 때 메인 메모리에서 직접 읽거나 쓰게 된다. 이를 통해 변수의 가시성 문제를 해결할 수 있다.

# 7.2 The Chocolate Factory

## a. 안 좋은 예시

```java
public class ChocolateBoiler {
    private boolean empty;
    private boolean boiled;

    public ChocolateBoiler() {
        empty = true;
        boiled = false;
    }

    public void fill() {
        if (isEmpty()) {
            empty = false;
            boiled = false;
        }
    }

    public void drain() {
        if (!isEmpty() && isBoiled()) {
            empty = true;
        }
    }

    public void boil() {
        if (!isEmpty() && !isBoiled()) {
            boiled = true;
        }
    }

    public boolean isEmpty() {
        return empty;
    }

    public boolean isBoiled() {
        return boiled;
    }
}
```

&nbsp;&nbsp; 위 코드는 다중 인스턴스 생성이 가능하므로 동일한 ChocolateBoiler가 여러개 생성될 수 있다. 이는 우유와 초콜릿과 같이 동일한 객체를 중복 관리하게 되는 문제를 발생시킬 수 있다.

&nbsp;&nbsp; 또한 위 코드가 다중 스레드 환경에서 사용될 경우, 스레드 간 동기화 문제가 발생할 가능성이 크다. 예를 들어, 두 스레드가 동시에 `fill()`이나 `drain()` 메서드를 호출하면 상태 불일치가 발생한다. 따라서 이러한 문제를 해결하기 위해 싱글톤 패턴을 적용하면 된다.

## b. 패턴 적용

### i. Eager Initialization

```java
public class ChocolateBoiler {
    private static final ChocolateBoiler instance = new ChocolateBoiler();
    private boolean empty;
    private boolean boiled;

    private ChocolateBoiler() {
        empty = true;
        boiled = false;
    }

    public static ChocolateBoiler getInstance() {
        return instance;
    }

    public void fill() {
        if (isEmpty()) {
            empty = false;
            boiled = false;
        }
    }

    public void drain() {
        if (!isEmpty() && isBoiled()) {
            empty = true;
        }
    }

    public void boil() {
        if (!isEmpty() && !isBoiled()) {
            boiled = true;
        }
    }

    public boolean isEmpty() {
        return empty;
    }

    public boolean isBoiled() {
        return boiled;
    }
}
```

### ii. Thread-Safe Initialization

```java
public class ChocolateBoiler {
    private static ChocolateBoiler instance;
    private boolean empty;
    private boolean boiled;

    private ChocolateBoiler() {
        empty = true;
        boiled = false;
    }

    public static synchronized ChocolateBoiler getInstance() {
        if (instance == null) {
            instance = new ChocolateBoiler();
        }
        return instance;
    }

    public void fill() {
        if (isEmpty()) {
            empty = false;
            boiled = false;
        }
    }

    public void drain() {
        if (!isEmpty() && isBoiled()) {
            empty = true;
        }
    }

    public void boil() {
        if (!isEmpty() && !isBoiled()) {
            boiled = true;
        }
    }

    public boolean isEmpty() {
        return empty;
    }

    public boolean isBoiled() {
        return boiled;
    }
}
```

### iii. Double-Checked Locking

```java
public class ChocolateBoiler {
    private volatile static ChocolateBoiler instance;
    private boolean empty;
    private boolean boiled;

    private ChocolateBoiler() {
        empty = true;
        boiled = false;
    }

    public static ChocolateBoiler getInstance() {
        if (instance == null) {
            synchronized (ChocolateBoiler.class) {
                if (instance == null) {
                    instance = new ChocolateBoiler();
                }
            }
        }
        return instance;
    }

    public void fill() {
        if (isEmpty()) {
            empty = false;
            boiled = false;
        }
    }

    public void drain() {
        if (!isEmpty() && isBoiled()) {
            empty = true;
        }
    }

    public void boil() {
        if (!isEmpty() && !isBoiled()) {
            boiled = true;
        }
    }

    public boolean isEmpty() {
        return empty;
    }

    public boolean isBoiled() {
        return boiled;
    }
}
```

## c. 테스트

```java
public class App {
    public static void main(String[] args) throws Exception {
        ChocolateBoiler boiler1 = ChocolateBoiler.getInstance();
        ChocolateBoiler boiler2 = ChocolateBoiler.getInstance();

        if (boiler1 == boiler2) {
            System.out.println("boiler1 and boiler2 are the same instance");
        } else {
            System.out.println("boiler1 and boiler2 are different instances");
        }
    }
}
```

<div class="bg"></div>

```bash
boiler1 and boiler2 are the same instance
```