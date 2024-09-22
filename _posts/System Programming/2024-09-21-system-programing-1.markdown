---
title:  "1. Ubuntu"
excerpt: "&nbsp;&nbsp; 멀티부팅을 이용하여 Ubuntu를 설치해보자."
date:   2024-09-21 17:40:10 +0900
categories: System Programming
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
permalink: posts/1-ubuntu
published: true
---
# 1.1 Ubuntu 설치

&nbsp;&nbsp; 우분투를 사용하기 위한 방법에는 여러 가지가 있다. 예를 들어 가상 머신에 우분투 설치, wsl2를 통한 사용, 그리고 멀티부팅을 활용한 방법 등이 있다. 이 포스트에서는 멀티부팅으로 우분투를 설치하는 과정을 다룬다.

&nbsp;&nbsp; 우분투를 설치할 때 가장 많이 참고한 블로그는 [내 PC에 리눅스 설치하기(멀티OS, Ubuntu, 우분투) 1/2](https://dreamdeveloper403.tistory.com/27)이다.

## a. 복구 파일 생성

<img class="lazy" data-src="https://github.com/user-attachments/assets/8a8b2594-240b-4740-83c0-c31073c02bcb#center" alt="image" height="50%" width="50%">

&nbsp;&nbsp; 우분투를 설치하는 과정에서 잘못되는 경우가 있을 수 있으므로 윈도우 복구를 위해 복구 파일을 생성하였다. 윈도우 복구 드라이브 생성은 간단하므로 과정은 생략하겠다.

## b. USB 설치 디스크

### i. Universal USB Installer

> [Universal USB Installer - Bootable Pendrive Software](https://pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/)

&nbsp;&nbsp; UUI는 Windows 설치 프로그램, Linux 운영 체제, 독립형 안티바이러스 소프트웨어 등 다양한 시스템을 부팅할 수 있게 해주는 프로그램이다. Ubuntu ISO 파일을 USB에 간단하게 설치해주니 다운로드하자.

### ii. Ubuntu ISO

> [Download Ubuntu Desktop](https://ubuntu.com/download/desktop)

&nbsp;&nbsp; 우분투 ISO 파일을 다운로드하자. LTS로 다운 받고 이는 5년동안 무료로 업데이트 및 보안을 지원해준다고 한다.

### iii. USB 설치

<img class="lazy" data-src="https://github.com/user-attachments/assets/e1c4bfad-6325-4e23-a245-caffc6016b93#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; UUI를 실행하고 Ubuntu OS를 선택한 후 Create를 누르면 USB 설치 디스크가 생성된다.

## c. 디스크 파티션 만들기

### i. 축소 공간 쿼리

&nbsp;&nbsp; 윈도우 검색에서 "하드 디스크 파티션 만들기 및 포맷"을 검색한다.

<div class="bg"></div>
<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/311ac72e-2eee-4388-9abd-7876ae3f2815#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; C 드라이브를 우클릭으로 선택하면 **볼륨 축소** 메뉴가 보인다. 볼륨 축소 메뉴를 클릭하면 축소 공간 쿼리를 시작하고 1~2분 정도 시간이 걸린다.

<img class="lazy" data-src="https://github.com/user-attachments/assets/d718a004-c42a-40bd-9e9c-25b05c688993#center" alt="image" height="75%" width="75%">

### ii. 볼륨 축소 문제

<img class="lazy" data-src="https://github.com/user-attachments/assets/f21066d4-de20-495d-a89e-10070b9c953e#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 볼륨 축소 쿼리를 한 모습이다. 그런데 사용할 수 있는 축소 공간 크기가 27.45GB로 계획했던 64GB에 비해 터무니 없이 적다. 이를 해결하기 위해 구글링을 하여 찾은 3가지 방법은 아래와 같다.

* 가상 메모리 제거
* 시스템 보호 해제
* 이벤트 뷰어로 문제 파일 제거

&nbsp;&nbsp; 하지만 가상 메모리 제거, 시스템 보호 해제로는 해결이 되지 않았다. 또한 이벤트 뷰어로 `defrag 259` 이벤트를 검색해도 어떤 파일에서 문제가 발생했는지 알 수가 없었다. 다른 방법으로 디스크 조각을 최적화해주는 프로그램을 설치하여 12시간이 넘도록 최적화를 하여도 문제는 해결되지 않았다.

#### 가. 해결법

```
vssadmin delete shadows /for=C: /all
```

&nbsp;&nbsp; 위 명령어는 모든 볼륨 섀도 복사본을 삭제하는 명령어이다[^1]. 이 명령어는 시스템 복원 지점과 기타 볼륨 섀도 복사본을 모두 제거한다. 섀도 복사본으로 인해 축소 가능한 영역이 터무니 없이 작게 인식된 것이다.

<img class="lazy" data-src="https://github.com/user-attachments/assets/9c05e107-4c47-49b8-bbdd-a0eb68f0f57c#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; CMD를 관리자 권한으로 실행 후 명령어를 입력하니 4개의 섀도 복사본을 삭제하였고 이로 인해 축소 가능 공간이 544GB로 약 516GB가 늘어났다.

<img class="lazy" data-src="https://github.com/user-attachments/assets/a8a1e3d9-b949-423d-98f4-b1f3dfa70eff#center" alt="image" height="75%" width="75%">

### iii. 볼륨 축소

<img class="lazy" data-src="https://github.com/user-attachments/assets/85f99cda-dc47-4b29-bd4f-c86f90cb285f#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 축소 가능한 544Gb 중 64Gb만 축소할 예정이므로 $64 \times 1024 = 65,536$을 입력해준다. 이때 1024를 곱해주는 이유는 윈도우에서 1GB = 1024MB이기 때문이다. 권장 하드 디스크 공간은 25GB이니 참고 바란다.

<img class="lazy" data-src="https://github.com/user-attachments/assets/389c1b06-527c-44da-8907-a1a11a9d0373#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 64GB로 할당 완료하면 이런 식으로 확인 가능하다.

## d. BIOS 진입

&nbsp;&nbsp; 윈도우 다시 시작 후 로고가 보이기 전까지 `f2` 연타로 BIOS 진입을 해준다. 

<img class="lazy" data-src="https://github.com/user-attachments/assets/83149ff3-cdec-4f7c-96a1-5b8c09bad0e8#center" alt="image" height="90%" width="90%">

<img class="lazy" data-src="https://github.com/user-attachments/assets/4317e578-e323-4f94-bc89-16a00f5506ab#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; Boot 메뉴에서 Secure Boot Control을 꺼준다. 보안 부팅을 설정한 상태에서는 Ubuntu를 설치할 수 없었다. 그 후 밑에 있는 Boot Device Priority에서 USB를 1순위로 부팅 순서를 조정해준다.(이미 Ubuntu가 깔려져 있는 상태여서 Boot option이 3개이다.)

<img class="lazy" data-src="https://github.com/user-attachments/assets/e38421a5-2328-4274-bddd-af072d37b0e7#center" alt="image" height="90%" width="90%">

<img class="lazy" data-src="https://github.com/user-attachments/assets/7ef2df87-c223-41bb-96e1-e494e385caf0#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; 여기까지 진행하였으면 Boot Option #1은 USB, #2는 윈도우로 설정되었을 것이다.(마찬가지로 이미 Ubuntu를 설치한 상태이기 때문에 #3에 Ubuntu가 있는 것을 볼 수 있다.) 그리고 Save를 누르고 잠깐의 시간 후에 우분투가 실행 될 것이다.

## e. Ubuntu 설정

&nbsp;&nbsp; Ubuntu가 실행되었다면 언어 설정, 키보드 설정, 인터넷 연결 설정을 해준다.

<img class="lazy" data-src="https://github.com/user-attachments/assets/5f330711-3435-4cc5-809e-61b9c223e31f#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 간단한 설정을 해주면 Install Ubuntu와 Try Ubuntu 선택지가 나온다. 우리는 설치를 해야하므로 Install Ubuntu를 선택한다. 

<img class="lazy" data-src="https://github.com/user-attachments/assets/4224de8b-5594-40f9-9344-8d4d92c36389#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; Interactive installation 선택

<img class="lazy" data-src="https://github.com/user-attachments/assets/b7a8fe70-bd9f-4473-b876-869d5743dedd#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; Default selection 선택

<img class="lazy" data-src="https://github.com/user-attachments/assets/56a2c02d-a58a-4119-b16c-29d500be26c4#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 모두 선택

### i. 디스크 할당

<img class="lazy" data-src="https://github.com/user-attachments/assets/16fbf815-3446-495d-8358-8e2e88516df4#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 우리는 이전에 할당해놓은 디스크 공간에 Ubuntu를 설치해야 하므로 수동 설치를 선택한다.

<img class="lazy" data-src="https://github.com/user-attachments/assets/9fc48da4-94b5-4cb2-b5cb-fff4bed0e08f#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 공간 할당을 완료한 모습이다. 먼저 전에 할당한 공간을 클릭한 후 좌하단의 `+` 버튼을 클릭한다. "파티션 만들기" 창이 뜨고 Ext4 형식으로 `/`, `/boot`, `/tmp`, `/home` 영역을 생성해준다.

* `/boot`
  * 부팅 관련 파일이 저장되는 곳으로 용량이 많이 필요하지 않다.
  * 1GB로 설정함
* `/tmp`
  * 일반 user가 tmp에 들어가서 root 권한을 획득할 수 있다는 보안의 취약점이 발견되었다고 한다. 따라서 파티션 나누는 것을 추천한다.[^2]
  * 임시 파일 저장 용도로 마음대로 할당
  * 2GB로 설정함
* `/home`
  * 개인 파일 저장을 위한 공간이다. 저장할 파일이 코드 외엔 많지 않으므로 12GB로 설정하였다.
  * 12GB로 설정함
* `/`
  * 루트 파티션으로 우분투의 시스템 파일과 프로그램이 설치된다.
  * 마지막으로 남은 공간을 모두 할당해주었다.
  * 51.72GB로 설정함

<div class="bg"></div>

&nbsp;&nbsp; 무조건 이렇게 하지 않아도 된다. 저장할 개인 파일이 많다면 루트 파티션을 줄이고 `/home` 파티션을 늘려도 된다. 파티셔닝은 정답이 없기 때문에 참고만 하자.

<img class="lazy" data-src="https://github.com/user-attachments/assets/cc1e41e6-a862-4ffc-8f6d-82020a89575c#center" alt="image" height="75%" width="75%">

&nbsp;&nbsp; 이제 계정을 생성하고 거주하는 곳을 선택하면 끝이다. 본인이 설정한 파티션에 문제가 없는지 확인하고 install 버튼을 클릭한다. 그럼 Ubuntu 설치가 완료되었다.

## f. 설치 완료

<img class="lazy" data-src="https://github.com/user-attachments/assets/fdebec92-fe44-472a-9a45-ec17cf50ca7b#center" alt="image" height="100%" width="100%">

---

[^1]: [vssadmin delete shadows](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/vssadmin-delete-shadows)
[^2]: [[Linux] 리눅스 설치시 수동 파티션 나누기](https://0561blue.tistory.com/44)