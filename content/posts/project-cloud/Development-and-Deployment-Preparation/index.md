+++
date = '2026-03-24T16:12:38+09:00'
draft = false
title = 'BaekjoonRec 개발 및 배포 준비'
categories = ['Project Cloud']
+++

# 프로젝트 개요

- 백준 온라인 저지 사용자의 풀이 데이터를 solved.ac API로 분석하여 맞춤형 문제를 추천하는 웹 서비스
- Spring Boot 백엔드 + React 프론트엔드 + PostgreSQL 구성
- 배포: GCE free tier에 백엔드, GitHub Pages에 프론트엔드를 올려 도메인 구매 없이 서비스 제공

> 이 글은 클라우드 배포를 위한 준비 과정에 초점을 둠. 각 기능의 구현 코드나 로직 상세는 다루지 않으며, 배포 구성에 영향을 주는 설계 결정과 인프라 설정 위주로 정리함.

# 아키텍처

```
[사용자]
   ↓
[GitHub Pages (프론트엔드)]
   ↓ VITE_API_URL
[GCE e2-micro (백엔드 + PostgreSQL)]
   ↓
[solved.ac API]
```

- 프론트엔드는 정적 파일이므로 GitHub Pages로 무료 호스팅
- 백엔드와 DB는 GCE free tier(e2-micro)에 Docker Compose로 올림
- 프론트엔드에서 GCE 외부 IP로 직접 API 호출

# 백엔드

- Spring Boot 3.4.4, Java 17, Gradle Kotlin DSL
- DB 스키마는 `init.sql`로 직접 관리 (JPA `ddl-auto=none`)

## 패키지 구조

| 패키지 | 역할 |
|---------|------|
| `auth` | JWT 인증 (jjwt 0.12.6), Spring Security 필터 체인, 회원가입 4단계 플로우, 이메일 인증 |
| `user` | 사용자 프로필 CRUD, solved.ac 핸들 연동 |
| `solvedac` | RestClient 기반 solved.ac API 클라이언트 (1초 rate limit), 문제 동기화 (24시간 캐시) |
| `analysis` | 사용자 활동 분류, 태그별 숙련도 분석, 휴면 감지 |
| `problem` | Problem/ProblemTag/UserSolved 엔티티 (solved.ac 캐시) |
| `recommend` | 5슬롯 추천 엔진, 적응형 난이도, 건너뛰기/새로고침 |
| `common` | 전역 예외 처리, 메일 서비스, RateLimitFilter |

## 인증 플로우

```
check-email → check-username → send-code → verify-code → signup → JWT 발급
```

- access token 30분, refresh token 7일 (DB 저장)
- 401 응답 시 프론트에서 자동으로 refresh token으로 갱신 후 원래 요청을 재시도함
- 동시에 여러 요청이 401을 받으면 refresh 큐에 대기시켜 한 번만 갱신함

## 추천 엔진

- 5개 슬롯으로 구성됨

| 슬롯 | 역할 |
|-------|------|
| GROWTH | 잘하는 태그에서 한 단계 위 난이도 |
| CHALLENGE | 풀었던 문제 중 가장 어려운 수준 |
| ENTRY | 아직 안 풀어본 태그의 입문 문제 |
| EXPLORE | 새로운 태그에서 랜덤 |
| REVIEW | 풀었던 문제와 관련된 태그의 복습 문제 |

- 사용자의 풀이 이력을 기반으로 적응형 난이도를 적용함
- 건너뛰기/새로고침 지원, solved.ac API 폴백 캐싱

## 사용자 분석

- 활동 분류: `NEWCOMER` / `ACTIVE` / `RETURNING_EARLY` / `RETURNING_MID`
- 태그별 숙련도: `UNEXPLORED` → `BEGINNER` → `INTERMEDIATE` → `ADVANCED`
- 마지막 풀이 일자 기반 휴면 감지

## API 엔드포인트

```
POST /api/auth/check-email, check-username, send-code, verify-code, signup, login, refresh
GET  /api/users/me | PUT /api/users/me/solvedac | POST /api/users/me/sync
GET  /api/dashboard/summary | GET /api/dashboard/tags?sort={field}&order={asc|desc}
GET  /api/recommend | POST /api/recommend/skip | POST /api/recommend/refresh
```

# 프론트엔드

