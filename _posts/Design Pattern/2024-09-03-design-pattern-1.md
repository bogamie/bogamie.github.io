---
title:  "1. 디자인 패턴의 개요"
excerpt: "객체 지향 프로그래밍의 객체 개념과 자바의 기본 문법, 예외 처리, 반복문, 배열 및 Java Collections Framework를 학습한다."
date:   2024-09-03 12:14:34 +0900
categories: Design Pattern
permalink: posts/1-overview-of-design-patterns
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---

# 1.1 객체 지향 프로그래밍

## a. 객체란?

### i. 사전적 의미

명사

1. `철학` **의사나 행위가 미치는 대상.**
> 묘지 침해죄는 침해의 객체에 따라 묘소와 시설물의 절취, 훼손과 시체에 대한 침해로 구분된다.

2. `언어` **문장 내에서 동사의 행위가 미치는 대상.**
> 피동문 ‘선생님이 술래에게 잡히셨다.’에서 ‘술래’가 주체이면 ‘선생님’은 객체이다.

3. `철학` **작용의 대상이 되는 쪽.**
> 유럽에서 시작된 과학적 세계관은 인간을 사유하는 주체로 파악한 반면 자연 세계는 사유하는 주체의 객체나 대상으로 사물화했다.

### ii. 프로그램에서의 의미

**객체지향 프로그래밍**에서 객체는 클래스의 인스턴스[^1]이다. 클래스 객체는 자료와 그 자료를 다루는 명령의 조합을 포함하여 객체가 메시지를 받고 자료를 처리하며 메시지를 다른 객체로 보낼 수 있도록 한다. 실세계의 비유로 설명하자면, 가령 어떤 사람이 집에서 살기를 원할 때, 그 집의 청사진(집의 설계도)이나 축소 모형 따위는 전혀 필요가 없다. 필요한 것은 설계에 맞는 실제 집이다. 이 비유에서 청사진은 클래스를, 실제 집은 객체를 나타낸다.

### iii. 결론

&nbsp;&nbsp; 현실 세상의 개념을 프로그래밍에 반영하려는 시도가 바로 객체 지향 프로그래밍이다. 객체 지향 프로그래밍에서는 각 객체가 특정한 책임을 가지고 있으며, 이 책임을 통해 문제를 해결합니다.

<div class="bg"></div>

> **객체**란 문제를 해결할 책임이 있는 존재

<div class="bg"></div>

#### 가. 책임

&nbsp;&nbsp; 여기서 말하는 **책임**은 2가지 책임이 있다.

* 문제 해결에 필요한 정보를 알아야 할 책임
> 자동차의 연료 상태를 알고 있어야 주유가 필요함을 판단할 수 있음
* 문제 해결을 하기 위한 행위의 책임(해결에 대한 책임)
> 자동차가 속도를 줄이기 위해 감속할 수 있어야 함

&nbsp;&nbsp; 이런 식으로 객체는 문제를 해결하기 위해 정보를 저장하고, 해당 정보를 바탕으로 동작을 수행한다.

# 1.2 Java

## a. Q1

&nbsp;&nbsp; 본격적으로 디자인 패턴에 대해 공부하기 전에 자바로 간단한 문제를 해결해보자. 자바로 객체를 정의하고, 다음 조건을 만족하는 hello 메소드를 작성하라:

* **매개변수**: 문자열(String)과 정수(int)를 받음
* **동작**: 문자열이 'kim'이고 정수 값의 절댓값만큼 '>>> Hello kim!!!' 문장을 반복하여 반환
* **main 메소드**: 객체 인스턴스를 생성하고, 'world'와 3을 인자로 hello 메소드를 호출하여 반환 값을 출력

<div class="bg"></div>
<div class="bg"></div>
<div class="bg"></div>

<details><summary><strong>답안</strong></summary>

<div class="bg"></div>
<div class="bg"></div>

