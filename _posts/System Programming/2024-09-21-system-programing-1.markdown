---
title:  "1. Ubuntu 설치"
excerpt: ""
date:   2024-09-21 17:40:10 +0900
categories: System Programming
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
permalink: posts/1-ubuntu-설치
published: false
---
# 1. Ubuntu 설치

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

---

[^1]: [vssadmin delete shadows](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/vssadmin-delete-shadows)