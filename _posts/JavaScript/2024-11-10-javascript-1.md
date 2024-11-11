---
title:  "1. Javascript 언어"
excerpt: "자바스크립트의 변수 선언, 데이터 타입, 조건문, 반복문, 함수 등 핵심 개념을 알아보자"
date:   2024-11-10 17:12:23 +0900
categories: JavaScript
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
permalink: posts/javascript-language
published: true
---
# 1.1 Javascript 시작

## a. Javascript 언어란?

&nbsp;&nbsp; 자바스크립트는 1995년 넷스케이프(Netscape Communications Corporation) 사에서 개발되고 Netscape Navigator 2.0의 브라우저에 최초로 탑재되었다.

## b. Javascript의 특징

* 자바스크립트는 **조각난 소스 코드 형태**로 **HTML 페이지에 내장**된다.
* 자바스크립트 소스 코드는 **컴파일 과정 없이** 브라우저 내부의 자바스크립트 **처리기(인터프리터)**에 의해 바로 실행된다.
* 자바스크립트는 **C언어 구조를 차용**하고 **단순화**시켰다.

## c. Javascript의 역할

* **사용자의 입력 및 계산**
    * 키나 마우스의 입력과 계산은 오직 자바스크립트로만 처리할 수 있다.
* **웹 페이지 내용 및 모양의 동적 제어**
    * HTML 태그의 속정, 콘텐츠, CSS 프로퍼티 값을 동적으로 변경할 수 있다.
* **브라우저 제어**
    * 브라우저 윈도우 크기나 모양 제어
    * 새 윈도우 열기
    * 다른 웹 사이트 접속
    * 브라우저의 히스토리 제어
* **웹 서버와의 통신**
* **웹 애플리케이션 작성**
    * 캔버스 그래픽, 로컬/세션 스토리지, 위치 정보 서비스 등

## d. Javascript 코드의 위치

### i. HTML 태그의 이벤트 리스너 속성에 작성

```html
<img src="apple.png" alt="img" onclick="this.src='banana.png'">
```

#### 가. 이벤트

* 마우스 클릭, 키보드 입력, 이미지나 HTML 문서의 로딩, 타이머의 타임아웃 등 사용자의 입력 행위나 브라우저의 상태 변화를 자바스크립트 코드에게 알리는 통지(notification)이다.

#### 나. 이벤트 리스너

* 발생한 이벤트에 적절히 대처하기 위해 작성된 자바스크립트 코드를 가리킨다.
* 이벤트 리스너 이름은 이벤트 이름 앞에 'on'을 붙인다.
    * load 이벤트(문서 로딩 완료) -> onload 이벤트 리스너
    * click 이벤트(마우스 클릭) -> onclick 이벤트 리스너
    * submit 이벤트(submit 버튼 클릭) -> onsubmit 이벤트 리스너
    * reset 이벤트(reset 버튼 클릭) -> onreset 이벤트 리스너
    * keypress 이벤트(키보드 입력) -> onkeypress 이벤트 리스너
    * keyup 이벤트(키보드 입력 후 키를 떼는 순간) -> onkeyup 이벤트 리스너
    * keydown 이벤트(키보드 입력 시) -> onkeydown 이벤트 리스너
    * resize 이벤트(브라우저 창 크기 조절) -> onresize 이벤트 리스너
    * change 이벤트(폼 요소의 값 변경) -> onchange 이벤트 리스너
    * dblclick 이벤트(마우스 더블 클릭) -> ondblclick 이벤트 리스너

### ii. \<script\>\</script\> 내에 작성

```html
<!DOCTYPE html>
<html>
<head>
    <script>
    function over(obj) {
        obj.src = "banana.png";
    }
    function out(obj) {
        obj.src = "apple.png";
    }
    </script>
</head>
<body>
    <img src="apple.png" alt="이미지" 
            onmouseover="over(this)"
            onmouseout="out(this)">
</body>
</html>
```

* \<script\> 태그는 \<head\> 태그나 \<body\> 태그 내에 작성할 수 있다.
* 웹 페이지 내에 여러 개의 \<script\> 태그를 작성할 수 있다.

### iii. JavaScript 파일에 작성

