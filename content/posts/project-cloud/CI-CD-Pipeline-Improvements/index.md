+++
date = '2026-04-04T19:42:15+09:00'
draft = false
title = 'CI/CD 파이프라인 개선'
categories = ['Project Cloud']
+++

# 배경

[이전 글](../ci-cd-pipeline/)에서 GitHub Actions CI/CD 파이프라인을 구축했다. 백엔드 코드를 push하면 테스트 → Docker 빌드 → GCE 배포까지 자동으로 진행되는 구조였다.

그런데 운영하다 보니 몇 가지 문제가 생겼다:

1. **설정 파일이 자동 반영되지 않음** — `Caddyfile`, `docker-compose.prod.yml`을 수정해도 GCE에는 반영되지 않음. SSH로 직접 접속해서 수동으로 파일을 수정해야 했음
2. **배포 후 서비스 정상 여부를 확인하지 않음** — `docker compose up -d` 실행 후 컨테이너가 실제로 건강한지 검증하는 단계가 없음
3. **동시 배포 가능성** — 빠르게 연속 push하면 배포가 동시에 실행될 수 있음
4. **Caddy에만 리소스 제한이 없음** — postgres, backend에는 CPU/메모리 제한이 있는데 Caddy만 빠져있었음

# 설정 파일 자동 배포

## 문제

기존 deploy 스크립트는 이렇게 생겼다:

```bash
set -e
cd ~/baekjoon-recommender
docker compose -f docker-compose.prod.yml --env-file .env.prod pull backend
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
docker image prune -f
```

이 스크립트는 ghcr.io에서 백엔드 이미지를 pull하고 컨테이너를 재시작하는 것만 한다. GCE의 `Caddyfile`이나 `docker-compose.prod.yml`은 처음 배포할 때 수동으로 올린 그대로 남아있다.

## 해결

deploy 스크립트 맨 앞에 `git pull origin main`을 추가했다:

```bash
set -e
cd ~/baekjoon-recommender
git pull origin main                    # 설정 파일 동기화
docker compose -f docker-compose.prod.yml --env-file .env.prod pull backend
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
docker image prune -f
```

`set -e`는 스크립트 내 어떤 명령이든 실패하면 즉시 중단시킨다. 이게 없으면 `git pull`이 실패해도 이전 버전의 설정으로 `docker compose up -d`가 실행되어 의도하지 않은 상태가 될 수 있다.

이제 배포할 때마다 GCE의 레포가 최신 상태로 업데이트된다. `docker compose up -d`는 `docker-compose.prod.yml`이 변경되었으면 영향받는 컨테이너를 자동으로 재생성하고, Caddy는 볼륨 마운트된 `Caddyfile`이 바뀌면 컨테이너 재시작 시 반영된다.

## 트리거 경로 추가

설정 파일만 변경했을 때도 파이프라인이 실행되어야 하므로 `Caddyfile`을 paths에 추가했다:

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - 'docker-compose.prod.yml'
      - 'Caddyfile'                   # 추가
      - '.github/workflows/deploy.yml'
```

## init.sql은 예외

`init.sql`도 `git pull`로 파일 자체는 업데이트되지만, `docker-entrypoint-initdb.d`는 PostgreSQL 컨테이너가 최초 생성될 때만 실행된다. 이미 운영 중인 DB의 스키마를 변경하려면 직접 `ALTER TABLE`을 실행해야 한다:

```bash
docker compose -f docker-compose.prod.yml exec postgres \
  psql -U $DB_USERNAME -d baekjoonrec -c "
    ALTER TABLE user_analysis ADD COLUMN IF NOT EXISTS new_column INTEGER DEFAULT 0;
  "
```

`IF NOT EXISTS`를 사용하면 여러 번 실행해도 안전하다. 스키마 변경이 잦아지면 Flyway 같은 마이그레이션 도구를 도입할 수 있지만, 지금 규모에서는 수동으로도 충분하다고 판단했다.

# 동시 배포 방지

## 문제

연속으로 push하면 이전 배포가 끝나기 전에 다음 배포가 시작될 수 있다. 같은 서버에 두 배포가 동시에 `docker compose up -d`를 실행하면 예측할 수 없는 상태가 된다.

## 해결

`concurrency` 설정을 추가했다:

```yaml
concurrency:
  group: deploy-production
  cancel-in-progress: false
```

- `group`: 같은 그룹의 워크플로우는 동시에 실행되지 않음
- `cancel-in-progress: false`: 진행 중인 배포는 취소하지 않고 완료될 때까지 기다림. 새 워크플로우는 대기열에 들어감

`cancel-in-progress: true`로 설정하면 이전 배포를 취소하고 새 배포를 바로 시작하는데, 배포 도중 취소되면 서비스가 불안정해질 수 있으므로 `false`로 설정했다.

# 배포 후 Health Check

## 문제

`docker compose up -d` 실행 후 컨테이너가 실제로 정상 동작하는지 확인하지 않았다. 이미지는 정상적으로 pull되었지만 애플리케이션이 시작에 실패하는 경우(DB 연결 실패, 메모리 부족 등)를 감지할 수 없었다.

## 해결

deploy job에 health check 단계를 추가했다:

```yaml
      - name: Health check
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.GCE_HOST }}
          username: ${{ secrets.GCE_USERNAME }}
          key: ${{ secrets.GCE_SSH_KEY }}
          script: |
            set -e
            cd ~/baekjoon-recommender
            CONTAINER=$(docker compose -f docker-compose.prod.yml ps -q backend)
            for i in $(seq 1 10); do
              sleep 15
              docker exec "$CONTAINER" curl -sf http://localhost:8080/actuator/health && exit 0
            done
            exit 1
