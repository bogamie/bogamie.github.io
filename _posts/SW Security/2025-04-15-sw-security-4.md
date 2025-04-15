---
title:  "4. 소프트웨어 보안 위협과 보안 속성"
excerpt: "&nbsp;&nbsp; 소프트웨어 보안 위협 유형, STRIDE & AINCAA 모델 비교, 보안의 핵심 속성(CIA, AANA)과 대응 기술까지—보안 구조 전반에 대한 이론과 실제를 정리한다."
date:   2025-04-15 22:49:05 +0900
categories: SW Security
permalink: posts/4-software-security-threats-and-security-properties
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 4.1 소프트웨어 보안 위협

## a. 소프트웨어 보안 위협 유형

### i. 역공학 (Reverse Engineering)

* 앱 또는 바이너리 분석을 통해 소스코드 및 알고리즘을 분석하는 것
* 소스코드 분석을 통해 보안 취약점을 찾는 것

### ii. 코드 변조 (Code Tampering)

* Android 앱 리패키징 공격
  * 악성코드를 삽입해 변조된 앱 유포

### iii. 펌웨어 변조 (Firmware Modification)

* 펌웨어를 변조하여 악성코드를 삽입하는 것
* 시스템 제어 계층까지 침투하여 시스템을 제어하는 것

### iv. 데이터 삭제 (Deletion)

* 공격자가 중요한 파일이나 로그를 삭제

### v. Fork Bomb

* 자식 프로세스를 무한 생성해 시스템 자원을 고갈시키는 것

### vi. 불법 복제 (Piracy)

* 정식 앱을 불법으로 복제하여 유포하는 것


## b. 소프트웨어 취약점 악용 공격

### i. 주요 공격 기법

* **포맷 스트링(Format string)** 취약점을 이용한 민감 정보 유출
* **Set-UID root 프로그램**의 취약점을 이용한 권한 상승
* **버퍼 오버플로우 (Buffer Overflow)**
* **루팅 (Rooting)**

### ii. 방어 관점

* 취약점 사전 차단
* 최소 권한 원칙 적용
* 보안 코딩, 런타임 보호 기술

# 4.2 STRIDE vs AINCAA

| 요소                         | 설명                         | 보안 성질                          |
|----------------------------|----------------------------|-----------------------------------|
| S – Spoofing               | 신원 위조, 인증 우회          | A – Authentication 인증            |
| T – Tampering              | 데이터 변조                   | I – Integrity 무결성       |
| R – Repudiation            | 행위 부인                     | N – Non-repudiation 부인방지       |
| I – Information Disclosure | 민감 정보 노출                | C – Confidentiality 기밀성         |
| D – Denial of Service      | 서비스 방해                   | A – Availability 가용성            |
| E – Elevation of Privilege | 권한 상승                     | A – Authorization 인가             |

* AINCAA는 보안 속성 중심의 구조, STRIDE는 공격자 관점의 위협 분류

# 4.3 C.I.A

## a. Confidentiality (기밀성)

### i. 정의

* 인가되지 않은 사용자가 정보에 접근하거나 유출하는 것을 방지하는 속성
* 기밀성은 법적 규제와도 연결됨

### ii. 예시

* 암호화되지 않은 데이터 전송
* 중요 정보가 공개 디렉토리에 저장
* 브라우저 캐시를 통한 정보 노출

### iii. 관련 기술

* 암호화 (Cryptography)
  * 대칭키: DES, AES, SEED
  * 공개키: RSA, ECC
* 접근 제어 (Access Control)
* 익명화 (Anonymization)
* TLS (Transport Layer Security)
* SSL (Secure Socket Layer)
* VPN (Virtual Private Network)

## b. Integrity (무결성)

### i. 정의

* 정보가 인가되지 않은 방식으로 변경, 삭제되지 않도록 보장
* 무결성은 감사 추적, 인증서 관리, 메시지 변조 방지와 관련됨

### ii. 예시

* 은행 계좌의 잔액이 해킹으로 임의 변경됨
* 로그 파일이 조작됨
* 전자 투표 결과가 변경됨

### iii. 관련 기술

* 해시 함수 (Hash Function)
  * MD5, SHA-256, SHA-512
  * MAC (Message Authentication Code)
* 디지털 서명 (Digital Signature)
* 체크섬 (Checksum)
* 버전 관리 및 롤백 기능

## c. Availability (가용성)

### i. 정의

* 합법적 사용자가 필요할 때 정보나 서비스를 사용할 수 있도록 보장
* 가용성은 가장 기술적이며 운영적인 성격이 강함