<pre><code class="language-java hljs" data-highlighted="yes"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Test</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> String <span class="hljs-title function_">hello</span><span class="hljs-params">(String name, <span class="hljs-type">int</span> n)</span> {
        <span class="hljs-type">StringBuilder</span> <span class="hljs-variable">str</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringBuilder</span>();
        
        <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; Math.abs(n); i++) {
            str.append(<span class="hljs-string">"&gt;&gt;&gt; Hello "</span>).append(name).append(<span class="hljs-string">"!!!\n"</span>);
        }
        <span class="hljs-keyword">return</span> str.toString();
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
    	<span class="hljs-type">Test</span> <span class="hljs-variable">test</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Test</span>();
    	
    	System.out.println(test.hello(<span class="hljs-string">"world"</span>, <span class="hljs-number">3</span>));
    }
}
</code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

</details>


## b. Q2

&nbsp;&nbsp; 위 코드에서 자바의 예약어가 아닌 것을 모두 밑줄을 그어라.

<details><summary><strong>답안</strong></summary>

<div class="bg"></div>
<div class="bg"></div>

<pre><code class="language-java hljs" data-highlighted="yes"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_"><ins>Test</ins></span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <ins>String</ins> <span class="hljs-title function_"><ins>hello</ins></span><span class="hljs-params">(<ins>String</ins> <ins>name</ins>, <span class="hljs-type">int</span> <ins>n</ins>)</span> {
        <span class="hljs-type"><ins>StringBuilder</ins></span> <span class="hljs-variable"><ins>str</ins></span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_"><ins>StringBuilder</ins></span>();
        
        <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable"><ins>i</ins></span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; <ins>i</ins> &lt; <ins>Math</ins>.<ins>abs</ins>(<ins>n</ins>); <ins>i</ins>++) {
            <ins>str</ins>.<ins>append</ins>(<span class="hljs-string">"&gt;&gt;&gt; Hello "</span>).<ins>append</ins>(<ins>name</ins>).<ins>append</ins>(<span class="hljs-string">"!!!\n"</span>);
        }
        <span class="hljs-keyword">return</span> <ins>str</ins>.<ins>toString</ins>();
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_"><ins>main</ins></span><span class="hljs-params">(<ins>String</ins>[] <ins>args</ins>)</span> {
    	<span class="hljs-type"><ins>Test</ins></span> <span class="hljs-variable"><ins>test</ins></span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_"><ins>Test</ins></span>();
    	
    	<ins>System</ins>.<ins>out</ins>.<ins>println</ins>(<ins>test</ins>.<ins>hello</ins>(<span class="hljs-string">"world"</span>, <span class="hljs-number">3</span>));
    }
}
</code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

<div class="bg"></div>
<div class="bg"></div>

<pre><code class="language-java hljs" data-highlighted="yes"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_"><ins>Test</ins></span> {
</code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

<ul>
  <li><code>public</code> 키워드는 접근 지정자(access specifier)라고 하며 선언된 클래스가 다른 클래스에서 활용하거나 접근할 수 있음을 뜻한다. 예약어이다.</li>
  <li><code>class</code> 키워드는 클래스를 선언할 때 사용하고 예약어이다.</li>
</ul>

<br>
<div class="bg"></div>

