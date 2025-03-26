---
title:  "1. 1강"
excerpt: "&nbsp;&nbsp; "
date:   2025-03-24 18:52:41 +0900
categories: SW Security
permalink: 
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 1.1 보안 위협의 종류

## a. Interruption

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/b09e3e61-356f-437b-a1c1-ea2112893753#center" alt="image" height="25%" width="25%" onclick="showImage(this)">

* 중단, 가로막음[방해함]
* 자산이 손실되거나 사용 불가능해지는 경우
* DoS, DDoS 공격
* 서버를 다운시키거나, 네트워크를 마비시켜 서비스를 제공하지 못하게 하는 공격

## b. Interception

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/bc8adb56-f898-4031-872a-fe033eb7cfc8#center" alt="image" height="25%" width="25%" onclick="showImage(this)">

* 가로채다
* 허가 받지 않은 접근으로 정보를 탈취하는 경우
* 도청, 불법 복제

## c. Modification

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/11c452b5-0db5-43e5-8f89-1cbf20d6c977#center" alt="image" height="25%" width="25%" onclick="showImage(this)">

* 변조
* 데이터베이스나 프로그램 파일을 변경, 대체하여 정보를 손상시키는 경우
* OTA 업데이트 해킹, 앱 리패키징, DB 변조

## d. Fabrication

<img class="lazy invert" data-src="https://github.com/user-attachments/assets/11f2c388-9545-4828-92bd-c0ed606a4f9a#center" alt="image" height="25%" width="25%" onclick="showImage(this)">

* 위조
* 존재하지 않던 정보를 조작하여 삽입
* 위조 여권, 위조된 네트워크 트래픽

## e. 예시

<details>
  <summary>1. 통신 도청, 통신망 도청 등</summary>
  <p style="padding-left: 2rem;"><strong>Interception</strong></p>
</details>

<details>
  <summary>2. 네트워크에서 오가는 데이터를 가로채기 위한 패킷 스니핑</summary>
  <p style="padding-left: 2rem;"><strong>Interception</strong></p>
</details>

<details>
  <summary>3. 컴퓨터 시스템에서 데이터를 가로채기 위한 키로깅</summary>
  <p style="padding-left: 2rem;"><strong>Interception</strong></p>
</details>

<details>
  <summary>4. 파일 또는 프로그램의 불법 복제</summary>
  <p style="padding-left: 2rem;"><strong>Interception</strong></p>
</details>

<details>
  <summary>5. 사용자/자격 증명 위조, 이메일 스푸핑, 가짜 메시지 등</summary>
  <p style="padding-left: 2rem;"><strong>Fabrication</strong></p>
</details>

<details>
  <summary>6. 소프트웨어나 하드웨어 파괴, 통신선 절단</summary>
  <p style="padding-left: 2rem;"><strong>Interruption</strong></p>
</details>

<details>
  <summary>7. 플러딩 공격: TCP 플러딩 (SYN 플러딩), 핑 플러딩 등</summary>
  <p style="padding-left: 2rem;"><strong>Interruption</strong></p>
</details>

<details>
  <summary>8. 대상 서버의 자원을 점유하는 행위: 포크 봄(래빗 바이러스), 반복적인 파일 생성, 교착 상태 등</summary>
  <p style="padding-left: 2rem;"><strong>Interruption</strong></p>
</details>

<details>
  <summary>9. 데이터 파일이나 데이터베이스에 저장된 정보를 변경</summary>
  <p style="padding-left: 2rem;"><strong>Modification</strong></p>
</details>

<details>
  <summary>10. 프로그램을 변경하여 다른 방식으로 동작하게 함</summary>
  <p style="padding-left: 2rem;"><strong>Modification</strong></p>
</details>

<details>
  <summary>11. 시스템 하드웨어나 네트워크 구조를 재구성함</summary>
  <p style="padding-left: 2rem;"><strong>Modification</strong></p>
</details>

<details>
  <summary>12. 웹사이트 변조<p style="padding-left: 2rem;">• 시각적 외형을 바꾸는 공격<br>• 웹사이트의 내용을 바꾸는 공격</p></summary>
  <p style="padding-left: 2rem;"><strong>Modification</strong></p>
</details>

<details>
  <summary>13. 이전에 가로챈 메시지를 재전송하는 행위 (재생 공격)</summary>
  <p style="padding-left: 2rem;"><strong>Fabrication</strong></p>
</details>

<details>
  <summary>14. 웹사이트 또는 네트워크 서비스를 위조하는 행위 (예: DNS 스푸핑, IP 스푸핑)</summary>
  <p style="padding-left: 2rem;"><strong>Fabrication</strong></p>
</details>

# 1.2 STRIDE 모델

* Microsoft에서 제안한 **보안 위협 분류 모델**이다.

## a. Spoofing

* 위장, 속이다 (= **Fabrication**)
* 공격자가 자신을 다른 사람/무언가로 위장/위조하여 접근하는 것
* 예시: 사용자의 계정을 훔치기 위해 피싱 공격으로 가짜 사이트로 유도함
* 대응: 사용자 인증, 기기 인증 (센서 네트워크, 드론)

## b. Tampering

* 변조 (= **Modification**)
* 애플리케이션과 사용자 간 교환되는 데이터를 공격자가 수정하는 것
* 예시: 메시지 무결성을 훼손하여 메시지를 변조함
* 대응: 메시지 무결성 검사, 암호화, 디지털 서명

## c. Repudiation

