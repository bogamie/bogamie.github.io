---
title:  "3. 3단원"
excerpt: "&nbsp;&nbsp; "
date:   2025-04-17 22:37:37 +0900
categories: Multimedia System
permalink: 
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 3.1 Data Compression

> 디지털 미디어는 데이터 양이 많아 저장 용량 및 전송 대역폭에 제한이 생긴다. 따라서 대부분 압축된 형태로 제공되며, 압축 알고리즘은 손실(lossy)과 무손실(lossless) 방식으로 나뉜다.

## a. 압축 방식 구분

### i. 무손실 압축 (Lossless Compression)

- 정보 손실 없이 통계적 중복 제거
- 텍스트 (ZIP), 고품질 오디오 (FLAC) 등에 사용
- 압축률은 손실 압축보다 낮음

### ii. 손실 압축 (Lossy Compression)

- 일부 정보 삭제 또는 단순화
- 고압축률 가능 (예: JPEG, MP3, MPEG)
- 인간 지각 특성을 활용

## b. 압축 기법 분류

- **Entropy Coding**
  - Run-Length Encoding (RLE)
  - Shannon-Fano Coding
  - Huffman Coding

- **Dictionary-based Coding**
  - LZ77
  - LZW

# 3.2 Entropy and Coding Basics

## a. 정보와 엔트로피

### i. 정보량 (Information)

- 드문 사건일수록 많은 정보 제공
- 정보량 공식:

  $$
  I(x) = -\log_2 P(x)
  $$

### ii. 엔트로피 (Entropy)

- 평균 정보량, 즉 평균적으로 필요한 비트 수
- 정의:

  $$
  H(X) = -\sum_{i=1}^{n} P(x_i) \log_2 P(x_i)
  $$

#### 가. 예제

- 동전 한 개: $H = 1$
- 동전 두 개: $H = 2$

## b. 엔트로피의 의미

- 특정 메시지를 표현하는 데 필요한 최소 평균 비트 수
- 압축 알고리즘의 효율성 측정에 사용됨

# 3.3 Coding Basics

## a. 용어 정의

### i. Encoding & Decoding

- **Encoding**: 데이터를 더 적은 비트로 표현
- **Decoding**: 원래 데이터로 복원

### ii. Codec

- Encoder + Decoder의 통합 시스템

### iii. Codeword

- 각 심볼에 할당된 비트열

### iv. Prefix Property

- 어떤 코드워드도 다른 코드워드의 접두어가 되어서는 안 됨

# 3.4 Run-Length Encoding (RLE)

## a. 개요

- 반복되는 데이터를 압축하는 가장 간단한 방식
- 예시:
  - 입력: `AAAABBBCCDAA`
  - 출력: `4A3B2C1D2A`

## b. 특징

- 연속된 데이터가 많을수록 효과적
- 주로 흑백 이미지, 텍스트 등에 사용됨

# 3.5 Shannon-Fano Coding

## a. 알고리즘 개요

### i. 절차

1. 심볼을 빈도순으로 정렬
2. 가능한 한 균등하게 두 그룹으로 나눔
3. 각 그룹에 0 또는 1을 할당
4. 그룹 내 재귀 반복

## b. 평균 코드 길이

- 정의:

  $$
  L = \sum_{i=1}^{n} P(x_i) \cdot l_i
  $$

## c. 압축 효율

- 정의:

  $$
  \text{Efficiency} = \frac{H(X)}{L} \times 100\%
  $$

# 3.6 Huffman Coding

## a. 개요

- 빈도가 높은 심볼에 짧은 코드 부여
- 최적의 이진 트리를 구성하는 방식

## b. 알고리즘 절차

### i. 구성 방법

1. 모든 심볼을 빈도 기반 노드로 초기화
2. 최소 빈도의 두 노드를 병합
3. 병합 노드를 다시 큐에 삽입
4. 반복하여 루트 노드 완성

## c. 코드 생성

- 왼쪽 자식: 0
- 오른쪽 자식: 1

## d. 평균 코드 길이

- 정의:

  $$
  L = \sum_{i=1}^{n} P(x_i) \cdot l_i
  $$

## e. 검증 방법

- 트리 리프에서 루트로 역추적하여 가중치가 오름차순인지 확인