```html 
<script src="script.js"></script>
```

* 자바스크립트 코드를 별도의 파일로 작성하고 HTML 문서에서 이 파일을 참조하는 방법이다.

### iv. URL 부분에 작성

```html
<a href="javascript:alert('Hello')">Hello</a>
```

## e. Javascript로 HTML 콘텐츠 출력

### i. `document.write()`

```javascript
document.write("<h2>Hello<h2>");
```

### ii. `doucment.writeln()`

```javascript
document.writeln("<h2>Hello<h2>");
```

* `writeln()`은 텍스트에 `\n`을 덧붙여 출력한다. 이때 `\n`은 다음 줄로 넘어가지 않고 빈칸 하나로 처리된다. 다음 줄로 넘어가려면 `<br>` 태그를 사용해야 한다.

## f. Javascript 다이얼로그

### i. 프롬프트 다이얼로그

```javascript
let ret = prompt("출력할 메시지", "기본값");
k
if (ret == null) {
    // 취소 버튼 또는 다이얼로그를 닫은 경우
}
else if (ret == "") {
    // 입력값이 없는 경우
}
else {
    // 입력값이 있는 경우
}
```

### ii. 확인 다이얼로그

```javascript
let ret = confirm("출력할 메시지");

if (ret == true) {
    // 확인 버튼을 누른 경우
}
else {
    // 취소 버튼을 눌렀거나 다이얼로그를 닫은 경우
}
```

### iii. 경고 다이얼로그

```javascript
alert("출력할 메시지"); // 단순 메시지 출력
```

<div class="bg"></div>

# 1.2 데이터 타입과 변수

## a. Javascript 식별자

* **식별자**(identifier)란 자바스크립트 프로그램의 변수, 상수(리터럴), 함수 등을 구별하기 위해 사용하는 이름이다.
* 식별자를 만들 때의 규칙
    * 첫 번째 문자: 알파벳(A-Z, a-z), 언더스코어(_), $ 문자만 사용 가능
    * 두 번째 문자부터: 알파벳(A-Z, a-z), 숫자(0-9), 언더스코어(_), $ 문자 사용 가능
    * 대소문자를 구분: `apple`과 `Apple`은 다른 변수

## b. 문장 구분

```javascript
i = i + 1               // 한 줄에 하나의 문장만 있는 경우 세미콜론 생략 가능
j = j + 1;
k = k + 1; m = m + 1;   // 한 줄에 여러 문장 가능
n = n + 1 p = p + 1;    // 오류. 첫 번째 문장 끝에 세미콜론 필요
```

* 자바스크립트 프로그램의 기본 단위는 **문장**(statement)이다.
* 문장은 **세미콜론**(`;`)으로 끝난다.

## c. 주석문

```javascript
// 한 줄 주석
/*
    여러 줄 주석
*/
```

## d. 데이터 타입

* **숫자 타입**: 정수, 실수, NaN, Infinity
* **논리 타입**: true, false
* **문자열 타입**: '문자열', "문자열"
* **객체 레퍼런스 타입**: 객체를 가리킴. C 언어의 포인터와 유사
* **null**: 값이 없음을 표시하는 특수 키워드. `Null`과 `NULL`은 다른 것

## e. 변수

### i. `var`

```javascript
var score;
var year, month, day;
var name = "홍길동";
```

* 초기값 없이 선언된 변수는 `undefined` 값을 가진다.
* 동일 이름의 변수를 재선언할 수 있다.
* 재선언이 가능하므로 프로그램이 복잡해질 수 있다. 따라서 `let` 키워드를 사용하는 것이 좋다.

### ii. `let`

```javascript
let score;
let year, month, day;
let name = "홍길동";
```

* 초기값 없이 선언된 변수는 `undefined` 값을 가진다.
* 동일 이름의 변수를 재선언할 수 없다.
* 재선언이 불가능하므로 프로그램이 복잡해지는 것을 방지할 수 있다.

### iii. `const`

```javascript
const PI = 3.141592;
```

* 상수를 선언할 때 사용한다.

### iv. 리터럴

```javascript
let x = 10;         // x는 변수, 10은 리터럴
```

