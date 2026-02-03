---
title:  "1. 컴퓨터 네트워크와 인터넷"
excerpt: "&nbsp;&nbsp; "
date:   2025-12-29 20:10:58 +0900
categories: Computer Network
permalink: posts/1-computer-network-and-internet
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
# <img class="lazy invert" data-src="#center" alt="image" height="75%" width="75%" onclick="showImage(this)">
---
# 1.1 인터넷이란 무엇인가?
인터넷은 크게 두 가지 관점(구성 요소 중심 vs 서비스 중심)으로 정의할 수 있다.

## 1.1.1 구성 요소 관점
인터넷을 **하드웨어와 소프트웨어 부품**들의 집합으로 설명하는 방식이다.

* **호스트(Hosts) 또는 종단 시스템(End Systems):**
  * 인터넷에 연결된 수십억 개의 컴퓨팅 장치들이다.
  * 전통적인 데스크톱/서버뿐만 아니라 스마트폰, 태블릿, IoT 기기(TV, 가전, 자동차 등)를 모두 포함한다.
* **통신 링크(Communication Links):**
  * 동축 케이블, 구리선, 광섬유, 라디오 스펙트럼 등 다양한 물리 매체로 구성된다.
  * 각 링크는 서로 다른 전송 속도(bits/second)를 가진다.
* **패킷(Packets):**
  * 데이터를 전송할 때 사용하는 정보의 덩어리이다. (데이터를 세그먼트로 나누고 헤더를 붙임)
* **패킷 스위치(Packet Switches):**
  * 입력 링크로 들어온 패킷을 출력 링크로 전달(Forwarding)하는 장치이다.
  * **라우터(Router):** 주로 네트워크 코어(Core)에서 사용된다.
  * **링크 계층 스위치(Link-layer switch):** 주로 액세스 네트워크(Access Network)에서 사용된다.
* **네트워크의 네트워크 (Network of Networks):**
  * **ISP (Internet Service Provider):** 종단 시스템은 ISP를 통해 인터넷에 접속한다.
  * 하위 ISP(지역)는 상위 ISP(국가/국제)와 연결되며, 이들은 서로 상호 연결되어 거대한 네트워크를 형성한다.
* **표준(Standards):**
  * **IETF (Internet Engineering Task Force):** 인터넷 표준을 개발하는 기구이다.
  * **RFC (Request for Comments):** TCP, IP, HTTP, SMTP 등 프로토콜을 정의한 기술 문서이다.

## 1.1.2 서비스 관점
인터넷을 **분산 애플리케이션에 서비스를 제공하는 인프라**로 설명하는 방식이다.

* **분산 애플리케이션 (Distributed Applications):**
  * 이메일, 웹 서핑, 스트리밍, 소셜 미디어 등 서로 다른 종단 시스템에서 데이터를 주고받는 애플리케이션이다.
  * 중요한 점: 애플리케이션은 네트워크 코어(라우터 등)가 아닌 **종단 시스템(End Systems)**에서 실행된다.
* **소켓 인터페이스 (Socket Interface):**
  * **개념:** 한 프로그램이 인터넷 인프라를 통해 다른 프로그램으로 데이터를 전달하도록 요청하는 **규칙**이다.
  * **비유 (우편 서비스):** 앨리스가 밥에게 편지를 보낼 때, 우편 서비스가 요구하는 규칙(봉투에 주소 쓰기, 우표 붙이기, 우체통에 넣기 등)을 따라야 하듯, 애플리케이션도 인터넷이 정한 소켓 인터페이스 규칙을 따라야 데이터를 보낼 수 있다.

## 1.1.3 프로토콜이란 무엇인가?
네트워크 통신의 핵심인 프로토콜의 정의와 역할이다.

### a. 사람의 비유 (Human Analogy)
* 사람 간의 대화에도 암묵적인 프로토콜이 존재한다.
* *예시:* "안녕" (인사)  "안녕" (응답)  "지금 몇 시니?" (요청)  "2시야" (응답)
* 만약 한 쪽이 응답하지 않거나 다른 언어를 쓰면(프로토콜 불일치) 통신이 이루어지지 않는다.

### b. 네트워크 프로토콜 (Network Protocols)
* 사람 대신 하드웨어/소프트웨어 장치 간에 메시지를 교환한다.
* **정의:** **둘 이상의 통신 개체 간에 교환되는 메시지의 포맷(Format)과 순서(Order), 그리고 메시지 송수신이나 이벤트 발생 시 취하는 행동(Actions)을 정의한 것**이다.
* **대표적인 예시 (웹 요청):**
1. **TCP 연결 요청:** 사용자의 컴퓨터  웹 서버
2. **TCP 연결 응답:** 웹 서버  사용자의 컴퓨터
3. **GET 메시지 (파일 요청):** 사용자의 컴퓨터  웹 서버
4. **파일 전송 (웹 페이지):** 웹 서버  사용자의 컴퓨터

# 1.2 네트워크의 가장자리
인터넷의 가장자리에는 우리가 매일 사용하는 컴퓨터, 스마트폰 등의 장치들이 위치한다. 이를 **종단 시스템(End System)** 또는 **호스트(Host)**라고 부른다.

* **호스트의 분류:**
  * **클라이언트(Client):** 데스크톱, 노트북, 스마트폰 등.
  * **서버(Server):** 웹 페이지를 저장 및 분배하고, 비디오를 스트리밍하는 강력한 기기. 대형 데이터 센터에 주로 위치한다.

## 1.2.1 접속 네트워크 (Access Networks)
접속 네트워크는 종단 시스템을 첫 번째 라우터(가장자리 라우터)에 연결하는 물리적 링크이다.