```

- 호스트에서 `localhost:8080`으로 직접 접근할 수 없다. backend 컨테이너는 포트를 외부에 노출하지 않고 Caddy를 통해서만 접근 가능하므로, `docker exec`로 컨테이너 내부에서 curl을 실행해야 함
- `curl -sf`: `-f`는 HTTP 4xx/5xx 응답을 실패로 처리하고, `-s`는 progress bar 출력을 억제하여 CI 로그를 깔끔하게 유지함
- 15초 간격으로 최대 10회 재시도 (최대 150초). e2-micro에서는 메모리 제한과 swap 사용으로 Spring Boot 기동이 느릴 수 있으므로 단일 sleep보다 재시도 방식이 안정적임
- 성공하면 `exit 0`으로 즉시 통과하고, 10회 모두 실패하면 `exit 1`로 워크플로우가 실패 상태가 됨

health check가 실패하면 GitHub Actions에서 워크플로우 실패로 표시되므로, 배포가 실패했다는 것을 확인할 수 있다.

### Docker Compose healthcheck과의 관계

`docker-compose.prod.yml`에도 backend에 자체 healthcheck가 설정되어 있다:

```yaml
healthcheck:
  test: ["CMD-SHELL", "curl -f http://localhost:8080/actuator/health || exit 1"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

이 둘은 역할이 다르다:

| | Docker Compose healthcheck | CI Health check |
|---|---|---|
| 목적 | 컨테이너 런타임 상태 관리 | 배포 성공 여부 확인 |
| 실행 시점 | 컨테이너 실행 중 상시 | 배포 직후 1회 |
| 실패 시 동작 | `restart: unless-stopped`에 의해 재시작 | 워크플로우 실패 표시 |

Docker Compose healthcheck는 운영 중 컨테이너가 죽으면 자동으로 재시작시키고, CI health check는 배포 직후 서비스가 정상적으로 뜨는지 확인하는 게이트 역할을 한다.

# Caddy 리소스 제한 추가

## 문제

`docker-compose.prod.yml`에서 postgres와 backend에는 리소스 제한이 있었지만 Caddy에는 없었다:

| 서비스 | CPU | 메모리 |
|--------|-----|--------|
| postgres | 0.3 | 256M |
| backend | 0.5 | 384M |
| caddy | 제한 없음 | 제한 없음 |

e2-micro는 vCPU 1개, RAM 614MB이다. 제한 없는 컨테이너가 있으면 리소스를 과도하게 사용할 가능성이 있다.

## 해결

Caddy에 리소스 제한을 추가했다:

```yaml
  caddy:
    image: caddy:2
    # ...
    deploy:
      resources:
        limits:
          cpus: '0.2'
          memory: 128M
```

Caddy는 리버스 프록시 역할만 하므로 0.2 CPU, 128M이면 충분하다. 전체 리소스 배분:

| 서비스 | CPU | 메모리 | 역할 |
|--------|-----|--------|------|
| postgres | 0.3 | 256M | DB |
| backend | 0.5 | 384M | Spring Boot API |
| caddy | 0.2 | 128M | 리버스 프록시, TLS |
| **합계** | **1.0** | **768M** | |

합계가 실제 e2-micro 리소스(1 vCPU, 614MB)를 초과하지만, 모든 서비스가 동시에 제한치까지 사용하는 경우는 거의 없으므로 문제없다. swap도 설정되어 있어 일시적인 초과는 처리할 수 있다.

# 최종 워크플로우

```yaml
name: Backend CI/CD

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - 'docker-compose.prod.yml'
      - 'Caddyfile'
      - '.github/workflows/deploy.yml'

concurrency:
  group: deploy-production
  cancel-in-progress: false

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository_owner }}/baekjoon-recommender-backend

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17

      - uses: gradle/actions/setup-gradle@v4

      - name: Run tests
        working-directory: backend
        run: ./gradlew test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: ./backend
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GCE
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.GCE_HOST }}
          username: ${{ secrets.GCE_USERNAME }}
          key: ${{ secrets.GCE_SSH_KEY }}
          script: |
            set -e
            cd ~/baekjoon-recommender
            git pull origin main
            docker compose -f docker-compose.prod.yml --env-file .env.prod pull backend
            docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
            docker image prune -f

      - name: Health check
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.GCE_HOST }}
          username: ${{ secrets.GCE_USERNAME }}
          key: ${{ secrets.GCE_SSH_KEY }}
          script: |
            set -e
            cd ~/baekjoon-recommender
            CONTAINER=$(docker compose -f docker-compose.prod.yml ps -q backend)
            for i in $(seq 1 10); do
              sleep 15
              docker exec "$CONTAINER" curl -sf http://localhost:8080/actuator/health && exit 0
            done
            exit 1
```

# 개선 전후 비교

| 항목 | 개선 전 | 개선 후 |
|------|---------|---------|
| 설정 파일 반영 | 수동 SSH 접속 필요 | `git pull`로 자동 동기화 |
| 동시 배포 | 충돌 가능 | `concurrency`로 순차 실행 보장 |
| 배포 검증 | 없음 | `/actuator/health` 자동 확인 |
| Caddy 리소스 | 제한 없음 | 0.2 CPU, 128M |
| Caddyfile 변경 시 | 파이프라인 미실행 | paths 트리거로 자동 배포 |
