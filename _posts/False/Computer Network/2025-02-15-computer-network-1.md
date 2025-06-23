---
title:  "1. 컴퓨터 네트워크와 인터넷"
excerpt: "&nbsp;&nbsp; "
date:   2025-02-15 22:10:58 +0900
categories: Computer Network
permalink: posts/1-computer-network-and-internet
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
# <img class="lazy invert" data-src="#center" alt="image" height="75%" width="75%" onclick="showImage(this)">
---
# 1.1 인터넷이란 무엇인가?

&nbsp;&nbsp; 인터넷을 정의하는 데에는 두 가지 방법이 있다. 하나는 인터넷의 구성요소를 살펴보는 것으로, 인터넷을 구성하는 기본적인 하드웨어와 소프트웨어를 설명하는 것이다. 다른 하나는 분산 애플리케이션에 서비스를 제공하는 네트워킹 인프라스트럭처 관점에서의 인터넷을 기술하는 것이다.

## a. 구성요소로 본 인터넷

### i. 인터넷

* **인터넷**(internet)은 전 세계적으로 수십억 개의 컴퓨팅 장치를 연결하는 컴퓨터 네트워크이다.

<div class="bg"></div>

### ii. 호스트

* **호스트**(host)는 인터넷에 연결된 장치를 가리킨다. 호스트는 **종단 시스템**(end system)이라고도 불린다. 예를 들어 PC, 서버, 스마트폰, 태블릿, IoT 장치 등이 호스트에 해당한다.

### iii. 통신 링크

* **통신 링크**(communication link)는 호스트들을 연결하는 물리적 매체를 가리킨다.
* 동축케이블, 구리선, 광케이블, 라디오 스펙트럼을 포함한 다양한 물리 매체(physical media)로 구성되어 있다.

#### 가. 전송률

* **전송률**(transmission rate)은 통신 링크가 데이터를 전송할 수 있는 속도를 가리킨다. 
* 초당 비트 수를 의미하는 **bps**(bits per second)로 측정된다.

<div class="bg"></div>

### iv. 패킷 스위치

* **패킷 스위치**(packet switch)는 패킷을 받아들이고 다른 통신 링크로 전달하는 장치이다.

<div class="bg"></div>

### v. 패킷

* **패킷**(packet)은 데이터를 전송하는 데 사용되는 작은 조각이다.
* 한 종단 시스템이 다른 종단 시스템으로 데이터를 전송할 때, 그 데이터를 **세그먼트**(segment)로 나누고 각 세그먼트에 **헤더**(header)를 추가하여 패킷을 생성한다.
* 패킷은 목적지 종단 시스템으로 네트워크를 통해 전송되고 목적지 종단 시스템에서 다시 조립된다.

<div class="bg"></div>

### vi. 패킷 스위치

* **패킷 스위치**(packet switch)는 여러 통신 링크를 통해 들어오는 패킷을 받아 출력 통신 링크로 전달하는 장치이다. 패킷 스위치는 패킷 교환기라고도 불린다.
* 패킷 스위치는 **라우터**(router)와 **링크 계층 스위치**(link-layer switch)로 구성되어 있다.
* 패킷이 종단 시스템까지 도달하기 위해 거치는 통신 링크와 패킷 스위치를 **네트워크 상의 경로**(route 또는 path)라고 한다.

#### 가. 라우터

* **라우터**(router)는 네트워크 코어에서 동작하는 패킷 스위치이다.

#### 나. 링크 계층 스위치

* **링크 계층 스위치**(link-layer switch)는 보통 접속 네트워크에서 동작하는 패킷 스위치이다.

<div class="bg"></div>

### vii. ISP

* **ISP**(Internet Service Provider)는 인터넷에 연결된 호스트들에게 인터넷 접속 서비스를 제공하는 회사이다.
* 종단 시스템은 ISP를 통해 인터넷에 접속하며, ISP는 종단 시스템에게 케이블 모뎀이나 DSL 같은 가정용 초고속 접속, 고속 LAN 접속, 이동 무선 접속, 56 kbps 다이얼업 모뎀 접속을 포함하는 다양한 네트워크 접속을 제공한다.
* 웹사이트와 비디오 서버를 인터넷에 직접 연결하도록 CP(content provider)에게 인터넷 접속을 제공한다.

<div class="bg"></div>

### viii. 프로토콜

* **프로토콜**(protocol)은 종단 시스템이 통신하기 위해 사용하는 규칙의 집합이다.
* 프로토콜 중 가장 중요한 것은 **TCP**(Transmission Control Protocol)와 **IP**(Internet Protocol)이다.

<div class="bg"></div>

### ix. IEFT

* **IEFT**(Internet Engineering Task Force)는 인터넷의 핵심 프로토콜을 개발하고 유지하는 단체이다.
* IEFT 표준 문서를 **RFC**(Request for Comments)라고 부른다.
* RFC에는 TCP, IP, HTTP, SMTP와 같은 프로토콜을 정의한다.

## b. 서비스 측면에서 본 인터넷

&nbsp;&nbsp; 인터넷을 애플리케이션에 서비스를 제공하는 인프라스트럭처 관점에서 살펴보면, 인터넷은 전동적인 애플리케이션뿐만 아니라 영화, 음악 스트리밍을 포함하는 다양한 서비스를 제공한다.