- React 18, TypeScript, Vite 5
- CSS Modules로 스타일링 (UI 라이브러리 없음)
- Pretendard 폰트, 단일 액센트 컬러 (#2563EB)

## 구조

| 디렉토리 | 역할 |
|-----------|------|
| `api/` | Axios 클라이언트, Bearer 인터셉터, 401 자동 갱신, 요청 큐잉 |
| `contexts/` | AuthContext — 토큰 관리 (localStorage), 마운트 시 유효성 검증 |
| `pages/` | Login, Signup (4단계 폼), Dashboard (태그 통계), Recommend, Settings, ForgotPassword |
| `components/` | ProtectedRoute, Layout, UserMenu |

## API 클라이언트

```typescript
const baseURL = import.meta.env.VITE_API_URL ?? ''

const client = axios.create({ baseURL })
```

- `VITE_API_URL` 환경 변수로 백엔드 주소를 주입함
- 개발 시에는 Vite 프록시로 `/api`를 `localhost:8080`으로 전달
- 배포 시에는 GCE 외부 IP를 직접 지정

## 라우팅

```
/ → 대시보드 (인증) 또는 로그인
/login, /signup
/dashboard, /recommend, /settings (protected)
```

# 데이터베이스

- PostgreSQL 15
- 스키마는 `init.sql`로 관리하며 Docker Compose 초기화 시 자동 실행됨

## 주요 테이블

| 테이블 | 역할 |
|--------|------|
| `users` | 사용자 계정, 이메일 인증 상태, solvedac 핸들, 테마 |
| `email_verification` | 6자리 인증 코드 (만료 시간 포함) |
| `refresh_tokens` | JWT 리프레시 토큰 |
| `problems` | solved.ac에서 캐시한 문제 메타데이터 |
| `problem_tags` | 문제-태그 매핑 |
| `user_solved` | 사용자 풀이 기록 |
| `user_analysis` | 사용자 활동 분석 캐시 |
| `user_tag_stats` | 태그별 통계 (풀이 수, 평균/최고 레벨, 숙련도) |
| `recommendation_history` | 추천 이력 |

# Docker 구성

## 개발 환경 (docker-compose.yml)

```
postgres:5432 → backend:8080 → frontend:3000
```

- postgres health check 후 backend 시작
- frontend는 backend 의존

## 프로덕션 환경 (docker-compose.prod.yml)

- `SPRING_PROFILES_ACTIVE: prod`로 프로덕션 프로파일 활성화
- Spring Boot Actuator health check 사용
- `restart: unless-stopped`로 자동 복구
- 환경 변수로 시크릿 주입 (`.env.prod`)

## 백엔드 Dockerfile

```dockerfile
# Stage 1: Gradle 8.5 + JDK 17로 빌드
FROM gradle:8.5-jdk17 AS build
# gradle build -x test --no-daemon

# Stage 2: Eclipse Temurin JRE 17로 실행
FROM eclipse-temurin:17-jre
# non-root user로 실행
# -XX:MaxRAMPercentage=75.0 (컨테이너 메모리의 75%로 힙 제한)
```

- 멀티 스테이지 빌드로 이미지 크기를 줄임
- JDK가 아닌 JRE만 포함하여 불필요한 빌드 도구를 제거함
- `MaxRAMPercentage=75.0`은 e2-micro(614MB RAM)에서 JVM이 메모리를 과도하게 잡지 않도록 하기 위한 설정임

## 프론트엔드 Dockerfile

```dockerfile
# Stage 1: Node 20-alpine으로 빌드
FROM node:20-alpine AS builder
# npm ci && npm run build

# Stage 2: Nginx alpine으로 서빙
FROM nginx:alpine
# dist → /usr/share/nginx/html
# non-root user
```

# 프로덕션 설정

## application-prod.yml

```yaml
server:
  shutdown: graceful
  tomcat:
    max-threads: 50
    accept-count: 100

spring:
  datasource:
    hikari:
      maximum-pool-size: 15
      minimum-idle: 5
      connection-timeout: 5000
```

- graceful shutdown으로 진행 중인 요청 처리 후 종료
- HikariCP 커넥션 풀 설정 — e2-micro 사양에 맞게 조정
- 프로덕션에서는 실제 SMTP로 이메일 발송 (`dev-mode: false`)

## 로깅

```xml
<!-- prod 프로파일: JSON 구조화 로깅 -->
<root level="INFO">
  <appender-ref ref="CONSOLE_JSON" />
</root>
```

- 개발 환경에서는 컬러 콘솔 출력
- 프로덕션에서는 JSON 구조화 로깅 (GCP Cloud Logging 연동 대비)

## 환경 변수

```bash
# .env.prod
DB_USERNAME=app
DB_PASSWORD=change-me-strong-password
JWT_SECRET=change-me-long-random-secret  # 최소 32바이트
ALLOWED_ORIGINS=http://YOUR_GCP_EXTERNAL_IP
MAIL_USERNAME=your-email@gmail.com
MAIL_APP_PASSWORD=your-app-password
```

- JWT 시크릿은 `openssl rand -base64 48`로 생성
- Gmail SMTP는 앱 비밀번호 사용

# 배포 전략

## GitHub Pages (프론트엔드)

- `npm run build`로 정적 파일 생성 후 GitHub Pages에 배포
- `VITE_API_URL`에 GCE 외부 IP를 설정하여 빌드
- SPA이므로 GitHub Pages에서 404 fallback 설정이 필요함 (404.html → index.html 리다이렉트)

## GCE free tier (백엔드 + DB)

- e2-micro 인스턴스 (vCPU 0.25, 메모리 614MB)
- Docker Compose로 백엔드 + PostgreSQL을 함께 올림
- 방화벽 규칙에서 8080 포트 개방
- `docker compose -f docker-compose.prod.yml up -d`로 실행

## 예상 구성

```
[bogamie.github.io (GitHub Pages)]
        ↓ http://GCE_EXTERNAL_IP:8080/api
[GCE e2-micro]
  ├── backend (Spring Boot, :8080)
  └── postgres (:5432, 외부 미노출)
```

- 도메인 없이 GitHub Pages URL + GCE 외부 IP로 서비스 제공
- CORS 설정에서 GitHub Pages 도메인을 허용해야 함

## DB 백업

```bash
# scripts/backup-db.sh
# pg_dump → gzip 압축
# 7일간 보관, cron으로 매일 새벽 3시 실행
0 3 * * * /path/to/backup-db.sh
```

# 개발 환경 편의 도구

## Makefile

```bash
make up          # 전체 스택 시작
make build       # 빌드 후 시작
make dev         # postgres만 띄우고 로컬 개발
make dev-back    # ./gradlew bootRun
make dev-front   # npm run dev
make reset       # 컨테이너 + 볼륨 초기화
```

# 남은 작업

- GCE 인스턴스 생성 및 Docker 설치
- `.env.prod` 설정 후 `docker compose -f docker-compose.prod.yml up -d`
- GitHub Pages에 프론트엔드 배포 (GitHub Actions 자동화 가능)
- CORS에 GitHub Pages 도메인 추가