### a. 가정 접속: DSL (Digital Subscriber Line)
<img class="lazy invert" data-src="https://raw.githubusercontent.com/kisue01/assets/refs/heads/main/jao0rgkkvscxab6cw81s.avif#center" alt="image" height="80%" width="80%" onclick="showImage(this)">

* 기존의 **전화선(Twisted-pair copper wire)** 인프라를 사용한다.
* 가정의 DSL 모뎀이 전화국(CO)의 DSLAM과 데이터를 교환한다.
* 전화 신호와 데이터 신호가 서로 다른 주파수를 사용하므로 동시에 사용 가능하다.
* **비대칭(Asymmetric) 속도:** 다운로드 속도가 업로드 속도보다 빠르다.
* **전용 회선:** 각 가정은 전화국과 전용으로 연결되므로 이웃과 대역폭을 공유하지 않는다.

### b. 가정 접속: 케이블 (Cable Internet)
<img class="lazy invert" data-src="https://raw.githubusercontent.com/kisue01/assets/refs/heads/main/vgbylhjy4vuf6ixnw3uh.avif#center" alt="image" height="80%" width="80%" onclick="showImage(this)">

* 기존의 **케이블 TV(Coaxial cable)** 인프라를 사용한다.
* 광섬유와 동축 케이블을 혼합하여 사용하므로 **HFC(Hybrid Fiber Coax)**라고 불린다.
* 케이블 헤드엔드(Head end)의 CMTS가 DSL의 DSLAM과 유사한 역할을 한다.
* **공유 매체(Shared broadcast medium):** 같은 동축 케이블을 사용하는 이웃들과 대역폭을 공유한다. 이웃이 대용량 파일을 다운로드하면 내 속도가 느려질 수 있다.
* DSL과 마찬가지로 다운로드 속도가 더 빠른 비대칭 방식이다.

### c. 가정 접속: FTTH (Fiber To The Home)
<img class="lazy invert" data-src="https://raw.githubusercontent.com/kisue01/assets/refs/heads/main/jgnnov3gduyia79vd7rr.avif#center" alt="image" height="80%" width="80%" onclick="showImage(this)">

* 광섬유(Optical fiber)를 전화국에서 가정까지 직접 연결한다. 가장 빠른 속도를 제공한다.
* **PON(Passive Optical Network) 아키텍처:**
  * 각 가정에는 **ONT**(Optical Network Terminator)가 있다.
  * 여러 가정의 광섬유가 **스플리터(Splitter)**를 통해 하나의 광섬유로 합쳐져 전화국의 **OLT**(Optical Line Terminator)로 연결된다.

### d. 5G 고정 무선 (Fixed Wireless)
* 물리적인 케이블 매설 없이, 기지국에서 빔포밍 기술을 이용해 가정의 모뎀으로 데이터를 무선 전송한다.

### e. 기업 및 가정 접속: 이더넷(Ethernet)과 와이파이(WiFi)
* **이더넷(Ethernet):**
<img class="lazy invert" data-src="https://raw.githubusercontent.com/kisue01/assets/refs/heads/main/f2vgag7aavkfrcsomzr8.avif#center" alt="image" height="80%" width="80%" onclick="showImage(this)">
  * 가장 널리 쓰이는 유선 LAN 기술이다.
  * 트위스티드 페어 선을 이용해 이더넷 스위치에 연결한다.
* **와이파이(WiFi):**
  * 무선 LAN(Wireless LAN) 기술로, IEEE 802.11 표준을 따른다.
  * 무선 사용자는 액세스 포인트(AP)를 통해 유선 네트워크에 연결된다.

### f. 광역 무선 접속 (Wide-Area Wireless Access)
* **3G, 4G(LTE), 5G:** 이동통신망을 이용하여 수십 km 반경 내에서 인터넷에 접속한다.

## 1.2.2 물리 매체 (Physical Media)
비트(Bit)가 송신기에서 수신기로 이동할 때 통과하는 물리적인 재질을 말한다.

### a. 유도 매체 (Guided Media)
견고한 매체를 따라 파동이 유도되는 방식이다.

* **트위스티드 페어 구리선 (Twisted-Pair Copper Wire):**
  * 두 개의 절연된 구리선을 꼬아서 전기적 간섭을 줄인 형태다.
  * 가장 저렴하고 흔하며, LAN(이더넷)과 DSL에서 사용한다. (예: UTP 케이블)
* **동축 케이블 (Coaxial Cable):**
  * 중심 도체와 외부 도체가 동심원 형태를 이룬다.
  * 케이블 TV 및 케이블 인터넷에서 사용되며, 고속 데이터 전송이 가능하다.
* **광섬유 (Fiber Optics):**
  * 빛의 펄스를 이용해 비트를 전송한다.
  * 전자기 간섭에 면역이며, 감쇠가 적어 장거리 전송(해저 케이블 등)에 적합하다.

### b. 비유도 매체 (Unguided Media)
대기나 우주 공간으로 파동을 전파하는 방식이다.

* **지상 라디오 채널 (Terrestrial Radio Channels):**
  * 물리적 선이 필요 없고 벽을 통과할 수 있다.
  * 환경(경로 손실, 간섭 등)의 영향을 많이 받는다.
  * 단거리(블루투스), 근거리(와이파이), 광역(셀룰러)으로 나뉜다.
* **위성 라디오 채널 (Satellite Radio Channels):**
  * 지상국과 위성을 연결한다.
  * **정지 궤도 위성 (Geostationary):** 36,000km 상공에 고정됨. 커버리지가 넓지만 지연 시간(Delay, 약 280ms)이 길다.
  * **저궤도 위성 (LEO):** 지구와 더 가깝고 회전한다. 지연 시간이 짧지만 지속적인 커버를 위해 많은 위성이 필요하다 (예: 스타링크).