* 부인
* 공격자가 자신이 한 악의적 행위를 부인하고 책임을 회피하는 것
* 예시: 로그 삭제, 트랜잭션 부인
* 대응: 디지털 서명, 로그 기록, 인증 시스템 등

## d. Information Disclosure

* 정보 노출 (= **Interception**)
* 민감한 데이터가 무단으로 외부에 노출되는 것
* 예시: 암호화되지 않은 메시지가 네트워크에서 가로채짐
* 대응: 암호화, 데이터 마스킹

## e. Denial of Service

* 서비스 거부 (= **Interruption**)
* 정당한 사용자가 서비스를 이용하지 못하도록 하는 것
* 예시: 서버 과부하로 서비스 중단
* 대응: 트래픽 분산, 플러딩 방어

## f. Elevation of Privilege

* 권한 상승
* 공격자가 시스템의 취약점 등을 이용하여 관리자 수준의 권한을 획득하는 것
* 예시: 사용자 권한을 관리자 모드, 커널 모드로 변경하여 시스템 제어 (버퍼 오버플로우는 권한 상승에 자주 쓰이는 취약점)
* 대응: 권한 분리, 권한 검증

# 1.3 용어

## a. Security

* **Security(보안)**란 위험(Threat), 위험 요소(Risk), 취약점(Vulnerability)으로부터 자유로운 상태
* 즉 위험이 없는 상태
* Security의 목적은 공격자가 존재하는 상황에서도 **원하는 속성(Confidentiality, Integrity, Availability)**을 유지하는 것

## b. Computer Security

* 정보를 무단 **접근**, **사용**, **기록**, **방해**, **파괴**, **변경**으로부터 방어하는 것

## c. Asset

* **자산**이란 보호 대상, 보호할 가치가 있는 것
* 하드웨어, 소프트웨어, 데이터, 네트워크, 시스템, 서비스 등이 해당됨
* 조직에게 가치가 있는 모든 것이 해당됨 (사람, 장비, 네트워크, 소프트웨어, 클라우드 자원 등)

## d. Asset Identification

* 자산 식별
* 각 자산을 고유하게 식별하기 위한 속성과 방법을 사용
* OS에서는 프로그램을 추적하기 위해 PID를 사용하고, 네트워크에서는 IP, MAC 주소를 사용

## e. Threat

* **Threat(위협)**란 시스템, 사용자, 운영자에게 피해를 줄 수 있는 모든 위험 요소
* 조직이나 개인의 운영(임무, 기능, 평판 등)에 악영향을 줄 가능성이 있는 모든 상황
* 예시: 무단 접근, 파괴, 정보 유출, 정보 변경, 서비스 거부 등
* 위협의 **가능성**은 위험 소스가 시스템의 취약점을 성공적으로 악용할 수 있는 가능성과 같음

## f. Attack

* **Attack(공격)**이란 위협을 실제로 **실행**하기 위해 **취약점(Vulnerability)**을 악용하는 행위
* 즉 위협이 현실화된 것
* 공격의 실현은 C-I-A 속성에 영향을 미침
* 정보 시스템 자원 또는 그 안의 정보를 **수집**, **방해**, **차단**, **손상**, **파괴**하려는 **모든 악의적인 활동**

## g. Control

* **Control(통제)**이란 취약점을 완화하거나 제거하는 것
* 통제는 공격을 방지하고 위협에 대응하기 위해 취약점을 완화시킴
* 위헙을 관리하는 수단에는 정책, 절차, 지침, 관행 또는 조직 구조 등이 포함되며, 이는 행정적, 기술적, 관리적 또는 법적 특성을 가질 수 있음

## h. Security Control

* **Security Control(보안 통제)**이란 정보 시스템이나 조직의 정보를 보호하기 위해 **confidentiality**, **integrity**, **availability**를 지키고, 정해진 보안 요구 사항을 충족하기 위해 마련된 보호 장치 또는 대응책

## i. Weakness

* **Weakness(약점)**이란 시스템, 소프트웨어, 펌웨어, 하드웨어, 서비스 구성요소 내의 조건이 특정 상황에서 **취약점(Vulnerability)**으로 이어질 수 있는 상태
* 바람직하지 않은 동작을 초해할 수 있는 결함 또는 특성으로 보안 위협 또는 개인정보 위험을 초래할 수 있음

### 가. Actor

* 제품 또는 다른 주체(사용자, 서비스, 모니터 등)와 상호작용하는 개체

### 나. Attack Pattern

* 공격 패턴
* 소프트웨어, 펌웨어, 하드웨어 또는 서비스 구성요소의 약점을 **공격하는 공통 접근 방식 및 특성**

### 다. Authorization

* 인가, 접근 허용
* 어떤 행위자(actor)가 특정 리소스에 접근할 수 있는지 결정하고, 그에 따라 접근을 허용하는 과정

> 인증(Authentication)과는 다름: 실제 정체 확인이 아니라, 접근 권한의 유무에 초점

## j. Vulnerability

* **Vulnerability(취약점)**은 소프트웨어, 펌웨어, 하드웨어, 서비스 구성요소에서 발생한 **약점**으로 인해 악용될 수 있음
* 시스템 내에 있는 **악용될 수 있는 약점**
* **confidentiality**, **integrity**, **availability**를 위협할 수 있음
* 버그, 결함, 약점 또는 노출된 부분
* 설계 결함 또는 코딩 실수가 공격자에게 악용될 수 있음
  * **Poor coding**: 쉽게 추측 가능한 비밀번호 허용, 하드코딩된 비밀번호
  * **Design flaws**: 인증 실패, XSS, 잘못된 암호화 사용