### ii. 예시

* DDoS 공격으로 인해 서비스 불능
* 네트워크 장애로 인한 데이터 접근 실패
* 디스크 고장으로 시스템 다운

### iii. 관련 기술

* 백업 및 복구 시스템
* 부하 분산 (Load Balancing)
* 장애 조치(Failover), 이중화(Redundancy)
* Anti-DoS/DDoS 시스템
  * CDN (Content Delivery Network)
    * 전 세계에 콘탠츠를 분산 저장하여 DDoS 공격을 방어
* Scrubbing Center
  * DDoS 공격 트래픽을 식별/제거하는 데이터 클렌징 서버
  * DNS 또는 BGP 기반 트래픽 우회 후 필터링
* 백업 및 중복 인프라
  * 서버 다중화, UPS(무정전 전원 장치)

## d. 보안 3요소의 관계

* 암호화로 기밀성을 높이면 가용성/성능은 저하됨
* 강력한 무결성 정책은 사용성 저하
* 가용성 확보를 위해 오픈된 서비스는 기밀성/무결성 저하

# 4.4 AANA

## a. Authentication (인증)

### i. 정의

* 시스템에 접근하려는 주체가 주장한 신원을 확인하는 절차

### ii. 구성 요소

* **Claimant**: 인증을 요청하는 주체 (사용자)
* **Replying Party**: 인증 정보를 바탕으로 접근 허용 여부를 판단하는 시스템 (서버)

### iii. 예시

* 사용자 로그인
* TLS 인증서 기반 서버 인증

### iv. 관련 기술

* 비밀번호, 생체 인증, OTP (One-Time Password)
* 공개키 기반구조(PKI), 인증서
* SSO (Single Sign-On)

## b. Authorization (인가)

### i. 정의

* 인증된 주체가 어떤 자원에 어떤 행위를 할 수 있는지 결정하는 절차

### ii. Authentication(인증)과의 차이

| 항목             | Authentication                      | Authorization                                 |
|------------------|--------------------------------------|-----------------------------------------------|
| 순서             | 먼저 수행                            | 그 다음 수행                                  |
| 기능             | **사용자 정체 확인**                 | **권한 부여/제한**                            |
| 방식             | 비밀번호, 인증서, 생체정보 등       | 역할기반(RBAC), 속성기반(ABAC) 접근제어 등    |
| 제어 주체        | 사용자                                | 시스템 또는 관리자                            |
| 사용자 변경 가능 | 사용자가 스스로 변경 가능 (비밀번호 등) | 사용자가 직접 변경 불가능                     |

- 인증 방법:
  - Login Form, HTTP 인증, X.509 인증서 등  
- 인가 방법:
  - URL 접근 제어, 객체 보호, ACL, RBAC 등

## c. Non-repudiation (부인 방지)

### i. 정의

* 행위를 수행한 주체가 그 사실을 나중에 부인하지 못하게 하는 속성

### ii. 목적

* 전자거래, 금융 등에서 법적 책임 근거 확보
* 신뢰 기반 시스템의 핵심 요소

### iii. 관련 기술

* 디지털 서명 (Digital Signature)
  * 특정 사용자의 개인키로 서명한 기록은 위조·부인 불가
* 타임스탬프, 로그 보존, 블록체인

## d. Accountability (책임 추적성)

### i. 정의

* 시스템 내에서 수행된 행위의 주체를 감사(Audit) 로그로 추적 가능하게 하는 것

### ii. 조건

* 누가 무엇을 언제 했는지를 명확히 기록
* 로그 변조 방지 및 보관 정책 필수

### iii. 관련 기술

* 보안 로그 및 감사 시스템
* 접근 제어 
* SIEM (Security Information & Event Management)

# 4.5 Beyond C.I.A

## a. Bob이 컴퓨터에 로그인할 때

### i. 문제

- Bob의 컴퓨터는 “Bob이 진짜 Bob인지” 어떻게 알까?
- Bob의 **비밀번호가 검증**되어야 함 → **인증(Authentication)** 필요

### ii. 인증(Authentication)

- **“Who are you?” (너 누구야?)**
- 인증을 통해 **스푸핑(Spoofing) 공격**, **가짜 사용자 공격(Fabrication)**을 방지할 수 있음

### iii. 인증의 하위 개념

- **Entity Authentication**  
  : 사용자 또는 장치의 **정체(identity)** 확인 (예: 드론, 차량, 인증서 등)
- **Message Authentication**  
  : 메시지가 **해당 사용자/장치/출처로부터 실제로 왔는지** 확인

