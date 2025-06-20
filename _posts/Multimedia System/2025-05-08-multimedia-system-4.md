---
title:  "4. 벡터 그래픽과 비트맵 이미지"
excerpt: "&nbsp;&nbsp; "
date:   2025-05-08 21:20:02 +0900
categories: Multimedia System
permalink: 
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 4.1 인간의 눈 특성
* 빛과 색을 **파장** 또는 **주파수**의 관점에서 인식함

$$
v = \lambda \cdot f \quad \leftrightarrow \quad \lambda = \frac{v}{f}
$$

* $v$: 파동의 속도
* $\lambda$: 파장, 한 주기의 길이 (단위: m)
* $f$: 주파수, 1초에 몇 번 진동하는지 (단위: Hz)

## a. 동시 대비
* 인간의 눈은 빛의 세기보다 빛의 **차이**에 더 민감함
* 절대적인 밝기보다 **상대적인 밝기**에 더 민감

## b. 마흐 밴드 효과
* 빛의 밝기가 계단식으로 변화할 때, 인간의 눈은 **변화하는 경계**에 민감함

## c. 로그 감도
* 인간의 눈은 빛의 밝기를 **로그 함수**에 비례하여 인식함
* 주위의 밝기가 어두울 경우, 작은 밝기 변화에도 매우 민감
* 주위의 밝기가 밝을 경우, 큰 밝기 변화에도 둔감함

## d. 장면과 이미지를 인식하는 방식
* 인간의 뇌는 **공간 주파수 분석**을 통해 장면이나 이미지를 인식함
  * **배경**: 저주파 성분
  * **경계**: 고주파 성분

> **가시광선**
> * 가시광선의 파장 범위: 380nm ~ 750nm
> * 인간의 눈은 빨강, 초록, 파랑에 가장 민감하며, 색을 RGB 혼합으로 인식함
> * 빛의 파장에 따라 7가지의 색으로 나뉘어짐
> 
> UV(자외선, Ultraviolet): 10nm ~ 380nm <br>
> IR(적외선, Infrared): 750nm ~ 1mm <br>

# 4.2 컴퓨터 그래픽
## a. 벡터 그래픽
* 디지털로 생성되며 컴퓨터에 의해 만들어진 인공 이미지
* 수학적 방정식을 사용해 2D 또는 3D 공간에 선, 곡선, 다각형 등의 도형을 배치하여 생성
* **벡터**
  * 크기와 방향을 가지는 물리량
  * 두 개 이상의 노드가 선, 곡선, 다각형 등으로 연결됨
  * 벡터 그래픽 파일은 벡터 명령의 연속으로 저장됨

### i. 확장성
* **확대 가능한 그래픽**에 적합
* 회사 로고, 애니메이션 이미지, CAD

## b. 비트맵 이미지
* **비트맵**: 디스플레이에 랜더링될 때 특정 그림을 형성하는 비트의 지도
* 비트맵 이미지는 픽셀 또는 이진 데이터 배열로 표현됨
* 

# 4.5 그래픽 소프트웨어와 파일 포맷