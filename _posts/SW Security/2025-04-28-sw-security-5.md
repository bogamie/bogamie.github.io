---
title:  "5. CVE, NVD, CWE"
excerpt: "&nbsp;&nbsp; "
date:   2025-04-28 16:10:30 +0900
categories: SW Security
permalink: posts/5-cve-nvd-cwe
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 5.1 CVE

* CVE (Common Vulerabilities and Exposures)
  * = Common Vulnerability Enumeration
  * = 공통 취약점 및 노출 목록
* **목적**
  * 공개된 정보 시스템 취약점들에 대해 공통된, 통일된 이름을 부여하는 사전
  * 다양한 취약점을 통일된 방식으로 나열(enumerate)하는 수단을 제공
* CVE는 **이미 공개된**, **패치된** 취약점만 등록 → 비공개 취약점은 CVE에 등록되지 않음

## a. CVE 프로그램

* CVE 프로그램의 임무는 **공개적으로 알려진 사이버 보안 취약점**을 **식별(Identify)**, **정의(Define)**, **분류(Catalog)**하는 것
  
> **취약점(Vulnerability)**
>
> 제품에 존재하는 하나 이상의 약점을 통해 
> * 기밀성(Confidentiality)
> * 무결성(Integrity)
> * 가용성(Availability)
> 
> 등에 부정적인 dud향을 미치게 하는 조건이나 행동의 집합
>
> → 약점(Weakness)이 해커에 의해 악용되어 CIA를 깨트리게 될 때 <br>
> → **취약점**이 됨
> 
> ※ 약점 자체는 아직 문제가 안 될 수 있지만, 악용되면 큰 피해를 초래할 수 있음

## b. CNA

* CVE Numbering Authority
* **CNA**란,
  * 벤더(제품 공급사)
  * 연구자
  * CERT(컴퓨터 보안 사고 대응팀)
  * 호스팅 서비스 제공자
  * 버그 바운티 제공자
  * 컨소시엄 형태의 기관
* 등에서 CVE 프로그램의 승인을 받아
  * 특정 범위 내에서 취약점에 대해 CVE ID를 부여하고
  * CVE 레코드를 작성하여 공개할 수 있음

## c. CVE ID

* CVE 식별자, CVE Identifier, CVE ID
* CVE 레코드의 번호 부분
* 공개된 취약점을 식별하기 위해 CVE 프로그램에서 부여하는 고유한 **영문자+숫자 조합의 문자열**
* 각 CVE ID는 하나의 특정 취약점을 나타냄
* CVE ID의 포맷은 **CVE 레코드 포맷**에서 정의함
* 예시:
  * CVE-2014-0160 (Heartbleed)
    * 2014년에 160번째로 등록된 취약점
    * OpenSSL의 Heartbeat 기능 구현 오류
    * 메모리 일부가 유출되어 비밀 키, 로그인 정보 등이 유출
  * CVE-2021-44228 (Log4Shell, Apache Log4j)
    * Apache Log4j의 로그 메시지 처리 과정에서 발생하는 원격 코드 실행 취약점
    * 공격자가 악성 코드를 삽입하여 원격에서 시스템을 제어할 수 있음
  * CVE-2023-23836 (SolarWinds Platform)
    * SolarWinds 소프트웨어의 인증서 검증 취약점
    * SolarWinds Platform의 취약점으로, 공격자가 원격에서 시스템을 제어할 수 있음
    * 중간자 공격(Man-in-the-Middle)으로 위조된 서버에 연결 유도 가능
  * CVE-2024-36401 (Remote Code Execution)
    * 취약한 시스템에 원격으로 악성 코드를 실행할 수 있는 취약점

<div class="bg"></div>

| | 기존 문법 (Old Syntax) | 새로운 문법 (New Syntax)|
|:-|:-|:-|
|포맷 | CVE-YYYY-NNNN (4자리 고정) | CVE-YYYY-NNNN...N (4자리 이상, 길이 제한 없음)|
|특징 | 매년 최대 9,999개 발급 가능 | 필요 시 추가 발급 가능|
|예시 | CVE-1999-0067CVE-2005-4873CVE-2012-0158 | CVE-2014-0001CVE-2014-12345CVE-2014-7654321|

