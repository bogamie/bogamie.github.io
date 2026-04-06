+++
date = '2024-09-21T17:40:10+09:00'
draft = false
title = '멀티부팅으로 Ubuntu 설치하기'
categories = ['기타']
+++

멀티부팅을 이용하여 Ubuntu를 설치해보자.

# Ubuntu 설치

우분투를 사용하기 위한 방법에는 여러 가지가 있다. 예를 들어 가상 머신에 우분투 설치, wsl2를 통한 사용, 그리고 멀티부팅을 활용한 방법 등이 있다. 이 포스트에서는 멀티부팅으로 우분투를 설치하는 과정을 다룬다.

우분투를 설치할 때 가장 많이 참고한 블로그는 [내 PC에 리눅스 설치하기(멀티OS, Ubuntu, 우분투) 1/2](https://dreamdeveloper403.tistory.com/27)이다.

## 복구 파일 생성

![복구 드라이브 생성](img/recovery-drive.png)

우분투를 설치하는 과정에서 잘못되는 경우가 있을 수 있으므로 윈도우 복구를 위해 복구 파일을 생성하였다. 윈도우 복구 드라이브 생성은 간단하므로 과정은 생략하겠다.

## USB 설치 디스크

### Universal USB Installer

> [Universal USB Installer - Bootable Pendrive Software](https://pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/)

UUI는 Windows 설치 프로그램, Linux 운영 체제, 독립형 안티바이러스 소프트웨어 등 다양한 시스템을 부팅할 수 있게 해주는 프로그램이다. Ubuntu ISO 파일을 USB에 간단하게 설치해주니 다운로드하자.

### Ubuntu ISO

> [Download Ubuntu Desktop](https://ubuntu.com/download/desktop)

우분투 ISO 파일을 다운로드하자. LTS로 다운 받고 이는 5년동안 무료로 업데이트 및 보안을 지원해준다고 한다.

### USB 설치

![UUI 설정 화면](img/uui-setup.png)

UUI를 실행하고 Ubuntu OS를 선택한 후 Create를 누르면 USB 설치 디스크가 생성된다.

## 디스크 파티션 만들기

### 축소 공간 쿼리

윈도우 검색에서 "하드 디스크 파티션 만들기 및 포맷"을 검색한다.

![디스크 관리](img/disk-management.png)

C 드라이브를 우클릭으로 선택하면 **볼륨 축소** 메뉴가 보인다. 볼륨 축소 메뉴를 클릭하면 축소 공간 쿼리를 시작하고 1~2분 정도 시간이 걸린다.

![축소 공간 쿼리 결과](img/shrink-query.png)

### 볼륨 축소 문제

![볼륨 축소 문제](img/shrink-problem.png)

볼륨 축소 쿼리를 한 모습이다. 그런데 사용할 수 있는 축소 공간 크기가 27.45GB로 계획했던 64GB에 비해 터무니없이 적다. 이를 해결하기 위해 구글링을 하여 찾은 3가지 방법은 아래와 같다.

* 가상 메모리 제거
* 시스템 보호 해제
* 이벤트 뷰어로 문제 파일 제거

하지만 가상 메모리 제거, 시스템 보호 해제로는 해결이 되지 않았다. 또한 이벤트 뷰어로 `defrag 259` 이벤트를 검색해도 어떤 파일에서 문제가 발생했는지 알 수가 없었다. 다른 방법으로 디스크 조각을 최적화해주는 프로그램을 설치하여 12시간이 넘도록 최적화를 하여도 문제는 해결되지 않았다.

#### 해결법

```
vssadmin delete shadows /for=C: /all
```

위 명령어는 모든 볼륨 섀도 복사본을 삭제하는 명령어이다[^1]. 이 명령어는 시스템 복원 지점과 기타 볼륨 섀도 복사본을 모두 제거한다. 섀도 복사본으로 인해 축소 가능한 영역이 터무니없이 작게 인식된 것이다.

![섀도 복사본 삭제](img/shadow-delete.png)

CMD를 관리자 권한으로 실행 후 명령어를 입력하니 4개의 섀도 복사본을 삭제하였고 이로 인해 축소 가능 공간이 544GB로 약 516GB가 늘어났다.

![섀도 삭제 후 축소 가능 공간](img/after-shadow-delete.png)

### 볼륨 축소

축소 가능한 544GB 중 64GB만 축소할 예정이므로 64 × 1024 = 65,536을 입력해준다. 이때 1024를 곱해주는 이유는 윈도우에서 1GB = 1024MB이기 때문이다. 권장 하드 디스크 공간은 25GB이니 참고 바란다.

![64GB 파티션 할당 완료](img/partition-complete.png)

64GB로 할당 완료하면 이런 식으로 확인 가능하다.

## BIOS 진입

윈도우 다시 시작 후 로고가 보이기 전까지 `f2` 연타로 BIOS 진입해준다.

![BIOS 메인 화면](img/bios-1.png)

![Secure Boot Control 비활성화](img/bios-2.png)

Boot 메뉴에서 Secure Boot Control을 꺼준다. 보안 부팅을 설정한 상태에서는 Ubuntu를 설치할 수 없었다. 그 후 밑에 있는 Boot Device Priority에서 USB를 1순위로 부팅 순서를 조정해준다.(이미 Ubuntu가 깔려 있는 상태여서 Boot option이 3개이다.)

![Boot Device Priority 설정](img/bios-3.png)

![Boot Option 순서 설정](img/bios-4.png)

여기까지 진행하였으면 Boot Option #1은 USB, #2는 윈도우로 설정되었을 것이다.(마찬가지로 이미 Ubuntu를 설치한 상태이기 때문에 #3에 Ubuntu가 있는 것을 볼 수 있다.) 그리고 Save를 누르고 잠깐의 시간 후에 우분투가 실행될 것이다.

## Ubuntu 설정

Ubuntu가 실행되었다면 언어 설정, 키보드 설정, 인터넷 연결 설정을 해준다.

![Install Ubuntu 선택](img/ubuntu-install.png)

간단한 설정을 해주면 Install Ubuntu와 Try Ubuntu 선택지가 나온다. 우리는 설치를 해야 하므로 Install Ubuntu를 선택한다.

![Interactive installation 선택](img/interactive-install.png)

Interactive installation 선택

![Default selection 선택](img/default-selection.png)

Default selection 선택

![추가 옵션 모두 선택](img/select-all.png)

모두 선택

### 디스크 할당

![수동 설치 선택](img/manual-install.png)

우리는 이전에 할당해놓은 디스크 공간에 Ubuntu를 설치해야 하므로 수동 설치를 선택한다.

![파티션 설정 완료](img/partition-setup.png)

공간 할당을 완료한 모습이다. 먼저 전에 할당한 공간을 클릭한 후 좌하단의 `+` 버튼을 클릭한다. "파티션 만들기" 창이 뜨고 Ext4 형식으로 `/`, `/boot`, `/tmp`, `/home` 영역을, linux-swap 형식으로 `/swap` 영역을 생성해준다.

* `/boot`
  * 부팅 관련 파일이 저장되는 곳으로 용량이 많이 필요하지 않다.
  * 1GB로 설정함
* `/swap`
  * 가상 메모리, 램이 32GB로 가상 메모리가 많이 필요하지 않을 것 같아 2GB로 설정하였다.
  * 2GB로 설정함
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
  * 용량을 모두 합하면 68GB로 나오는데 설정한 용량보다 더 큰 이유는 잘 모르겠다.
  * 51.72GB로 설정함

무조건 이렇게 하지 않아도 된다. 저장할 개인 파일이 많다면 루트 파티션을 줄이고 `/home` 파티션을 늘려도 된다. 파티셔닝은 정답이 없기 때문에 참고만 하자.

![계정 생성 및 설치](img/account-creation.png)

이제 계정을 생성하고 거주하는 곳을 선택하면 끝이다. 본인이 설정한 파티션에 문제가 없는지 확인하고 install 버튼을 클릭한다. 그럼 Ubuntu 설치가 완료되었다.

## 설치 완료

![Ubuntu 설치 완료](img/install-complete.png)

---

[^1]: [vssadmin delete shadows](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/vssadmin-delete-shadows)
[^2]: [[Linux] 리눅스 설치시 수동 파티션 나누기](https://0561blue.tistory.com/44)
