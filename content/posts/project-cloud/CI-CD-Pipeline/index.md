+++
date = '2026-04-02T21:14:47+09:00'
draft = false
title = 'GitHub Actions CI/CD 파이프라인 구축'
categories = ['Project Cloud']
+++

# 배경

지금까지는 코드를 수정하면 GCE에 SSH로 접속해서 `git pull` → `docker compose build` → `docker compose up -d`를 수동으로 실행했다.

문제는 두 가지:

1. **매번 수동 배포가 번거로움** — 코드 한 줄 고쳐도 SSH 접속부터 빌드까지 반복해야 함
2. **e2-micro에서 Docker 빌드가 느림** — RAM 614MB로는 swap을 사용해야 하므로 빌드 시간이 오래 걸리고, 빌드 중 서비스가 불안정해질 수 있음

CI/CD를 도입하면 이 두 가지를 한 번에 해결할 수 있다. GitHub Actions에서 빌드하고, 완성된 이미지만 GCE로 가져오면 된다.

# CI/CD 개념

CI/CD는 코드 변경부터 배포까지를 자동화하는 파이프라인이다.

- **CI (Continuous Integration)**: 코드를 push하면 자동으로 빌드하고 테스트를 실행함. 깨진 코드가 메인 브랜치에 합쳐지는 것을 방지함
- **CD (Continuous Deployment)**: CI가 성공하면 자동으로 프로덕션 서버에 배포함. 수동 개입 없이 코드가 서비스에 반영됨

이 프로젝트의 파이프라인은 다음과 같다:

```
main에 push
  → [CI] 테스트 실행 (./gradlew test)
  → [CI] Docker 이미지 빌드 → GitHub Container Registry에 push
  → [CD] SSH로 GCE 접속 → 이미지 pull → 컨테이너 재시작
```

# GitHub Container Registry (ghcr.io)

## 개념

GitHub Container Registry는 GitHub에 내장된 Docker 이미지 저장소이다. Docker Hub와 같은 역할을 하지만 GitHub 계정으로 바로 사용할 수 있다.

- GitHub Actions에서는 `GITHUB_TOKEN`으로 별도 설정 없이 push 가능
- 이미지 URL 형식: `ghcr.io/{owner}/{image-name}:{tag}`
- private 레포의 패키지는 기본적으로 private이므로, 외부에서 pull하려면 인증이 필요함

## 왜 ghcr.io인가

e2-micro에서 Docker 빌드를 할 수 없으므로, 빌드된 이미지를 레지스트리에 올려두고 GCE에서는 pull만 하는 구조가 필요하다. ghcr.io는 GitHub Actions와 통합되어 있어 추가 설정이 거의 없다.

# GitHub Actions 워크플로우 작성

## 개념

GitHub Actions는 `.github/workflows/` 디렉토리에 YAML 파일을 작성하면 동작하는 CI/CD 플랫폼이다.

- **workflow**: 하나의 YAML 파일. 트리거 조건과 실행할 job들을 정의함
- **job**: 독립적인 실행 단위. 각 job은 별도의 가상 머신에서 실행됨
- **step**: job 내의 개별 명령어. 순서대로 실행됨
- **needs**: job 간 의존 관계. `needs: test`이면 test job이 성공해야 실행됨

## 워크플로우 구조

이 프로젝트의 워크플로우는 3개의 job으로 구성된다:

```
test → build-and-push → deploy
```

- `test`: 백엔드 테스트 실행
- `build-and-push`: Docker 이미지 빌드 후 ghcr.io에 push
- `deploy`: SSH로 GCE에 접속하여 이미지 교체

## 워크플로우 파일

`.github/workflows/deploy.yml`:

```yaml
name: Backend CI/CD

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - 'docker-compose.prod.yml'
      - '.github/workflows/deploy.yml'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository_owner }}/baekjoon-recommender-backend
```

- `on.push.paths`: 지정된 경로의 파일이 변경된 경우에만 워크플로우가 실행됨. 프론트엔드만 수정했을 때 불필요한 빌드/배포가 돌아가지 않음
- `env`: 워크플로우 전체에서 사용하는 환경변수

### test job

```yaml
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
```

- `actions/setup-java`: JDK 17 설치
- `gradle/actions/setup-gradle`: Gradle 캐싱 및 최적화. 의존성을 캐시하여 반복 빌드 속도를 높임

![test job 실행](img/Screenshot%20from%202026-04-05%2000-42-01.png)

### build-and-push job

```yaml
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
```

- `permissions.packages: write`: ghcr.io에 이미지를 push하기 위해 필요한 권한
- `secrets.GITHUB_TOKEN`: GitHub Actions가 자동으로 제공하는 토큰. 별도 설정 불필요
- 태그를 `latest`와 커밋 SHA 두 개로 생성함. `latest`는 항상 최신 이미지를 가리키고, SHA 태그로 특정 버전을 추적할 수 있음

![build-and-push job 실행](img/Screenshot%20from%202026-04-05%2000-43-51.png)

### deploy job

```yaml
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
            cd ~/baekjoon-recommender
            docker compose -f docker-compose.prod.yml --env-file .env.prod pull backend
            docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
            docker image prune -f
```

- `appleboy/ssh-action`: SSH로 원격 서버에 명령어를 실행하는 액션
- `docker compose pull backend`: ghcr.io에서 최신 이미지를 가져옴
- `docker compose up -d`: 변경된 이미지로 컨테이너를 재시작함. 변경이 없는 서비스는 그대로 유지됨
- `docker image prune -f`: 이전 버전 이미지를 삭제하여 디스크 공간을 확보함

