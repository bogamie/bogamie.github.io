+++
date = '2026-04-06T15:33:09+09:00'
draft = false
title = '프론트엔드 CI/CD 파이프라인'
categories = ['Project Cloud']
+++

# 배경

백엔드는 [GitHub Actions CI/CD 파이프라인](../ci-cd-pipeline/)으로 자동 배포가 되고 있지만, 프론트엔드는 여전히 수동이었다. 로컬에서 빌드하고 `baekjoon-recommender.github.io` 레포에 직접 push하는 방식이었다.

프론트엔드도 자동화해야 하는데, 백엔드와는 배포 구조가 다르다:

| | 백엔드 | 프론트엔드 |
|---|---|---|
| 호스팅 | GCE (Docker) | GitHub Pages |
| 배포 방식 | SSH → docker compose up | 빌드 결과물을 별도 레포에 push |
| 배포 대상 | 같은 서버 | 다른 레포 (`baekjoon-recommender.github.io`) |

핵심은 **cross-repo 배포**다. 소스 코드가 있는 `baekjoon-recommender` 레포에서 빌드하고, 결과물을 `baekjoon-recommender.github.io` 레포에 push해야 한다.

# 사전 준비

## PAT 생성

GitHub Actions에서 다른 레포에 push하려면 `GITHUB_TOKEN`으로는 권한이 부족하다. `GITHUB_TOKEN`은 워크플로우가 실행되는 레포에 대한 권한만 가지고 있기 때문이다.

`baekjoon-recommender.github.io` 레포에 push할 수 있는 Personal Access Token이 필요하다. 배포 대상 레포가 `baekjoon-recommender` organization 소유이므로, 해당 organization 계정에서 Classic PAT를 발급했다:

- **Settings → Developer settings → Personal access tokens → Tokens (classic)**
- 스코프: `repo` (레포 전체 접근 권한)

발급받은 토큰을 소스 레포(`baekjoon-recommender`)의 **Settings → Secrets and variables → Actions**에 `FRONTEND_DEPLOY_TOKEN`으로 등록했다.

# 워크플로우

`.github/workflows/frontend-deploy.yml`:

```yaml
name: Frontend Deploy

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'
      - '.github/workflows/frontend-deploy.yml'

concurrency:
  group: deploy-frontend
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - name: Install and build
        working-directory: frontend
        env:
          VITE_API_URL: https://baekjoonrec.duckdns.org
        run: |
          npm ci
          npm run build
          cp dist/index.html dist/404.html

      - name: Deploy to GitHub Pages
        run: |
          cd frontend/dist
          git init
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          git commit -m "deploy: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
          git push --force https://x-access-token:${{ secrets.FRONTEND_DEPLOY_TOKEN }}@github.com/baekjoon-recommender/baekjoon-recommender.github.io.git HEAD:main
```

## 빌드

```yaml
      - name: Install and build
        working-directory: frontend
        env:
          VITE_API_URL: https://baekjoonrec.duckdns.org
        run: |
          npm ci
          npm run build
          cp dist/index.html dist/404.html
```

- `VITE_API_URL`: Vite는 빌드 타임에 환경변수를 하드코딩한다. 로컬 개발에서는 vite proxy로 `/api`를 `localhost:8080`에 프록시하지만, 프로덕션 빌드에서는 실제 백엔드 도메인을 지정해야 함
- `npm ci`: `package-lock.json`을 기준으로 정확한 버전의 의존성을 설치함. `npm install`과 달리 lock 파일을 수정하지 않으므로 CI 환경에 적합함
- `cp dist/index.html dist/404.html`: GitHub Pages에서 SPA 라우팅을 처리하기 위한 방법. GitHub Pages는 `/dashboard` 같은 경로로 직접 접근하면 404를 반환하는데, `404.html`이 있으면 그 파일을 보여줌. `index.html`과 동일한 내용이므로 React Router가 클라이언트에서 라우팅을 처리할 수 있음

## 배포

```yaml
      - name: Deploy to GitHub Pages
        run: |
          cd frontend/dist
          git init
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          git commit -m "deploy: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
          git push --force https://x-access-token:${{ secrets.FRONTEND_DEPLOY_TOKEN }}@github.com/baekjoon-recommender/baekjoon-recommender.github.io.git HEAD:main
```

`dist/` 디렉토리에서 새 git 레포를 초기화하고 빌드 결과물만 force push하는 방식이다. 배포 대상 레포의 히스토리는 매 배포마다 초기화되지만, 정적 파일만 있는 레포이므로 히스토리를 유지할 필요가 없다.

- `git init`: 빌드 결과물만 담긴 새 레포를 생성함. 소스 코드의 git 히스토리와 분리됨
- `x-access-token:${{ secrets.FRONTEND_DEPLOY_TOKEN }}`: PAT를 URL에 포함하여 인증함. GitHub Actions에서 다른 레포에 push할 때 표준적인 방법임
- `--force`: 매번 단일 커밋으로 덮어씀

## concurrency

```yaml
concurrency:
  group: deploy-frontend
  cancel-in-progress: true
```

백엔드는 `cancel-in-progress: false`로 진행 중인 배포를 끝까지 완료시키지만, 프론트엔드는 `true`로 설정했다.

| | 백엔드 | 프론트엔드 |
|---|---|---|
| `cancel-in-progress` | `false` | `true` |
| 이유 | 배포 도중 취소 시 서비스 불안정 | 정적 파일 교체라 중간 상태 없음 |

백엔드는 Docker 컨테이너를 pull하고 재시작하는 과정이라 중간에 취소되면 서비스가 불안정해질 수 있다. 반면 프론트엔드는 git push가 성공하거나 실패하거나 둘 중 하나이므로, 이전 배포를 취소하고 최신 코드로 바로 배포하는 게 효율적이다.

# 결과

![프론트엔드 워크플로우 실행 결과](img/Screenshot%20from%202026-04-05%2013-09-52.png)

단일 job으로 빌드부터 배포까지 약 14초 만에 완료된다. 백엔드 파이프라인(test → build-and-push → deploy)과 달리 테스트 단계나 Docker 빌드가 없어서 빠르다.

![전체 워크플로우 목록](img/Screenshot%20from%202026-04-05%2013-10-01.png)

이제 `frontend/` 변경은 Frontend Deploy가, `backend/` 변경은 Backend CI/CD가 독립적으로 실행된다. 두 파이프라인은 트리거 경로도, concurrency 그룹도 분리되어 있어 서로 간섭하지 않는다.
