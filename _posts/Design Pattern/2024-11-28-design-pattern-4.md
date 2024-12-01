---
title:  "4. Observer Pattern"
excerpt: "&nbsp;&nbsp; 옵저버 패턴은 객체 상태 변화를 다른 객체에 자동으로 알리는 디자인 패턴이다. 이 패턴은 객체 간의 일대다 의존 관계를 정의하여, 하나의 객체가 변경되면 그 변경된 객체를 의존하는 다른 객체들이 알림을 받고 자동으로 업데이트하도록 한다."
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

<img class="lazy" data-src="https://github.com/user-attachments/assets/f8e39eb8-e7b4-4fd7-9bd1-8ffb9ec47c4b#center" alt="image" height="75%" width="75%" onclick="showImage(this)">

### i. 관찰 대상자(발행자)

#### 가. Subject

* Subject는 사전적 의미로 "주체"이다. 옵저버 패턴에서 행동을 하는 주체라고 생각하면 쉽다. Subject는 행동을 하고 상태를 변화시킨다.
* Subject 인터페이스로 관찰 대상자를 정의한다.
* Object는 Observer에 자기 자신을 등록하거나 삭제하기 위해 이 인터페이스를 사용한다.
* 각각의 Subject는 많은 Observer를 가질 수 있다.
  
#### 나. ConcreteSubject

* Subject 인터페이스를 구현하는 Concrete Subject는 관찰 당하는 대상자 역할이다.
* register, remove 메서드와 Subject의 상태가 변화할 때마다 모든 Observer를 업데이트 하기 위한 `notifyObservers()` 메서드를 구현한다.
* 상태를 설정하거나 얻기 위한 세터, 게터를 가지고 있다.

### ii. 관찰자(구독자)

#### 가. Observer

* Observer는 사전적 의미로 "관찰자"이다. Observer는 Subject의 상태 변화를 관찰하는 역할이라고 생각하자.
* 모든 잠재적인 Observer는 Observer 인터페이스를 구현해야 할 필요가 있다.
* 이 Observer 인터페이스는 `update()` 메서드 하나만 가지고 있다. 이 메서드는 Subject의 상태가 변할 때만 호출된다.

#### 나. ConcreteObserver

* Concrete Observer는 Observer 인터페이스를 구현하는 어떠한 클래스도 될 수 있다.
* 각각의 Observer는 Concrete Subject에 등록하여 업데이트를 수신한다.

## e. 사용 시기

* 앱이 한정된 시간, 특정한 케이스에만 다른 객체를 관찰해야 하는 경우
* 대상 객체의 상태가 변경될 때마다 다른 객체의 동작을 작동시켜야 할 때
* 어떤 객체들이 변경되는지 모르는 상황에서 한 객체의 상태가 변경되면 다른 객체도 변경해야 할 때

### i. User Interfaces

* UI에서 데이터 모델에게 요소가 변경되었음을 알리기 위해 사용된다.
* 예를 들어, 웹 애플리케이션에서 폼 요소는 데이터 모델의 observer이다. 사용자가 폼을 통해 데이터를 변경하면 데이터 모델은 폼 요소들에게 상태 변화를 알린다.
* Observer: 폼 요소
* Subject: 데이터 모델

### ii. 메신저

* 메신저에서 새로운 메시지를 subsribers에게 알리기 위해 옵저버 패턴을 사용한다.
* 예를 들어, 채팅 애플리케이션에서 유저는 채팅 방을 구독하고 실시간으로 새로운 메시지를 전달받는다.
* Observer: 유저
* Subject: 채팅 방

### iii. Databases

* 데이터베이스에서 옵저버 패턴은 데이터베이스의 변경 사항을 observer에게 알리기 위해 사용한다.
* 예를 들어, 데이터베이스 트리거는 데이터베이스 테이블의 observer이다. 테이블에 레코드가 삽입, 업데이트 또는 삭제가 되면 트리거는 변경을 알림받고 적절한 행동을 취할 수 있다.
* Observer: 데이터베이스 트리거
* Subject: 데이터베이스 테이블

## f. 장점

### i. 느슨한 결합

* 옵저버 패턴은 객체들의 결합을 느슨하게 만든다. Observer들은 Subject에 대해 아는 정보가 없어도 상태 변화를 알릴 수 있다. 이 특징은 Subject에 영향을 주지 않고도 Observer를 추가, 삭제, 수정하기 쉽게 만든다.
  
### ii. 유연성

* 옵저버 패턴은 매우 유연하여 다양한 소프트웨어 애플리케이션에서 사용할 수 있다. 데이터 업데이트부터 UI까지 어떤 종류의 상태 변화라도 Observer들에게 알릴 수 있다.

### iii. 유지보수성

* 옵저버 패턴은 관심사에 따라 분리하여 코드를 유지 및 보수하기 쉽게 만든다. 애플리케이션의 다른 부분을 고려하지 않고도 특정한 작업에 집중된 코드를 작성할 수 있게 한다.

## g. 단점

### i. 성능

* 많은 Observer들의 상태가 자주 변한다면 옵저버 패턴의 성능에 영향을 끼친다. 이를 약화시키기 위해 개발자들은 애플리케이션을 신중히 디자인 해야하고 코드를 최적화해야 한다.
  
### ii. 복잡성

* 옵저버 패턴은 소프트웨어 애플리케이션에 복잡성을 추가한다. 개발자들은 Observer들이 적절히 알림을 받을 수 있도록 애플리케이션을 신중하게 개발해야 하며, 코드의 유지보수성을 보장해야 한다.