## docker-compose.prod.yml 변경

기존에는 `build: ./backend`로 GCE에서 직접 빌드했지만, 이제 ghcr.io에서 빌드된 이미지를 pull하는 방식으로 변경:

```yaml
  backend:
    # 변경 전
    # build: ./backend

    # 변경 후
    image: ghcr.io/bogamie/baekjoon-recommender-backend:latest
```

# GitHub Secrets 설정

워크플로우에서 GCE에 SSH 접속하려면 인증 정보가 필요하다. 이 정보는 GitHub Secrets에 저장하여 워크플로우에서 안전하게 참조한다.

레포 → **Settings → Secrets and variables → Actions → New repository secret**에서 등록:

| Secret | 값 |
|--------|-----|
| `GCE_HOST` | GCE 인스턴스 외부 IP |
| `GCE_USERNAME` | SSH 접속 유저명 |
| `GCE_SSH_KEY` | SSH 개인키 전체 내용 |

![GitHub Secrets 등록 화면](img/Screenshot%20from%202026-04-05%2000-32-47.png)

## SSH 키 생성

기존 `google_compute_engine` 키는 passphrase가 걸려 있어 GitHub Actions에서 사용할 수 없다. passphrase 없는 배포 전용 키를 별도로 생성함:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/gce_deploy -N "" -C "github-actions-deploy"
```

- `-N ""`: passphrase 없이 생성
- 이 키는 CI/CD 배포에만 사용되는 전용 키

생성된 공개키를 GCE 인스턴스에 등록:

```bash
gcloud compute instances add-metadata baekjoon-recommender \
  --zone=us-central1-a \
  --metadata-from-file ssh-keys=<(echo "bogamie:$(cat ~/.ssh/gce_deploy.pub)")
```

`cat ~/.ssh/gce_deploy`의 전체 내용을 `GCE_SSH_KEY` Secret에 등록하면 된다.

# GCE에서 ghcr.io 인증

GCE 인스턴스에서 ghcr.io의 private 이미지를 pull하려면 Docker 로그인이 필요하다. 이 작업은 한 번만 하면 된다.

## Personal Access Token (Classic) 발급

GitHub → **Settings → Developer settings → Personal access tokens → Tokens (classic)** 에서 `read:packages` 스코프로 토큰을 발급한다.

> Fine-grained 토큰은 ghcr.io 패키지 접근이 제대로 안 되는 경우가 있으므로 Classic 토큰을 사용함.

## GCE에서 Docker 로그인

```bash
echo "발급받은_PAT" | docker login ghcr.io -u bogamie --password-stdin
```

```
Login Succeeded
```

로그인 정보는 `~/.docker/config.json`에 저장되므로 이후 `docker compose pull` 시 자동으로 인증됨.

# 트러블슈팅

## deploy job SSH 인증 실패

처음 deploy job을 실행했을 때 SSH 연결에 실패했다.

![deploy job 실패](img/Screenshot%20from%202026-04-05%2000-45-40.png)

```
ssh.ParsePrivateKey: ssh: this private key is passphrase protected
ssh: handshake failed: ssh: unable to authenticate, attempted methods [none],
  no supported methods remain
```

원인: `google_compute_engine` 키에 passphrase가 설정되어 있었음. GitHub Actions의 `appleboy/ssh-action`은 passphrase가 없는 키를 사용해야 한다. passphrase 없는 배포 전용 키(`gce_deploy`)를 별도로 생성하여 해결함.

## 환경변수 누락 경고

deploy 성공 후에도 환경변수 관련 경고가 발생했다.

![환경변수 warning](img/Screenshot%20from%202026-04-05%2000-56-42.png)

```
The "DB_USERNAME" variable is not set. Defaulting to a blank string.
The "DB_PASSWORD" variable is not set. Defaulting to a blank string.
...
```

원인: `docker compose` 실행 시 `.env.prod` 파일을 명시하지 않아 환경변수를 읽지 못한 것. `--env-file .env.prod` 옵션을 추가하여 해결함.

## ghcr.io 이미지 pull 403 Forbidden

GCE에서 `docker pull`을 시도했을 때 403 에러가 발생했다.

```
failed to resolve reference "ghcr.io/bogamie/baekjoon-recommender-backend:latest":
  unexpected status from HEAD request: 403 Forbidden
```

원인: Fine-grained PAT로 `docker login`을 했으나 ghcr.io 패키지 접근에 필요한 권한이 없었음. Classic PAT에 `read:packages` 스코프를 부여하여 해결함.

# 전체 구조 요약

```
[개발자 PC]
   │
   │ git push (main, backend/ 변경)
   ▼
[GitHub Actions]
   ├── test: ./gradlew test
   ├── build-and-push: Docker 빌드 → ghcr.io push
   └── deploy: SSH → GCE
          │
          ▼
[GCE e2-micro]
   ├── docker compose pull (ghcr.io에서 이미지 다운로드)
   └── docker compose up -d (컨테이너 교체)
```

| 단계 | 실행 위치 | 소요 리소스 |
|------|-----------|-------------|
| 테스트 | GitHub Actions (2 vCPU, 7GB RAM) | 무료 (public repo) |
| Docker 빌드 | GitHub Actions | 무료 |
| 이미지 저장 | ghcr.io | 무료 (500MB/월, public) |
| 배포 | GCE e2-micro | pull + restart만 수행 |

e2-micro에서 빌드를 하지 않으므로 메모리 부족 문제가 발생하지 않고, 코드를 push하기만 하면 테스트부터 배포까지 자동으로 진행된다.
