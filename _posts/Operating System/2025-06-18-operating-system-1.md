---
title:  "1. 파일 시스템 개요"
excerpt: "파일 시스템의 기본 개념과 구조를 정리해보자."
date:   2025-06-18 12:42:47 +0900
categories: Operating System
permalink: posts/1-file-system-overview
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 1.1 파일 시스템
## a. 파티션
* 제한된 저장매체 공간(볼륨)을 보다 효과적으로 사용하기 위한 수단
* 연속된 저장 공간을 하나 이상의 연속되고 독립된 영역으로 나누어서 사용할 수 있도록 정의한 규약
* 1TB의 SSD를 500GB씩 2개로 나누어 사용할 때 파티션의 개념이 필요
* 디스크를 하나의 공간으로 사용하는 것을 **단일 파티션**, 2개 이상의 파티션으로 나눈 것은 **다중 파티션**이라고 함

## b. 볼륨
* 운영체제가 사용 가능한 섹터(sector)들의 집합
* 운영체제가 인식하고 사용할 수 있는 저장공간 단위
* 물리적으로 연속된 공간의 사용 여부와 관계 없는 섹터들의 집합
* 하드디스크는 2개 이상이지만 사용자가 인식하는 볼륨은 하나임

## c. MBR (Master Boot Record)
### i. 정의
* 디스크의 첫 번째 섹터에 위치하는 파티션 테이블
* 디스크의 가장 앞쪽 512바이트에 항상 위치함
* 운영체제가 부팅될 때 가장 먼저 읽는 영역
* 파티션 정보와 부트로더가 포함되어 있음

### ii. 구조

#### 가. 부트코드
<img class="lazy" data-src="https://github.com/kisue01/assets/raw/refs/heads/main/hwlx2b1f7dmnnlauzhuw.avif#center" alt="image" height="30%" width="30%" onclick="showImage(this)">

* 446 Bytes 크기의 프로그램 영역
* 에러 메시지와 같은 상수 값들이 기록되어 있어 디지털 포렌식에서는 분석할 필요 없음
* MBR에 저장된 파티션 테이블에서 부팅 가능한 파티션을 검색하여 부팅 가능한 파티션이 존재할 경우 해당 파티션의 VBR로 점프시킴
* 부팅 가능한 파티션이 없을 경우 Invalid Partition Table Error, Error loading operating system, Missing operating system 등의 에러 메시지를 출력함

#### 나. 파티션 테이블
<img class="lazy" data-src="https://github.com/kisue01/assets/raw/refs/heads/main/eitkdpvnttfrrzcdva3c.avif#center" alt="image" height="30%" width="30%" onclick="showImage(this)">

* 64 Bytes 크기의 파티션 정보 영역
* 16 Bytes씩 총 4개의 파티션 정보를 저장할 수 있음
* 시스템이 2개의 파티션을 사용하고 있다면, 파티션 엔트리 1과 2에 각각 파티션 정보가 저장되고 나머지 엔트리는 0으로 채워짐
* 단일 파티션으로 구성되었지만 MBR이 있는 경우에는 파티션 엔트리 1에 파티션 정보가 저장되고 나머지 엔트리는 0으로 채워짐

<br>

<img class="lazy invert" data-src="https://github.com/kisue01/assets/raw/refs/heads/main/ncfgqi19risbqsk8p3cn.avif#center" alt="image" height="70%" width="70%" onclick="showImage(this)">

* **Boot Flag**
  * 부팅이 가능한 파티션인지를 나타냄 (부팅 가능하면 0x80, 불가능하면 0x00)
* **Starting CHS Address**
  * CHS(Cylinder, Head, Sector) 모드로 표현하는 파티션의 시작 주소
  * 현대 시스템에서는 LBA를 사용하므로 이 값은 무시됨
* **Partition Type**
  * 파티션의 파일 시스템 유형을 나타냄 (예: 0x07은 NTFS, 0x83은 Linux, 0x0C는 FAT32)
* **Starting LBA Address**
  * LBA(Logical Block Addressing) 모드로 표현하는 파티션의 시작 주소
  * LBA 방식은 하드디스크 한 섹터를 블록 단위로 하여 첫 번째 섹터를 0번으로 순서대로 번호를 매김
* **Size in Sector**
  * 파티션에서 사용하는 LBA의 총 개수, 해당 파티션의 총 섹터 개수를 나타냄
  * LBA 블록 하나는 512 Bytes이므로 이 값을 512로 곱하면 파티션의 크기를 바이트 단위로 알 수 있음

#### 다. 부트 시그니처
<img class="lazy" data-src="https://github.com/kisue01/assets/raw/refs/heads/main/iunpreinl97oytmy9tsb.avif#center" alt="image" height="30%" width="30%" onclick="showImage(this)">

* MBR의 마지막 2바이트에 위치하며, 반드시 0x55와 0xAA 바이트 시퀀스를 포함해야 함
* 이 값이 없으면 MBR이 손상되었거나 올바르지 않은 MBR임을 나타냄

## d. VBR (Volume Boot Record)
* 각 파티션의 첫 번째 섹터에 위치하는 부트로더
* 파티션이 활성화되면 해당 파티션의 VBR이 실행됨
* 파티션의 파일 시스템에 대한 정보와 부트로더가 포함되어 있음