# 4.2 Weather Monitoring Application

## a. 안 좋은 예시

```Java
public class WeatherData {
    // 인스턴스 변수 선언

    public void measurementsChanged() {
        float temp = getTemperature();
        float humidity = getHumidity();
        float pressure = getPressure();

        // 각 디스플레이에게 새로운 데이터 전달
        currentConditionsDisplay.update(temp, humidity, pressure);
        statisticsDisplay.update(temp, humidity, pressure);
        forecastDisplay.update(temp, humidity, pressure);
    }

    // 기타 WeatherData 메소드
}
```

&nbsp;&nbsp; 위 코드에서 `measurementsChanged()` 메서드가 `currentConditionsDisplay`, `statisticsDisplay`, `forecastDisplay`와 같은 구체적인 디스플레이 클래스를 사용하고 있다. 이로 인해 다른 디스플레이 클래스를 추가하거나 삭제하려면 `WeatherData` 클래스를 수정해야 한다. Solid 원칙 중 개방 폐쇄 원칙(Open-Closed Principle)과 의존성 역전 원칙(Dependency Inversion Principle)을 위반하고 있다.

## b. 옵저버 패턴 적용

<img class="lazy" data-src="https://github.com/user-attachments/assets/08a82186-f060-46fe-8342-567b76556f6f#center" alt="image" height="100%" width="100%" onclick="showImage(this)">

&nbsp;&nbsp; 옵저버 패턴을 적용하여 일대다 의존 관계를 정의해보자. Subject는 WeatherData 클래스이고 Observer는 DisplayElement들이다. WeatherData 클래스는 Subject 인터페이스를 구현하고 DisplayElement 클래스들은 Observer와 DisplayElement 인터페이스를 구현한다.

### i. Subject 인터페이스

```Java
public interface Subject {
    public void registerObserver(Observer o);
    public void removeObserver(Observer o);
    public void notifyObservers();
}
```

### ii. Observer 인터페이스

```Java
public interface Observer {
    public void update(float temp, float humidity, float pressure);
}
```

### iii. DisplayElement 인터페이스

```Java
public interface DisplayElement {
    public void display();
}
```

### iv. WeatherData 클래스

```Java
import java.util.ArrayList;

public class WeatherData implements Subject {
    private ArrayList<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherData() {
        observers = new ArrayList<Observer> ();
    }

    public void registerObserver(Observer o) {
        observers.add(o);
    }

    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }

    public void measurementsChanged() {
        notifyObservers();
    }
}
```

### v. Display

#### 가. CurrentConditionsDisplay 클래스

```Java
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temperature;
    private float humidity;
    private WeatherData weatherData;

    public CurrentConditionsDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        this.weatherData.registerObserver(this);
    }
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temperature + "F degrees and " + humidity + "% humidity");
    }
}
```

#### 나. StatisticsDisplay 클래스

```Java
public class StatisticsDisplay implements Observer, DisplayElement {
    private float totalTemp, maxTemp, minTemp;
    private int count;
    private WeatherData weatherData;

    public StatisticsDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        this.weatherData.registerObserver(this);

        maxTemp = Float.MIN_VALUE;
        minTemp = Float.MAX_VALUE;
        totalTemp = 0;
        count = 0;
    }

    public void update(float temperature, float humidity, float pressure) {
        if (maxTemp < temperature) {
            maxTemp = temperature;
        }
        if (minTemp > temperature) {
            minTemp = temperature;
        }

        totalTemp += temperature;
        count++;

        display();
    }

    public void display() {
        System.out.println("Avg/Max/Min temperature = " + totalTemp / count + "/" + maxTemp + "/" + minTemp);
    }
}
```

#### 다. ForecastDisplay 클래스

```Java
public class ForecastDisplay implements Observer, DisplayElement {
    private float prevPressure, currPressure;
    private WeatherData weatherData;

    public ForecastDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        this.weatherData.registerObserver(this);

        prevPressure = 0;
        currPressure = 0;
    }

    public void update(float temperature, float humidity, float pressure) {
        currPressure = pressure;
        display();
    }

    public void display() {
        System.out.print("Forecast: ");

        if (prevPressure < currPressure) {
            System.out.println("Improving weather on the way!");
        }
        else if (prevPressure > currPressure) {
            System.out.println("Watch out for cooler, rainy weather.");
        }
        else {
            System.out.println("More of the same.");
        }
        System.out.println("");
        prevPressure = currPressure;
    }
}
```

### vi. App 클래스

```Java
public class App {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();

        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay(weatherData);
        StatisticsDisplay statisticsDisplay = new StatisticsDisplay(weatherData);
        ForecastDisplay forecastDisplay = new ForecastDisplay(weatherData);

        weatherData.setMeasurements(80, 65, 30.4f);
        weatherData.setMeasurements(82, 70, 29.2f);
        weatherData.setMeasurements(78, 90, 29.2f);
    }
}
```

### vii. 실행 결과

```Text
Current conditions: 80.0F degrees and 65.0% humidity
Avg/Max/Min temperature = 80.0/80.0/80.0
Forecast: Improving weather on the way!

Current conditions: 82.0F degrees and 70.0% humidity
Avg/Max/Min temperature = 81.0/82.0/80.0
Forecast: Watch out for cooler, rainy weather.

Current conditions: 78.0F degrees and 90.0% humidity
Avg/Max/Min temperature = 80.0/82.0/78.0
Forecast: More of the same.
```