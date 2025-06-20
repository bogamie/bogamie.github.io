---
title:  "1. 멀티미디어 시스템"
excerpt: "&nbsp;&nbsp; "
date:   2025-04-17 21:38:05 +0900
categories: Multimedia System
permalink: 
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 1.1 멀티미디어와 멀티미디어 시스템의 정의

## a. 멀티미디어(Multimedia)

### i. 정의
* ‘multi’ + ‘media’의 결합어로, 다양한 미디어 유형을 통합한 정보 표현 방식이다.
* 텍스트, 그래픽, 사운드, 애니메이션, 비디오 등 두 개 이상의 미디어가 통합된다.
* 1966년 Bob Goldstein이 공연 예술을 설명하며 최초 사용하였다.
* Tay Vaughan의 『Multimedia: Making It Work』(1993)에서 현대적인 정의가 정립됨.
* 컴퓨터로 전달되는 통합된 형태의 정보이다.

## b. 멀티미디어 시스템(Multimedia System)

### i. 정의
* 멀티미디어 데이터를 처리, 저장, 생성, 변형, 전송하는 시스템.
* 텍스트, 이미지, 오디오, 비디오 등 다양한 데이터를 다룰 수 있음.
* 예시: 스마트폰, 디지털TV, 웹 브라우저 등.



# 1.2 멀티미디어 기술의 역사

## a. 컴퓨터 및 OS 발전

* 1980: MS-DOS 기반 PC 등장.
* 1984: Apple의 Macintosh, 마우스 기반 GUI 도입.

## b. 저장장치 발전

* 1981: Sony, 3.5인치 플로피 디스크 출시.
* 1982: Sony + Philips, CD 개발 (650~700MB).
* 1999: USB 플래시 드라이브 등장.
* 최근: HDD에서 SSD로 전환 – 속도 및 안정성 향상.

## c. 네트워크 기술

* 1969: ARPANET – 인터넷의 시초.
* 1973: Ethernet 개발 → 1983년 IEEE 802.3 표준화.
* 1994: Bluetooth 1.0 (10m 거리, 1Mbps 전송 속도).
* 1999: Wi-Fi (IEEE 802.11b, 11Mbps, 2.4GHz).

## d. 멀티미디어 압축 기술

* 1991: MPEG-1 국제 표준 승인.
* 1992: JPEG 국제 표준 승인 → 이후 JPEG2000으로 발전.

# 1.3 멀티미디어의 특성

## a. Media Integrity

### i. 정의

* 둘 이상의 서로 다른 미디어(예: 텍스트, 오디오, 이미지 등)가 통합된 정보.
* 미디어 통합성은 멀티미디어 시스템의 기본 조건으로, 다양한 형태의 데이터를 함께 사용할 수 있도록 한다.

## b. Duplex Communication

### i. 정의
* 송신자와 수신자 간의 양방향 통신이 가능한 특성.
* 전통적인 미디어는 단방향(Simplex)인 반면, 멀티미디어는 양방향 또는 전이중(Full-Duplex) 통신이 가능하다.
* 단방향: 송신자 → 수신자.
* 양방향: 송신자 ↔ 수신자.
* 예시: 전화 통화(양방향), 라디오 방송(단방향).

### ii. 통신 유형
* Simplex: 전통적 단방향 통신 (예: 아날로그 TV).
* Half-duplex: 한 번에 한 방향으로만 송수신 가능.
* Full-duplex: 동시에 양방향 송수신 가능 (예: 디지털 TV + 셋톱박스).

## c. Digital Information Processing

### i. 정의

* 디지털 정보 처리
* 아날로그 신호를 디지털 신호로 변환하여 처리하는 기술.
* 각 미디어는 멀티미디어로 사용되기 전에 디지털화되어야 하며, 이를 통해 디지털 처리의 장점을 활용할 수 있다.
* 디지털 정보 처리는 저장, 전송, 편집, 변환 등의 과정에서 효율적이다.

### ii. 특징
* 모든 미디어는 0과 1의 이진수로 표현됨.
* 디지털화된 미디어는 통합 및 전송, 저장이 용이함.
* 원본 손상 없이 편집, 변환이 가능함.

## d. Media Interaction

### i. 정의

* 미디어 간의 상호작용.
* 서로 다른 미디어가 결합하여 새로운 형태의 정보를 생성함.
* 다양한 미디어 간의 통합 및 상호 연결을 통해 유용한 멀티미디어 응용을 제공하는 특성.
* 음성, 텍스트, 이미지 등 서로 다른 미디어가 상호작용하여 더 풍부한 콘텐츠를 생성한다.

### i. 예시
* STT (Speech-to-Text): 음성을 텍스트로 변환.
* TTS (Text-to-Speech): 텍스트를 음성으로 변환.
* 립싱크 기술: 영상에서 입 모양을 분석해 음성 생성.

## e. User Interface

### i. 정의
* 사용자와 시스템 간 정보를 주고받기 위한 쉽고 편리한 입출력 방식.
* CLI, 메뉴 기반 UI, GUI 등 다양한 형태가 있으며, GUI가 일반적으로 가장 널리 사용된다.

