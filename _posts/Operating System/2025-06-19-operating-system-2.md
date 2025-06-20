---
title:  "2. EXT4 파일 시스템"
excerpt: "EXT4 파일 시스템의 구조와 특징을 이해합니다."
date:   2025-06-19 12:39:47 +0900
categories: Operating System
permalink: posts/2-ext4-file-system
published: false
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
---
# 2.2 EXT4

* EXT4는 관리 오버헤드를 줄이고 처리량을 증가시키기 위해 저장 장치를 논리 블록의 배열로 나눔
* EXT4는 파일 시스템을 여러 개의 블록 그룹(block group)으로 나누어 관리함
* 파일 조각화를 줄이기 위해 블록 할당기(block allocator)는 각 파일의 블록들은 같은 그룹 안에 배치하려고 시도함 → 디스크 탐색 시간 단축
* 블록 그룹의 크기는
  * `sb.s_blocks_per_group` 값에 명시되어 있음
  * 또는 8 * `block_size_in_bytes`로 계산할 수 있음 (기본 블록 크기가 4KiB인 경우, 각 그룹은 32,768 blocks를 가지므로 128KiB의 크기를 가짐)
* EXT4의 모든 필드는 디스크에 리틀 엔디안(little-endian) 형식으로 저장됨
* JBD2(저널)의 모든 필드는 빅 엔디안(big-endian) 형식으로 저장됨

## a. Blocks
* EXT4는 저장 공간을 "blocks" 단위로 할당함
* **블록**은 섹터들의 집합으로 1KiB~64KiB 사이의 크기를 가짐
* 블록을 구성하는 섹터의 수는 2의 거듭제곱이어야 함
* 블록 크기는 파일 시스템을 처음 생성할 때(mkfs time) 지정되며, 보통 4KiB로 설정됨 (블록 크기가 페이지 크기보다 크면 마운팅 시에 오류 발생)
* 기본 EXT4는 최대 2³² blocks 지원 가능, 64bit 확장 EXT4는 최대 2⁶⁴ blocks 지원 가능
* 디스크 내 블록의 위치는 블록 번호로 표현됨

## b. 구조

<img class="lazy invert" data-src="https://github.com/kisue01/assets/raw/refs/heads/main/qsalcwmh9dqspxglmalv.avif#center" alt="image" height="60%" width="60%" onclick="showImage(this)">

* 0번 블록 그룹에서는 x86 부트 섹터 설치나 기타 특수 목적을 위해 처음 1024바이트는 사용되지 않음
* 슈퍼블록(Superblock)은 항상 디스크 오프셋 1024 Bytes 지점에서 시작함
  * 블록 크기에 따라 슈퍼블록이 어떤 블록 번호에 속하는지는 달라질 수 있음
  * 블록 크기가 4KiB인 경우: block 0의 내부에 위치
  * 블록 크기가 1KiB인 경우: 1024 Bytes 오프셋은 block 1의 시작 → block 1에 위치
* 