* 변수가 데이터 저장 공간의 이름이라면, **리터럴**(literal)은 데이터 값 자체를 가리킨다.
* 위 코드는 `x`라는 변수에 `10`이라는 리터럴 값을 저장한다.

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/ee954109-37d2-4a61-aee5-adbe73287c70#center" alt="image" height="80%" width="80%">

### v. 변수의 사용 범위와 생명

#### 가. 전역 변수

* 함수 밖에서 선언된 변수
* 함수 내부에 `var`/`let` 키워드 없이 선언된 변수
* 프로그램이 종료될 때까지 존재

#### 나. 지역 변수

* 함수 내부에서 'var'/'let' 키워드로 선언된 변수
* 선언된 함수 내에서만 존재

#### 다. 블록 변수

* `let` 키워드로 `if`, `while`, `for` 등의 블록 내에서 선언된 변수
* 블록을 벗어나면 변수는 소멸

<div class="bg"></div>

```javascript
let x;              // 전역 변수 x 선언. var로 선언해도 동일
function f() {
    let y;          // 지역 변수 y 선언
    x = 10;         // 전역 변수 x에 값 대입
    y = 20;         // 지역 변수 y에 값 대입
    z = 30;         // 전역 변수 z 선언 및 값 대입

    if (y == 20) {
        let b = 40; // 블록 변수 b 선언
        b++;
    }
    // 이곳에서는 b 변수 사용 불가
    // x, y, z 변수 사용 가능
}
// 이곳에서는 x, z 변수 사용 가능. y 변수 사용 불가
```

### v. `this`로 전역변수 접근

```javascript
var x = 10;         // 전역 변수 x 선언
function f() {
    var x;          // 지역 변수 x 선언
    x = 1;          // 지역 변수 x에 1 저장
    this.x = 100;   // 전역 변수 x에 100 저장
}
```

* 지역 변수와 젼역 변수의 이름이 같은 경우 `this` 키워드로 전역 변수에 접근할 수 있다.
* `let` 키워드로 선언된 전역 변수는 `this` 키워드로 접근할 수 없다.

## f. Javascript Hoisting

* 변수나 함수 선언이 해당 코드 블록의 최상단으로 끌어올려지는 현상
* 자바스크립트의 유연성을 제공한다.
    * 변수나 함수를 꼭 코드의 최상단에 선언하지 않더라도, 나중에 해당 변수를 사용할 수 있다.
* 함수 선언을 더 유연하게 사용할 수 있다.
    * 함수 정의가 호출 위치보다 뒤에 있더라도 호출 가능

<div class="bg"></div>

```javascript
console.log(x); // undefined
var x = 10;

sayHello();

function sayHello() {
    console.log("Hello");
}
```

### i. 호이스팅의 주의점

* `var` 키워드로 선언된 변수는 **선언과 동시에 `undefined`로 초기화**된다.
* `let`과 `const` 키워드로 선언된 변수는 **선언과 초기화가 분리**된다.
    * 변수 선언은 메모리에 저장되지만 초기화가 되지 않는다.
    * 변수를 사용하기 전에 초기화를 해야 한다.
    * 초기화 전에 변수를 사용하면 `ReferenceError`가 발생한다. 이 구간을 **Temporal Dead Zone(TDZ)**이라고 한다.
    * 자바스크립트 엔진은 변수의 존재를 인식하지만, 초기화되지 않은 값은 객체로 만들어지지 않았기 때문에 그 값을 사용할 수 없다.

### ii. Javascript의 컴파일 과정

#### 가. JIT(Just-In-Time) 컴파일

* 자바스크립트 엔진은 코드가 실행되기 전에 컴파일을 실행한다. 이 과정에서 코드의 일부를 미리 최적화된 바이트코드나 기계어로 변환하여 성능을 향상시킨다.
* JIT 컴파일러는 코드 실행 중에도 빈번하게 사용되는 코드 경로를 분석하고 최적화한다.
* 반복적인 실행이나 복잡한 연산이 있을 때 최적화된 코드를 사용하여 성능을 향상시킨다.

<div class="bg"></div>