## d. CVE Record

* CVE 레코드
* 취약점을 관리하기 위한 구조화된 데이터
* CNA(CVE Numbering Authority)에서 CVE 레코드를 작성하고 관리
* 데이터는 **CVE JSON 포맷**으로 제공
* CVE ID, 설명, 영향받는 제품, 취약점의 심각도 등 포함
* CVE 레코드 포맷은 CVE 레코드를 작성할 때 CVSS 점수나 기타 **심각도(security rating scores)**를 포함할 수 있도록 해주는 형식
* CVE 레코드는 세 상태 중 하나에 해당함
  * **Reserved**: CNA가 CVE ID를 예약한 상태. CVE ID의 초기 상태
  * **Published**: CNA가 CVE ID와 연관된 데이터를 작성하고, 해당 CVE 레코드를 공개한 상태
  * **Rejected**: CVE ID와 관련된 CVE 레코드가 더 이상 사용되지 않아 폐기된 상태

### i. 공개된 CVE 레코드

<img class="lazy invert" data-src="https://raw.githubusercontent.com/kisue01/assets/refs/heads/main/Published%20CVE%20Records.avif#center" alt="image" height="50%" width="50%" onclick="showImage(this)">

* 취약점 발견 빈도가 최근에 더 높아지고 있음
* 이는 자동차 산업의 디지털화(Software-Defined Vehicle, SDV), AI, 클라우드 도입 증가 등의 영향

## e. CVSS
* CVSS (Common Vulnerability Scoring System)
* 취약점의 심각도(severity)를 정량적으로 평가하기 위한 방법
* **CVSS는 위험도(risk)를 측정하는 지표가 아님**
* 점수는 0~10의 실수로 표현
* 결과는 숫자 점수 외에도, 벡터 문자열(압축된 설명형 문자열)로도 표현됨
* 이를 통해 산업, 조직, 정부기관 등이 일관성 있게 취약점 심각도를 관리할 수 있도록 지원

### i. CVSS v2.0, v3.x
<img class="lazy invert" data-src="https://raw.githubusercontent.com/kisue01/assets/refs/heads/main/Common-Vulnerability-Scoring-System-v3.1-6.avif#center" alt="image" height="75%" width="75%" onclick="showImage(this)"/>

#### 가. Base Metric Group (기본 메트릭 그룹)
* **Exploitability Metrics (공격 가능성 메트릭)**
  * Attack Vector (공격 경로)
  * Attack Complexity (공격 복잡도)
  * Privileges Required (필요한 권한)
  * User Interaction (사용자 상호작용 필요 여부)
* **Impact Metrics (영향 메트릭)**
  * Confidentiality Impact (기밀성 영향)
  * Integrity Impact (무결성 영향)
  * Availability Impact (가용성 영향)
* Scope (범위)

#### 나. Temporal Metric Group (시간 기반 메트릭 그룹)
* Exploit Code Maturity (공격 코드 성숙도)
  * 취약점을 악용할 수 있는 공격 코드가 존재하고 널리 퍼져 있는 정도
* Remediation Level (대응 수준)
* Report Confidence (보고 신뢰도)

#### 다. Environmental Metric Group (환경 기반 메트릭 그룹)
* Modified Base Metrics (수정된 기본 메트릭)
* Confidentiality Requirement (기밀성 요구사항)
* Integrity Requirement (무결성 요구사항)
* Availability Requirement (가용성 요구사항)

### ii. CVSS v4.0
<img class="lazy invert" data-src="https://raw.githubusercontent.com/kisue01/assets/refs/heads/main/Common-Vulnerability-Scoring-System-v3.1-6-1.avif#center" alt="image" height="75%" width="75%" onclick="showImage(this)"/>

* 위협 인텔리전스(Threat Intelligence)와 환경 메트릭을 추가하여 위헙 이해를 높임
* OT(Operational Technology)와 Safety(안전성) 관련 지표를 포함
* 사용자 상호작용을 **능동적(Active)**, **수동적(Passive)**로 구분하여 평가
* Supplelemental Metric Group (보조 메트릭 그룹) 추가

> OT: 산업설비/운영기술, IT: 정보기술 — CVSS v4는 OT 안전성 중요성까지 고려함