### i. 분산 애플리케이션

* **분산 애플리케이션**(distributed application)은 여러 종단 시스템이 네트워크를 통해 서로 데이터를 교환하는 애플리케이션이다.

### ii. 소켓 인터페이스

* **소켓 인터페이스**(socket interface)는 종단 시스템에서 실행되는 애플리케이션과 네트워크 사이의 인터페이스를 제공한다.

## c. 프로토콜이란 무엇인가?

* **프로토콜**(protocol)이란 둘 이상의 통신 개체 간에 교환되는 메시지 포맷과 순서뿐만 아리나, 메시지의 송수신과 다른 이벤트에 따른 행동들을 정의한 규칙의 집합이다. 
* 통신하는 둘 이상의 원격 개체가 포함된 인터넷에서의 모든 활동은 프로토콜이 제어한다. 
* 쉽게 말해 프로토콜은 통신을 위한 일종의 약속이다.

# 1.2 네트워크의 가장자리

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/5ed8582a-88cf-40d6-8f6d-e2766c6f7ceb#center" alt="네트워크의 가장자리" height="50%" width="50%" onclick="showImage(this)">

* 위 그림에서 인터넷에 연결된 장치들은 인터넷의 가장 자리에 위치하기 떄문에 **종단 시스템**(end system)이라고 불린다.
* 종단 시스템은 **클라이언트**(client)와 **서버**(server)로 구분된다.

## a. 접속 네트워크

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/8e8f0e18-80ad-49dc-8ba7-de9804c3d109#center" alt="접속 네트워크" height="50%" width="50%" onclick="showImage(this)">

* **접속 네트워크**(access network)는 종단 시스템과 가장자리 라우터(edge router)를 사이를 연결하는 네트워크이다.

### i. 가정 접속: DSL, 케이블, FTTH, 5G 고정 무선

#### 가. DSL

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/a362df79-b835-494d-9077-1cafdd6b1e2a#center" alt="DSL" height="65%" width="65%" onclick="showImage(this)">

* **DSL**(Digital Subscriber Line)은 기존의 전화 회선을 통해 디지털 데이터를 전송하는 기술이다.
* 고객의 DSL 모뎀은 텔코의 지역 중앙국(central office, CO)에 있는 DSLAM(DSL Access Multiplexer)과 전화 회선으로 연결된다.
* 가정의 DSL 모뎀은 디지털 데이터를 받아 고주파 신호로 변환하고 전화 회선을 통해 CO로 전송한다.
* 가정으로부터 전송받은 아날로그 신호는 DSLAM에서 디지털 포맷으로 다시 변환된다.
* 데이터와 전화 신호를 동시에 전달하기 위해 다른 주파수 대역에서 인코딩한다. (주파수 분할 다중화)
  * 고속 다운스트림 채널: 50 kHz ~ 1 MHz 대역
  * 중간 속도의 업스트림 채널: 4 ~ 50 kHz 대역 
  * 전화 채널: 0 ~ 4 kHz 대역
* **스플리터**(splitter)는 가정에 도착하는 데이터와 전화 신호를 분리하고 데이터 신호를 **DSL 모뎀**으로 전달한다.
* **DSLAM**도 마찬가지로 데이터와 전화 신호를 분리하고 데이터 신호를 **인터넷**으로 전달한다.
* DSL은 **비대칭**(asymmetric)이다. (다운스트림 속도가 업스트림 속도보다 빠르다.)

#### 나. 케이블 인터넷

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/d538204b-1a79-4a68-8dbb-d94d1d11f615#center" alt="케이블 인터넷" height="65%" width="65%" onclick="showImage(this)">

* **케이블 인터넷 접속**(cable Internet access)은 케이블 TV 회사의 기존 케이블 TV 인프라스트럭처를 이용하여 인터넷 접속 서비스를 제공하는 기술이다.
* 케이블 헤드엔드(cable headend)과 이웃 레벨 정션(junction, 광 노드)은 광케이블로 연결되며, 광 노드와 가정은 동축 케이블로 연결된다.
* 광케이블과 동축케이블을 사용하고 있기 때문에 HFC(hybrid fiber coax)라고 불린다.
* CMTS(cable modem termination system)는 케이블 헤드엔드에 위치하고 DSL 네트워크의 DSLAM과 유사한 역할을 한다. (가정의 케이블 모뎀으로부터 송신된 아날로그 신호를 디지털 신호로 변환)
* 
## b. 물리 매체

### i. 

# 1.3 네트워크 코어

## a. 패킷 교환

## b. 회선 교환

## c. 네트워크의 네트워크

# 1.4 패킷 교환 네트워크에서의 지연, 손실과 처리율

## a. 패킷 교환 네트워크의 지연 개요

## b. 큐잉 지연과 패킷 손실

## c. 종단 간 지연

## d. 컴퓨터 네트워크에서의 처리율

# 1.5 프로토콜 계층과 서비스 모델

## a. 계층 구조

## b. 캡슐화

# 1.6 공격받는 네트워크

# 1.7 컴퓨터 네트워킹과 인터넷의 역사

## a. 패킷 교환 개발: 1961~1972

## b. 독점 네트워크와 인터네트워킹: 1972~1980

## c. 네트워크 확산: 1980~1990

## d. 인터넷 급증: 1990년대

## e. 새 천 년

### i. 

#### 가. 