1. **파싱(Parsing) 단계**
    * 자바스크립트 엔진은 코드를 읽어들이고 이해하기 위해 파싱 단계를 거친다.
    * 파싱 단계에서는 코드를 토큰으로 나누고, 토큰을 AST(Abstract Syntax Tree)로 변환한다.
2. **바이트코드 생성**
    * 자바스크립트 엔진은 AST를 바이트코드로 변환한다.
    * 이 과정에서 JIT 컴파일이 실행된다.
3. **JIT 컴파일**
    * JIT 컴파일러는 코드를 실행하기 전에 최적화된 바이트코드로 변환한다.
4. **실행**
    * 최적화된 바이트코드를 실행한다.

## g. 모든 변수는 객체

* 자바스크립트의 기본형 값인 `null`, `undefined`, `boolean`, `number`, `string`과 같은 값들조차도 내부적으로는 객체처럼 동작하는 경우가 다수 있다.
* 원시 값인 숫자나 문자열은 메모리에 **값 자체**로 저장되지만, 이를 다루기 위해서는 자바스크립트 엔진이 **래퍼 객체**를 생성하여 객체처럼 다룬다.
* 자바스크립트의 원시값들은 할당될 때 메모리(Stack/Heap)에 저장한다.
    * `null`, `undefined`, `boolean`, `number`, `string` 등의 원시값은 메모리 크기가 작기 때문에 Stack에 저장한다.
    * `object`, `function` 등의 크기가 큰 데이터나 복잡한 구조를 가진 데이터는 Heap에 저장한다.

<div class="bg"></div>

# 1.3 식과 연산자

<img class="lazy" data-src="https://github.com/user-attachments/assets/97f0d8ec-e995-4193-8681-aed809f1374f#center" alt="image" height="80%" width="80%">

## a. 산술 연산자

* **`+`**, **`-`**, **`*`**, **`/`**, **`%`**
* **`/`** 연산의 결과는 항상 **실수**이다.

## b. 증감 연산자

<img class="lazy" data-src="https://github.com/user-attachments/assets/9ed59a0b-40fb-4e65-9686-ee98fe42dd32#center" alt="image" height="80%" width="80%">

## c. 대입 연산자

<img class="lazy" data-src="https://github.com/user-attachments/assets/4ec182df-a02a-4bd2-9c3b-584e854fd4fd#center" alt="image" height="80%" width="80%">

## d. 비교 연산자

<img class="lazy" data-src="https://github.com/user-attachments/assets/abebcfee-ba6c-4df9-870a-e8df756a85b8#center" alt="image" height="80%" width="80%">

## e. 논리 연산자

<img class="lazy" data-src="https://github.com/user-attachments/assets/062c29a8-11bb-4b5e-8fbf-692fd0a00e64#center" alt="image" height="80%" width="80%">

## f. 조건 연산자

```javascript
condition ? expression1 : expression2;
```

* `condition`이 참이면 `expression1`을 실행하고, 거짓이면 `expression2`를 실행한다.

<div class="bg"></div>

```javascript
let x = 5, y = 3;
let big = (x > y) ? x : y;
```

## g. 비트 연산자

### i. 비트 논리 연산자

<img class="lazy" data-src="https://github.com/user-attachments/assets/a1861369-bdbc-4311-ab31-4a2994de3cdc#center" alt="image" height="80%" width="80%">

### ii. 비트 시프트 연산자

<img class="lazy" data-src="https://github.com/user-attachments/assets/7bc6ed33-7e55-40eb-9d91-82c6996d4b13#center" alt="image" height="80%" width="80%">

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/7c5f3abf-d577-4960-b10e-a11d2c49eebb#center" alt="image" height="80%" width="80%">

## h. 문자열 연산자

### i. 문자열 연결

```javascript
"abc" + "def"; // "abcdef"
"abc" + 123;   // "abc123"
123 + "abc";   // "123abc"
12 + "34";     // "1234"
12 + 34;       // 46
```

* **`+`** 연산자로 문자열을 연결할 수 있다.

<div class="bg"></div>

```javascript
23 + 35 + "abc"; // 23 + 35 = 58, 58 + "abc" = "58abc"
"abc" + 23 + 35; // "abc" + 23 = "abc23", "abc23" + 35 = "abc2335"
```

