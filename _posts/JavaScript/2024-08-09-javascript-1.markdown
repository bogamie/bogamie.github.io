---
title:  "Javascript 기본 문법"
excerpt: "자바스크립트의 변수 선언, 데이터 타입, 조건문, 반복문, 함수 등 핵심 개념을 알아보자"
date:   2024-08-09 13:31:10 +0900
categories: JavaScript
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
permalink: posts/javascript-기본-문법
published: false
---
# 1. 기본 용어

## 1.1 표현식과 문장

### a. 표현식

```javascript
273
10 + 20 + 30 * 2
"JavaScript Programming"
```

&nbsp;&nbsp; 값을 만들어 내는 간단한 코드를 표현식이라고 한다.

### b. 문장

```javascript
273;
10 + 20 + 30 + 2;
let name = "윤" + "인" + "성"
consol.log("Hello World...!")
```

&nbsp;&nbsp; 표현식이 하나 이상 모인 집합을 문장이라고 한다.

> **_Note_**\
> 프로그래밍에서의 '문장'은 `statement`라고 표현한다. 여기서 문장은 `실행할 수 있는 최소 단위`를 의미한다.\
> 어떤 코드를 입력한 후 실행했을 때, 정상적으로 실행된다면 해당 코드는 문장이다.

<div class="bg"></div>

## 1.2 키워드

```javascript
break       else        instanceof  true
case        false       new         try
catch       finally     null        typeof
continue    for         return      var
default     function    switch      void
delete      if          throw       with
let         const    
```

&nbsp;&nbsp; 키워드는 특별한 의미가 부여된 단어로 뒤에서 배울 식별자로 선언하면 안 된다.

<div class="bg"></div>

## 1.3 식별자

```javascript
  ⭕             ❌
alpha           break
alpha10         273alpha
_alpha          has space
$alpha
AlPha
ALPHA
```
&nbsp;&nbsp; 식별자는 변수와 함수 이름 등으로 사용되는 단어이다. 식별자를 생성할 때 다음 규칙을 지켜야 한다.

* 키워드를 사용하지 않는다.
* 특수 문자는 `_`, `$`만 사용할 수 있다.
* 숫자로 시작하지 않는다.
* 공백은 입력하지 않는다.
* a, b처럼 의미 없는 단어보다는 `input`, `output`처럼 의미 있는 단어를 사용한다.

<div class="bg"></div>

```js
will out        // willOut
will return     // willReturn
i am a boy      //iAmABoy
```

* 클래스의 이름은 항상 대문자로 시작한다.
* 변수, 함수, 속성, 메소드의 이름은 항상 소문자로 시작한다.
* 여러 단어로 된 식별자는 각 단어의 첫 글자를 대문자로 한다.

<div class="bg"></div>

```js
alert('Hello World')        // 함수
Array.length                // 속성
input                       // 변수 또는 상수
prompt('Message', 'Defstr') // 함수
Math.PI                     // 속성
Math.abs(-273)              // 메소드
```

&nbsp;&nbsp; 자바스크립트의 식별자는 크게 네 종류로 나눌 수 있다.

| 구분                  | 단독으로 사용  | 다른 식별자와 사용 |
|:----------------------|:---------------|:-------------------|
| **식별자 뒤에 괄호 없음** | 변수 또는 상수 | 속성               |
| **식별자 뒤에 괄호 있음** | 함수           | 메소드             |

<div class="bg"></div>

## 1.4 주석

```js
// 주석은 코드의 실행에 영향을 주지 않는다.
/**
 * 여러줄
 * 주석
 */
```

&nbsp;&nbsp; 주석은 프로그램에 영향을 주지 않는 코드로 프로그램을 설명할 때 사용한다.

<div class="bg"></div>

# 2. 출력

## 2.1 출력 메소드

```js
console.log("JavaScript Programming");
```

&nbsp;&nbsp; 자바스크립트의 가장 기본적인 출력 방법은 consol 객체의 `log()` 메소드를 사용하는 것이다.

<div class="bg"></div>

## 2.2 REPL을 사용한 출력

```
> "안녕"+"하세요"
'안녕하세요'
> 52+123
175
>
```

&nbsp;&nbsp; 간단한 코드를 실행할 때 REPL에 입력하여 출력을 확인할 수 있다.

<div class="bg"></div>

# 3. 기본 자료형

## 3.1 숫자

```js
console.log(52);
console.log(52.271);
```

<div class="bg"></div>

### 연산자

```js
console.log(1 + 2); // 3
console.log(1 - 2); // -1
console.log(1 * 2); // 2
console.log(1 / 2); // 0.5
console.log(1 % 2); // 1
```

| 연산자 | 설명 |
| :- | :- |
|+|덧셈 연산자|
|-|뺄셈 연산자|
|*|곱셈 연산자|
|/|나눗셈 연산자|
|%|나머지 연산자| 

<div class="bg"></div>

> **_Note_**
> ```js
console.log(4 % 3);     // 1
console.log(-4 % 3);    // -1
console.log(4 % -3);    // 1
console.log(-4 % -3);   // -1
> ```
> 나머지 연산자와 부호의 관계를 알아보자. 나머지 연산자의 부호는 왼쪽 피연산자의 부호를 따른다. 오른쪽 피연산자의 부호는 전혀 관계가 없으므로 주의하자.

<div class="bg"></div>

> **_Note_**
> ```js
console.log(5.0 % 2.2);   // 0.5999999999999996
> ```
> 자바스크립트는 소수점이 있는 숫자에도 나머지 연산자를 적용할 수 있다. 하지만 결과값을 예측하기 어려우므로 사용하는 것을 지양하자.

<div class="bg"></div>

## 3.2 문자열

&nbsp;&nbsp; 문자의 집합을 문자열이라고 한다. 예를 들어 'abcdefg', 'Hello World', 'a' 등이 해당한다.

<div class="bg"></div>

### a. 기본 문자열

```
> "Hello"
'Hello'
> 'Hello'
'Hello'
```

&nbsp;&nbsp; 자바스크립트는 기본적인 문자열을 생성할 때 `'` 또는 `"`를 사용한다.

<div class="bg"></div>

```js
> console.log("This is 'String'")
This is 'String'
undefined
> console.log('This is "String"')
This is "String"
undefined
```
```js
console.log("This is "String"")
console.log("This is "String"")
           ^^^^^^^^^^

Uncaught SyntaxError: missing ) after argument list
```

&nbsp;&nbsp; 내부에 작은따옴표를 사용하고 싶다면 외부에는 큰따옴표를 사용한다. 반대로 내부에 큰따옴표를 사용하고 싶다면 외부에는 작은따옴표를 사용한다. 한 가지 따옴표를 사용하면 오류가 난다. 한 가지 따옴표로 일관되게 쓰고 싶다면 이스케이프 문자를 사용한다.

<div class="bg"></div>
<div class="bg"></div>



<div class="bg"></div>

```js
> console.log("This is \"String\"")
This is "String"
undefined
> console.log('This is \'String\'')
This is 'String'
undefined
```

<div class="bg"></div>

&nbsp;&nbsp; 이스케이프 문자는 이 외에도 여러 가지 특수한 기능이 있다. 

| 이스케이프 문자 | 설명 |
| :-: | :- |
| \t | 수평 탭 |
| \n | 줄바꿈 |
| \\' | 작은따옴표 |
| \\" | 큰따옴표 |
| \\\\\ | 역슬래시 |

```js
> console.log("동해물과 백두산이 \n마르고 닳도록")
동해물과 백두산이
마르고 닳도록
undefined
```      