### ii. UI 종류
* CLI (명령어 기반 인터페이스).
* 메뉴 기반 인터페이스.
* GUI (그래픽 사용자 인터페이스): 아이콘, 버튼 등으로 조작.

## f. Massive Storage Device

### i. 정의
* 멀티미디어 데이터는 대용량이므로, 이를 저장할 수 있는 대용량 저장장치가 필요하다.
* 영상, 음악, 이미지 등의 파일은 고용량이기 때문에 하드디스크, SSD, 클라우드 스토리지 등이 필수적이다.

### ii. 저장 장치 필요성
* 멀티미디어 데이터는 크기가 크기 때문에 대용량 저장장치 필요.
* 예: HDD, SSD, USB 등.

# 1.4 멀티미디어 표준

## a. 표준의 정의

### i. 개념
* 기술 사양을 문서화하여 일관성 있게 사용하게 만든 기준.
* 제품, 서비스, 프로세스가 목적에 부합하도록 보장함.
* 국제 표준은 다국적 전문가 협의로 제정됨.

## b. 표준의 종류

### i. De jure (공식 표준)
* ISO, IEEE 등 공식 기관에서 제정한 표준.
* 예: USB, HDMI, ASCII, TCP/IP 등.

### ii. De facto (사실상 표준)
* 널리 사용되어 사실상 표준처럼 받아들여지는 기술.
* 예: QWERTY 키보드, Windows 운영체제 등.

# 1.5 표준화 기관 (Multimedia Standardization Bodies)

## a. 표준(Standard)의 정의

* 표준이란 **기술 명세를 포함한 문서화된 합의 사항**이며, 일관되게 사용되어야 한다.
* 목적은 **재료, 제품, 프로세스 및 서비스가 용도에 적합한지 보장하는 것**이다.

## b. 멀티미디어 표준화 기관의 분류

* **국제기구(International organization)**: ITU, ISO, IEC
* **국가기구(National organization)**: ANSI
* **학술기구(Academic organization)**: IEEE
* **웹 및 인터넷 관련 기관**: W3C, IETF

## c. ISO (International Organization for Standardization)

* 1947년 설립된 비영리 기구로, 165개국 이상의 국가 회원 보유.
* 국제 표준을 개발 및 발표함.
* 약 250개의 TC(Technical Committee)를 보유하며,  
  TC → SC(Subcommittee) → WG(Working Group) 구조로 운영됨.

### i. ISO 국제 표준 제정 절차 (6단계)

1. **NWIP (New Work Item Proposal)**: TC에서 신규 표준화 항목 제안
2. **WD (Working Draft)**: 작업 초안 작성
3. **CD (Committee Draft)**: 위원회 내부 합의 단계
4. **DIS (Draft International Standard)**: 초안에 대한 국제적 리뷰 및 의견 수렴
5. **FDIS (Final Draft International Standard)**: 최종 초안 투표
6. **Publication**: 공식 ISO 국제표준으로 발행

### ii. ISO & IEC 공동 JTC1 (Joint Technical Committee 1)

* ISO와 IEC가 공동 운영하는 ICT 관련 표준화 위원회
* **SC29**는 멀티미디어 코딩/디코딩 관련 핵심 하위위원회임

| JTC 1 표준 | 역할 |
|------------|------|
| SC29-WG1   | 이미지 압축 (JPEG, JBIG) |
| SC29-WG11  | 비디오/오디오 압축 (MPEG) |
| SC29-WG12  | 멀티미디어 정보 표현 (MHEG) |

## d. IEC (International Electrotechnical Commission)

* 전기, 전자, 통신 분야의 국제 표준을 제정하는 기구.
* ISO와 함께 ICT 분야에서 **JTC1을 공동 운영**.


## e. IEEE (Institute of Electrical and Electronics Engineers)

* 1963년 설립된 학술 기관으로, 다양한 기술 분야의 국제 표준을 제정.
* 주요 표준 예시:  
  * **IEEE 802.11** (Wi-Fi)  
  * **IEEE 802.15.1** (Bluetooth)  
  * **IEEE 802.15.4** (ZigBee)


## f. ANSI (American National Standards Institute)

* 미국 내 표준을 관장하는 민간 기구.
* 대표 예시: **ASCII 문자 인코딩 표준**


## g. ITU (International Telecommunication Union)

* UN 산하의 국제 통신 표준화 기구.
* **표준을 ‘Recommendation(권고안)’ 형태로 발행**
* 193개국 + 900개 조직이 참여
* 구성:  
  * **ITU-R**: 무선통신  
  * **ITU-T**: 유선/인터넷 통신  
  * **ITU-D**: 개발도상국 기술 지원  
  * 각 부서 산하에 **SG(Study Group)** 존재

## h. W3C (World Wide Web Consortium)

* 1994년 Tim Berners-Lee(WWW 창시자)가 설립한 웹 표준 기구.
* HTML, CSS, DOM 등 웹 기술의 구조와 규칙 제정.
* 3대 목표:
  * Web for Rich Interaction
  * Web for Data and Services
  * Web for Trust

## i. IETF (Internet Engineering Task Force)

* 인터넷 관련 기술 및 프로토콜 표준화를 담당.
* **IAB(Internet Architecture Board)** 산하 기관.
* TCP/IP, HTTP 등 핵심 인터넷 프로토콜 정의.