* **`+`** 연산자는 숫자 더하기와 문자열 연결을 동시에 수행할 수 있으므로 순서에 주의해야 한다.

### ii. 문자열 비교

```javascript
let name = "abc";
let res1 = (name == "abc"); // true
let res2 = (name > "cde");  // false. 문자열 비교는 사전식 순서로 비교
```

* 비교 연산자(`==`, `>`, `<`, `>=`, `<=`)는 문자열 비교에 그대로 사용되며, 사전식 순서로 비교한다.

# 1.4 조건문

## a. if 문

```javascript
if(조건식) {
    ... 실행문 ...
}
```

## b. if-else 문

```javascript
if(조건식) {
    ... 실행문1 ...
}
else {
    ... 실행문2 ...
}
```

## c. 다중 if-else 문

```javascript
if(조건식1) {
    실행문1
}
else if(조건식2) {
    실행문2
}
    ......

else {
    실행문3
}
```

## d. switch 문

```javascript
switch(식) {
    case 값1:
        실행 문장 1;
        break;
    case 값2:
        실행 문장 2;
        break;
        ...
    case 값m:
        실행 문장 m;
        break;
    default:
        실행 문장 n;
}
```

### i. case 문의 값

```javascript
case 1:
case 2.3:
case "abc":
case true:
case 2 + 3: // 2+3의 결과인 5, case 5와 동일
```

* case 문의 값은 `const`로 선언된 상수나 리터럴만 가능하다.

<div class="bg"></div>

```javascript
case a:     // 오류. 변수는 사용 불가
case a > 3: // 오류. 식은 사용 불가
```

* case 문의 값은 변수나 식을 사용할 수 없다.

### ii. break 문

* `break` 문을 사용하지 않으면 `case` 문이 끝날 때까지 실행된다.

# 1.5 반복문

## a. for 문

```javascript
for(초기문; 조건식; 반복 후 작업) {
    ... 작업문 ...
}
```

## b. while 문

```javascript
while(조건식) {
    ... 작업문 ...
}
```

## c. do-while 문

```javascript
do {
    ... 작업문 ...
} while(조건식); // 조건식이 참이면 반복
```

## d. break 문

```javascript
break; // 반복문을 빠져나옴
```

* `break` 문은 반복문을 빠져나올 때 사용한다.
* 여러 반복문으로 중첩된 경우 **현재 반복문 하나만 빠져나온다.**

## e. continue 문

```javascript
continue; // 반복문의 나머지 부분을 건너뜀
```

* `continue` 문은 반복문의 나머지 부분을 건너뛰고 다음 반복을 시작한다.

# 1.6 함수

## a. 함수의 개념

* 목적을 가지고 작성된 코드 블록
* 데이터를 전달받아 정해진 작업을 수행하고 그 결과를 반환하는 코드 블록

## b. 함수의 구성

```javascript
function 함수 이름(arg1, arg2, ..., argn) {
    ...프로그램 코드...
    return 반환값;
}
```

* **`function`** - **함수 선언**을 표시하는 키워드
* **함수 이름** - 함수의 목적에 맞는 이름
* **`arg1`**, **`arg2`**, ..., **`argn`** - **매개변수**. 함수를 호출할 때 전달되는 값
* **프로그램 코드** - 함수가 수행할 작업
* **`return`** - 함수의 결과를 반환하는 키워드

## c. 함수의 호출

```javascript
function adder(a, b) {
    let sum;
    sum = a + b;
    return sum;
}

let result = adder(3, 5);
```

## d. Javascript의 전역 함수

### i. `eval()`

```javascript
let result = eval("2 * 3 + 4 / 2");
```

* 수식이나 자바스크립트 문장을 문자열 형태로 전달받아 실행한 후 결과를 반환한다.

### ii. `parseInt()`

```javascript
let a = parseInt("32");     // "32"를 10진수로 변환, a = 32
let b = parseInt("32", 16); // "32"를 16진수로 해석, b = 50
let c = parseInt("0x32");   // "0x32"를 자동으로 16진수로 해석, c = 50
```

* 문자열을 정수로 변환한다.

### iii. `isNaN()`

```javascript
let a = NaN;
let b = isNaN(a); // true
```