<pre><code class="language-java hljs" data-highlighted="yes"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <ins>String</ins> <span class="hljs-title function_"><ins>hello</ins></span><span class="hljs-params">(<ins>String</ins> <ins>name</ins>, <span class="hljs-type">int</span> <ins>n</ins>)</span> {
</code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

<ul>
  <li><code>static</code> 키워드는 모든 객체가 공유하는 변수로 객체에 포함되지 않고, 별도의 메모리 공간에 올라간다. 예약어이다.</li>
  <li><code>String</code> 객체는 문자열을 위한 <strong>클래스</strong>로 예약어가 아니다. java.lang 패키지에 포함되어 있다.</li>
  <li>변수는 예약어가 아니다.</li>
</ul>

<p style="text-align: center;">·<br>·<br>·</p>

<pre><code class="language-java hljs" data-highlighted="yes"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_"><ins>main</ins></span><span class="hljs-params">(<ins>String</ins>[] <ins>args</ins>)</span> {
</code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

<ul>
  <li><code>main</code>은 자바 프로그램에서 <strong>가장 중요한 메소드</strong>로, 프로그램이 실행될 때 가장 먼저 실행되며 한 클래스에 하나의 main 메소드만 존재해야 한다. 특별한 이름이지만 예약어는 아니다.</li>
  <li><code>args</code>는 String 배열로 main() 메소드가 시작되기 전, 전달 받은 명령행 인자들을 문자열로 만들어 args 배열에 저장한다. 배열의 이름이므로 예약어가 아니다.</li>
</ul>

<br>
<div class="bg"></div>

<pre><code class="language-java hljs" data-highlighted="yes"><ins>System</ins>.<ins>out</ins>.<ins>println</ins>(<ins>test</ins>.<ins>hello</ins>(<span class="hljs-string">"world"</span>, <span class="hljs-number">3</span>));
</code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

<ul>
  <li><code>System</code>은 자바의 클래스 이름으로 java.lang 패키지에 포함된 클래스이며, 시스템 관련 기능을 제공합니다. 예약어가 아니다.</li>
  <li><code>out</code>은 System 클래스 내부의 정적 필드이다. 표준 출력 스트림을 나타내는 PrintStream 객체를 참조한다. 예약어가 아니다.</li>
  <li><code>println</code>은 PrintStream 클래스의 메소드 이름이다. 이 메소드는 데이터를 출력한 후 줄 바꿈을 추가하는 기능을 한다. 역시 예약어가 아니다.</li>
</ul>
</details>

## c. Q3

&nbsp;&nbsp; 위 코드에서 객체의 인스턴스를 찾아라.

<details><summary><strong>답안</strong></summary>

<div class="bg"></div>
<div class="bg"></div>

<pre><code class="language-java hljs" data-highlighted="yes"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Test</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> String <span class="hljs-title function_">hello</span><span class="hljs-params">(String <strong>name</strong>, <span class="hljs-type">int</span> n)</span> {
        <span class="hljs-type">StringBuilder</span> <strong><span class="hljs-variable">str</span></strong> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringBuilder</span>();
        
        <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; Math.abs(n); i++) {
            <strong>str</strong>.append(<span class="hljs-string">"&gt;&gt;&gt; Hello "</span>).append(<strong>name</strong>).append(<span class="hljs-string">"!!!\n"</span>);
        }
        <span class="hljs-keyword">return</span> <strong>str</strong>.toString();
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] <strong>args</strong>)</span> {
    	<span class="hljs-type">Test</span> <strong><span class="hljs-variable">test</span></strong> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Test</span>();
    	
    	System.out.println(test.hello(<span class="hljs-string">"world"</span>, <span class="hljs-number">3</span>));
    }
}
</code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

&nbsp;&nbsp; <strong>객체의 인스턴스</strong>란 클래스를 기반으로 생성된 객체를 의미한다. 따라서 객체의 인스턴스에는 <code>String</code> 클래스로 생성된 name, args와 <code>StringBuilder</code> 클래스의 인스턴스인 str, <code>Test</code> 클래스의 인스턴스 test가 있다.

</details>

## d. Q4

&nbsp;&nbsp; Java Collections Framework에 대해 설명하고 Collection에서 파생된 객체 이름을 나열하라.

<details><summary><strong>답안</strong></summary>

<h3 id="java-collections-framework">Java Collections Framework</h3>

<p>&nbsp;&nbsp; JCF란 다수의 데이터를 쉽고 효과적으로 처리할 수 있는 표준화된 방법을 제공하는 클래스의 집합을 의미한다. 데이터를 저장하는 자료 구조와 데이터를 처리하는 알고리즘을 구조화하여 클래스로 구현해 놓은 것이다. 여기서 Collection은 데이터의 집합이나 그룹이라고 생각할 수 있다.</p>

<h4 id="주요-구성-요소">주요 구성 요소</h4>