#### 가. Base Metric Group (기본 메트릭 그룹)
* Exploitability Metrics (공격 가능성 메트릭):
  * Attack Vector (공격 경로)
  * Attack Complexity (공격 복잡도)
  * Attack Requirements (공격 요구사항)
  * Privileges Required (필요한 권한)
  * User Interaction (사용자 상호작용 필요 여부)
* Impact Metrics (영향 메트릭):
  * Vulnerable System Confidentiality (취약 시스템 기밀성)
  * Vulnerable System Integrity (취약 시스템 무결성)
  * Vulnerable System Availability (취약 시스템 가용성)
  * Subsequent System Confidentiality (후속 시스템 기밀성)
  * Subsequent System Integrity (후속 시스템 무결성)
  * Subsequent System Availability (후속 시스템 가용성)

#### 나. Threat Metric Group (위협 메트릭 그룹) (v4.0 신설)
* Exploit Maturity (공격 도구 성숙도)

#### 다. Environmental Metric Group (환경 기반 메트릭 그룹)
* Attack Vector
* Attack Complexity
* Privileges Required
* User Interaction
* Vulnerable System Confidentiality/Integrity/Availability
* Subsequent System Confidentiality/Integrity/Availability
* Confidentiality Requirement (기밀성 요구사항)
* Integrity Requirement (무결성 요구사항)
* Availability Requirement (가용성 요구사항)

#### 라. Supplemental Metric Group (보조 메트릭 그룹) (v4.0 신설)
* Automatable (자동화 가능성)
* Recovery (복구 가능성)
* Safety (안전성)
* Value Density (가치 밀도)
* Vulnerability Response Effort (대응 노력)
* Provider Urgency (공급자 긴급성)

# 5.2 NVD
* NVD (National Vulnerability Database)
* 미국 정부가 운영하는 **표준 기반 취약점 관리 데이터베이스**
* 2005년 미국 NIST(National Institute of Standards and Technology)에서 시작
* SCAP(Security Content Automation Protocol)을 사용해 데이터를 표현
* **기능**
  * 취약점 관리
  * 보안 수준 측정
  * 컴플라이언스 준수 지원(예: FISMA 등 규제 대응)
* **특징**
  * 취약점 관리 **자동화** 지원
  * 취약점 관리 데이터를 **체계적**으로 저장
* **NVD에 포함된 데이터베이스**
  * 보안 점검 체크리스트 참조
  * 보안 관련 소프트웨어 결함 목록
  * 제품 이름
  * 영향 메트릭 정보

> 컴플라이언스(Compliance): 법률, 규정, 정책, 기준 등을 준수하는 것

## a. CVE와 NVD의 관계
* **CVE**와 **NVD**는 별개의 프로그램
* **CVE 프로그램**
  * 1999년 MITRE Corporation에 의해 커뮤니티 프로젝트로 시작
* **CVE 리스트**
  * 공개된 사이버 보안 취약점과 노출 목록
  * 검색, 사용, 제품 및 서비스 통합이 무료로 가능
* **NVD**
  * 2005년 미국 NIST에서 시작
  * CVE 리스트를 기반으로 추가 정보 보완
  * SCAP 데이터 타입으로 변환하여 보다 세밀한 검색 기능과 API 제공
  * CVE에 비해 정밀 분석 데이터를 추가로 제공
* **관계**
  * CVE 리스트가 NVD에 데이터를 제공
  * NVD는 CVE 레코드 정보를 기반으로 **추가적인 데이터**(보완 정보)를 구축
  * 둘은 별도 시스템이지만, 모두 공개되고 무료로 사용 가능
  * CVE 기반으로 NVD가 더 많은 정보 추가 제공
  * NVD는 CVE와 동기화되어 있음(CVE 리스트에 수정이 발생하면 NVD에도 반영됨)


## b. NVD의 동작

* NVD는 매시간 CVE 리스트를 처리하여
  * 새로운 CVE 게시
  * 거절된 항목
  * 수정된 항목 등을 반영
* **조건**
  * **공식 CVE 리스트**에 게시된 CVE만 NVD에 반영됨
  * 아직 **RESERVED** 상태(CVE ID만 부여되고 세부정보 미공개)인 경우, NVD에는 포함되지 않음