* **`NaN`**은 **숫자가 아님을 나타내는 리터럴 키워드**이다.
* `isNaN()`은 매개 변수의 값이 `NaN`인지 비교하여 맞으면 `true`를 반환한다.

<div class="bg"></div>

```javascript
let n = parseInt("abc");    // "abc"는 정수로 변환할 수 없으므로 NaN 반환
if (isNaN(n)) {
    console.log("숫자가 아닙니다.");
}
```

* `isNaN()`은 주로 `parseInt()` 함수의 리턴값을 검사하기 위해 사용한다.

<div class="bg"></div>

```javascript
isNaN(32)       // false
isNaN("32")     // false
isNaN("32abc")  // true
isNaN(NaN)      // true
```

* 직접 매개변수를 넣어 비교할 수도 있다.

<div class="bg"></div>
<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/da967e69-96ea-4e98-8ceb-5a44acfbfea4#center" alt="image" height="80%" width="80%">

<div class="bg"></div>

# 1.7 이벤트

## a. 이벤트와 이벤트 리스터의 동작

<img class="lazy" data-src="https://github.com/user-attachments/assets/eee01bdf-fa55-45bb-9bec-c9ff09757bb8#center" alt="image" height="80%" width="80%">

## b. Javascript의 이벤트 종류

### i. 마우스 이벤트

* **`click`**: 마우스 클릭
* **`dblclick`**: 마우스 더블 클릭
* **`mouseover`**: 마우스 포인터가 HTML 요소 위로 올라갈 때
* **`mousedown`**: 마우스 버튼을 누르는 순간
* **`mouseup`**: 마우스 버튼을 눌렀다 놓을 때
* **`mousemove`**: 마우스 포인터가 움직일 때
* **`focus`**: HTML 요소가 포커스를 받을 때
* **`blur`**: HTML 요소가 포커스를 잃을 때

### ii. 키보드 이벤트

* **`keypress`**: 키보드 키를 누르는 순간
* **`keyup`**: 키보드 키를 눌렀다 놓을 때
* **`keydown`**: 키보드 키를 누르는 순간

### iii. 윈도우 이벤트

* **`read`**: 문서 객체가 준비되었을 때
* **`load`**: 윈도우가 로딩될 때
* **`unload`**: 윈도우를 닫을 때
* **`resize`**: 윈도우 크기를 조절할 때
* **`scroll`**: 윈도우를 스크롤할 때
* **`error`**: 에러가 발생했을 때

### iv. 폼 이벤트

* **`change`**: 폼 요소의 값이 변경될 때
* **`focus`**: 폼 요소가 포커스를 받을 때
* **`focusin`**: 폼 요소에 포커스가 들어오기 바로 전에 동작
* **`blur`**: 폼 요소가 포커스를 잃을 때
* **`select`**: 입력 양식을 선택할 때 (text, textarea 제외)
* **`submit`**: 폼을 제출할 때

## c. 이벤트 리스너 작성 방법

### i. HTML 태그에 작성

```html
<p onclick="this.style.backgroundColor='yellow'">클릭하세요</p>
```

### ii. 이벤트 리스너 속성에 등록

```html
<script>
function click() {
    this.style.backgroundColor = 'yellow';
}

let pObj = document.getElementById('p1');
pObj.onclick = click;
</script>

<p id="p1">클릭하세요</p>
```

### iii. `addEventListener()` 메서드 사용

```html
<script>
function start() {
    let pObj = document.getElementById('p1');
    pObj.addEventListener("clickEvent", click);
    pObj.addEventListener("clickEvent", over);
}

function click() {
    this.style.backgroundColor = 'yellow';
}

function over() {
    this.style.color = 'red';
}
</script>

<p id="p1">클릭하세요</p>
```

### iv. 익명 함수 사용

```html
<script>
let pObj;

function init() {
    pObj = document.getElementById('p1');
    pObj.onclick = function() {
        this.style.backgroundColor = 'yellow';  // 익명 함수
    }
    pObj.addEventListener("mouseover", function() {
        this.style.color = 'red';  // 익명 함수
    });
}
</script>

<body onload="init()">

...
<p id="p1">클릭하세요</p>
```