<ol>
  <li>
    <p><strong>Collection 인터페이스</strong>: 모든 컬렉션 클래스가 구현해야 하는 기본 인터페이스이다. 데이터 요소를 모아놓은 구조를 정의한다. <code>Collection</code> 인터페이스의 주요 하위 인터페이스는 <code>List</code>, <code>Set</code>, <code>Queue</code>이다.</p>
  </li>
  <li><strong>List 인터페이스</strong>: 순서가 있는 컬렉션을 정의하며, 중복된 요소를 허용한다. 예를 들어, 리스트는 데이터의 삽입 순서를 유지한다.
    <ul>
      <li><strong>ArrayList</strong>: 동적 배열 기반의 리스트이다. 인덱스를 통해 요소에 접근할 수 있다.</li>
      <li><strong>LinkedList</strong>: 연결 리스트 기반의 리스트이다. 삽입 및 삭제가 빈번한 상황에서 성능이 좋다.</li>
    </ul>
  </li>
  <li><strong>Set 인터페이스</strong>: 순서가 없는 컬렉션을 정의하며, 중복된 요소를 허용하지 않는다.
    <ul>
      <li><strong>HashSet</strong>: 해시 테이블 기반의 집합이다. 요소의 순서를 유지하지 않으며, 빠른 검색과 삽입을 지원한다.</li>
      <li><strong>LinkedHashSet</strong>: 해시 테이블과 링크드 리스트를 기반으로, 요소의 삽입 순서를 유지한다.</li>
      <li><strong>TreeSet</strong>: 정렬된 집합이다. 요소는 정렬된 순서로 유지되며, <code>SortedSet</code> 인터페이스를 구현한다.</li>
    </ul>
  </li>
  <li><strong>Queue 인터페이스</strong>: FIFO(First In, First Out) 방식으로 요소를 처리하는 자료 구조이다. 주로 대기열을 구현할 때 사용된다.
    <ul>
      <li><strong>LinkedList</strong>: <code>Queue</code> 인터페이스를 구현한 동시에 <code>List</code> 인터페이스도 구현한다.</li>
      <li><strong>PriorityQueue</strong>: 요소를 우선 순위에 따라 정렬하는 큐이다.</li>
    </ul>
  </li>
  <li><strong>Map 인터페이스</strong>: 키-값 쌍으로 데이터를 저장하는 컬렉션이다. 각 키는 유일하며, 각 키는 단 하나의 값과 연관된다.
    <ul>
      <li><strong>HashMap</strong>: 해시 테이블 기반의 맵이다. 키의 순서를 유지하지 않으며, 빠른 검색과 삽입을 지원한다.</li>
      <li><strong>LinkedHashMap</strong>: 해시 테이블과 링크드 리스트를 기반으로, 삽입 순서를 유지한다.</li>
      <li><strong>TreeMap</strong>: 키를 정렬된 순서로 유지하는 맵이다. <code>SortedMap</code> 인터페이스를 구현한다.</li>
    </ul>
  </li>
  <li><strong>Deque 인터페이스</strong>: Double-ended Queue의 약자로, 양쪽 끝에서 요소를 추가하거나 제거할 수 있는 큐이다.
    <ul>
      <li><strong>ArrayDeque</strong>: 동적 배열 기반의 덱이다.</li>
      <li><strong>LinkedList</strong>: <code>Deque</code> 인터페이스를 구현하면서 <code>Queue</code>와 <code>List</code> 인터페이스도 구현한다.</li>
    </ul>
  </li>
</ol>

<h4 id="collection에서-파생된-객체-이름">Collection에서 파생된 객체 이름</h4>

<ul>
  <li><strong>List 인터페이스에서 파생된 객체</strong>:
    <ul>
      <li><code>ArrayList</code></li>
      <li><code>LinkedList</code></li>
      <li><code>Vector</code> (구식)</li>
    </ul>
  </li>
  <li><strong>Set 인터페이스에서 파생된 객체</strong>:
    <ul>
      <li><code>HashSet</code></li>
      <li><code>LinkedHashSet</code></li>
      <li><code>TreeSet</code></li>
    </ul>
  </li>
  <li><strong>Queue 인터페이스에서 파생된 객체</strong>:
    <ul>
      <li><code>LinkedList</code> (Queue와 List를 모두 구현)</li>
      <li><code>PriorityQueue</code></li>
      <li><code>ArrayDeque</code></li>
    </ul>
  </li>
  <li><strong>Map 인터페이스에서 파생된 객체</strong>:
    <ul>
      <li><code>HashMap</code></li>
      <li><code>LinkedHashMap</code></li>
      <li><code>TreeMap</code></li>
    </ul>
  </li>
  <li><strong>Deque 인터페이스에서 파생된 객체</strong>:
    <ul>
      <li><code>ArrayDeque</code></li>
      <li><code>LinkedList</code> (Deque와 Queue를 모두 구현)</li>
    </ul>
  </li>
</ul>

</details>

----

[^1]: 인스턴스란 객체 지향 프로그래밍(Object Oriented Programming)에서 class에 소속된 개별적인 객체를 말한다.