### iv. 비밀번호 외의 인증 수단

- **공동인증서** (Accredited Certificate)
- **생체인증** (Biometrics – 지문, 홍채 등)
- 기타 **다중 인증(MFA)** 기술

## b. Bob이 네트워크를 통해 AOB에 로그인할 때

### i. 문제

- Bob이 AOB에 로그인 → AOB는 “Bob이 진짜 Bob인지” 어떻게 판단?
- → 역시 **Authentication 필요**

### ii. 추가 고려 사항: 네트워크 보안

- **독립형 컴퓨터**와는 달리, 네트워크 환경에서는 보안 이슈 발생
  - `Wiretapping` (도청)
  - `Packet sniffing` (패킷 가로채기)

### iii. 해결 방법

- **프로토콜 설계**가 매우 중요
- **암호(Crypto)**는 프로토콜 내에서 기밀성/무결성을 유지하는 핵심 수단

### iv. 인증 이후의 제약
- Bob이 **인증**되었다 해도 모든 행위를 해서는 안 됨
  - 예: 다른 사람의 계좌 조회, 소프트웨어 설치 제한

### v. 인가(Authorization)
- “**What permissions do you have?**”
- 사용자가 인증 후 수행 가능한 **행위의 범위 결정**

# 4.6 용어

## a. Actor (행위자)

### i. 정의

- 보안 위협 모델에서 사용하는 개념으로, 시스템 또는 자원과 상호작용하는 주체.
- 예: 사용자(User), 서비스(Service), IDS(침입 탐지 시스템), Intermediary 등.

## b. Authentication (인증)

### i. 정의
- 주체(Actor)가 주장하는 **실제 신원(identity)**이 맞는지 검증하는 과정.
- 시스템이 그 주체만이 생성할 수 있는 정보를 통해 확인.

### ii. 특징
- “**Who are you?**” — 너 누구야?
- 인증은 **신원 확인**에만 초점.
- 인증 없이 권한 부여는 무의미함.

### iii. 예시
- 로그인 시 ID/PW 입력
- 생체 인증 (지문, 홍채)
- 공동 인증서(PKI)
- OTP, 스마트카드

### iv. 리눅스

- `/etc/passwd` → 사용자 계정 정보 저장 위치

```bash
$ more /etc/passwd
sw10:x:1001:1001::/home/sw10:/bin/sh
```

## c. Authorization (권한 부여 / 인가)

### i. 정의

* 인증된 사용자가 어떤 자원에 어떤 행위를 할 수 있는지 결정하는 과정.

### ii. 특징

* “What permissions do you have?”
* 접근 제어 정책에 따라 허용/거부 판단
* 인증(Authentication) 후 수행됨

### iii. 예시

* 특정 사용자가 파일을 **읽기(Read)**만 가능하고, **쓰기(Write)**는 불가능하게 제한

### iv. 리눅스

* 파일 권한 확인

```bash
$ ls -l
-rw-rw-r-- 1 swsec swsec count
```

* `user group others` 순서로 읽기, 쓰기, 실행 권한 표시
* SUID가 설정된 실행 파일:

```bash
$ ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root ...
```

## d. Multi-user 시스템에서의 Authorization 필요성

### i. 사용자 유형  
- Admin (root), Normal User, Guest 등  
- Owner vs. Guest 구분

### ii. 권한(permissions) 종류  
- Create, Read/View, Write, Delete, Execute 등

### iii. 서비스 예시  
- Naver 카페, Band, Kakao (일반/비밀/오픈채팅), Gmail 등  
→ 여러 사용자가 사용하는 시스템에서는 **인가**가 필수

## e. STRIDE 위협 대응 정리

| 위협 (Threat)            | 대응 보안 목표 (Mitigation) | 대응 기술 (Approach)                                      |
|--------------------------|------------------------------|-------------------------------------------------------------|
| Spoofing (사칭)          | Authentication               | 쿠키 인증, Kerberos, PKI, TLS, 디지털 서명 등              |
| Tampering (변조)         | Integrity                    | SHA-256, ACL, 디지털 서명 등                               |
| Repudiation (부인)       | Non-Repudiation              | 보안 로그, 감사 기록, 디지털 서명 등                       |
| Information Disclosure   | Confidentiality              | 암호화, 접근 제어(ACL)                                      |
| Denial of Service (DoS)  | Availability                 | 필터링, ACL, 자원 제한(Quota) 등                           |
| Elevation of Privilege   | Authorization                | 역할 기반 제어, 그룹 제어, 입력 검증 등                    |
