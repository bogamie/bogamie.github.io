+++
date = '2026-03-28T20:15:48+09:00'
draft = false
title = 'GCE 배포 및 GitHub Pages 연동'
categories = ['Project Cloud']
+++

# 목표

```
[GitHub Pages (프론트엔드)]
  https://baekjoon-recommender.github.io
        ↓ https://baekjoonrec.duckdns.org/api
[GCE e2-micro]
  ├── Caddy (리버스 프록시, :80/:443, 자동 HTTPS)
  ├── backend (Spring Boot, :8080, 외부 미노출)
  └── postgres (:5432, 외부 미노출)
```

- GCE free tier에 백엔드 + DB 배포
- GitHub Pages에 프론트엔드 배포
- 도메인 구매 없이 서비스 제공

## Mixed Content 문제

브라우저는 HTTPS 페이지에서 HTTP 리소스를 로드하는 것을 **Mixed Content**로 분류하고 차단한다. 이는 HTTPS로 보호된 페이지의 보안을 HTTP 요청이 무력화할 수 있기 때문이다.

- **Active Mixed Content** (JS, CSS, fetch 등): 브라우저가 완전히 차단함. API 호출이 여기에 해당
- **Passive Mixed Content** (이미지, 오디오 등): 경고만 표시하고 로드는 허용하는 브라우저도 있음

GitHub Pages는 HTTPS로만 서빙되므로, 백엔드가 HTTP(`http://34.x.x.x:8080`)라면 프론트엔드에서 API를 호출할 수 없다. 따라서 백엔드도 HTTPS가 필요하다.

무료 해결책으로 DuckDNS(무료 서브도메인) + Caddy(자동 Let's Encrypt HTTPS)를 사용했다.

# DuckDNS 설정

## 개념

HTTPS 인증서(Let's Encrypt)를 발급받으려면 도메인이 필요하다. IP 주소만으로는 인증서를 발급받을 수 없음. DuckDNS는 무료 Dynamic DNS 서비스로, 서브도메인을 제공하여 IP 주소에 도메인을 매핑해준다.

- **DNS**: 도메인 이름을 IP 주소로 변환하는 시스템 (`baekjoonrec.duckdns.org` → `34.x.x.x`)
- **Dynamic DNS**: IP가 변경되어도 같은 도메인으로 접근할 수 있도록 자동 갱신하는 DNS. GCE 외부 IP는 고정이지만, 무료 도메인 제공이 목적
- **왜 DuckDNS인가**: 무료, 가입 간단, API로 IP 갱신 가능, Let's Encrypt와 호환

## 설정

1. [duckdns.org](https://www.duckdns.org) 가입 (GitHub/Google 계정으로 로그인)
2. 서브도메인 생성: `baekjoonrec` → `baekjoonrec.duckdns.org`
3. current ip에 GCE 외부 IP 입력

- 서브도메인 이름은 영문, 숫자, 하이픈만 사용 가능

# GCE 인스턴스 생성

## free tier 조건

- 리전: `us-west1`, `us-central1`, `us-east1` 중 하나
- 머신 타입: `e2-micro` (vCPU 0.25, 메모리 614MB)
- 디스크: 30GB 표준 영구 디스크
- 네트워크: 월 1GB 북미 외부 전송 무료

## 생성

1. Google Cloud Console → Compute Engine → VM 인스턴스 → 인스턴스 만들기
2. 설정:
    - 이름: `baekjoon-recommender`
    - 리전: `us-central1` (아이오와)
    - 머신 타입: `e2-micro`
    - 부팅 디스크: Ubuntu 24.04 LTS, 30GB 표준 영구 디스크
    - 방화벽: HTTP 트래픽 허용 체크
3. 만들기

## SSH 접속

```bash
gcloud compute ssh baekjoon-recommender --zone=us-central1-a
```

- 또는 콘솔에서 SSH 버튼 클릭

# Docker 설치

## Docker Engine

Ubuntu 기본 저장소의 `docker.io`에는 `docker-compose-plugin`이 포함되어 있지 않으므로, Docker 공식 저장소에서 설치해야 한다.

```bash
# 시스템에 설치된 구버전 제거
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do
  sudo apt-get remove -y $pkg
done

# 필수 패키지 설치
sudo apt-get update
sudo apt-get install -y ca-certificates curl

# Docker 공식 GPG 키 추가
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Docker 저장소 추가
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker 설치
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## sudo 없이 사용

```bash
sudo usermod -aG docker $USER
newgrp docker
```

## 확인

```bash
docker --version
docker compose version
```

# Swap 추가

## 개념

Swap은 디스크의 일부를 가상 메모리로 사용하는 기법이다. 물리 RAM이 부족할 때 OS가 사용 빈도가 낮은 메모리 페이지를 디스크로 옮겨(swap out) RAM 공간을 확보한다.

- RAM보다 느리지만(디스크 I/O), OOM(Out of Memory)으로 프로세스가 강제 종료되는 것을 방지함
- 리눅스에서는 swapfile 또는 swap 파티션으로 구성 가능
- e2-micro처럼 RAM이 적은 환경에서는 사실상 필수

e2-micro는 614MB RAM이므로 Spring Boot + PostgreSQL + Caddy를 함께 돌리면 메모리가 부족할 수 있다. 30GB 디스크 여유가 있으므로 swap을 2GB로 설정했다.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 영구 적용
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

# 방화벽 규칙

Caddy가 80/443 포트로 요청을 받아 백엔드로 프록시하므로, 80/443을 개방한다. 백엔드 8080 포트는 Docker 내부 네트워크에서만 접근 가능하므로 외부에 노출하지 않는다.

```bash
gcloud compute firewall-rules create allow-https \
  --allow=tcp:80,tcp:443 \
  --target-tags=http-server
```

인스턴스 생성 시 "HTTP 트래픽 허용"을 체크했다면 `http-server` 태그가 이미 붙어 있다. 아니라면 수동으로 추가:

```bash
gcloud compute instances add-tags baekjoon-recommender \
  --tags=http-server --zone=us-central1-a
```

# 프로젝트 배포

## 환경 변수 설정

```bash
cp .env.prod.example .env.prod
nano .env.prod
```

```bash
DB_USERNAME=app
DB_PASSWORD=<openssl rand -base64 48 결과>
JWT_SECRET=<openssl rand -base64 48 결과>
ALLOWED_ORIGINS=https://baekjoon-recommender.github.io
MAIL_USERNAME=<gmail 주소>
MAIL_APP_PASSWORD=<앱 비밀번호 (공백 제거하여 붙여쓰기)>
```

- `DB_PASSWORD`, `JWT_SECRET` 모두 `openssl rand -base64 48`로 생성
- `ALLOWED_ORIGINS`에 GitHub Pages 도메인을 설정
- Gmail 앱 비밀번호는 4자리씩 공백으로 구분되어 있는데, 공백을 제거하고 붙여서 입력

## 실행

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

- 최초 실행 시 이미지 빌드에 시간이 걸림
- e2-micro에서 Gradle 빌드는 메모리 제한으로 느릴 수 있음 (swap으로 OOM 방지)

## 상태 확인

```bash
# 컨테이너 상태
docker compose -f docker-compose.prod.yml --env-file .env.prod ps

# 로그 확인
docker compose -f docker-compose.prod.yml logs -f backend

# health check (Caddy를 통해 확인)
curl http://localhost/actuator/health
```

- `{"status":"UP"}`이 나오면 정상
- backend는 Docker 내부 네트워크에서만 접근 가능하므로 `localhost:8080`이 아닌 `localhost`(Caddy 프록시)로 확인
- 외부에서 확인: `curl https://baekjoonrec.duckdns.org/actuator/health`
- `--env-file .env.prod`를 빼면 환경 변수 미설정 경고(WARN)가 나오지만, 컨테이너 실행에는 영향 없음

# GitHub Pages 배포 (프론트엔드)

## 빌드

```bash
cd frontend
VITE_API_URL=https://baekjoonrec.duckdns.org npm run build
```

- `VITE_API_URL`에 DuckDNS 도메인(HTTPS)을 지정하여 빌드
- 빌드 결과는 `dist/`에 생성됨

## SPA 404 처리

SPA(Single Page Application)는 클라이언트 사이드 라우팅을 사용한다. `/dashboard`로 접속하면 실제로 서버에 `/dashboard` 경로의 파일이 있는 게 아니라, JavaScript가 URL을 읽고 해당 컴포넌트를 렌더링하는 방식이다.

GitHub Pages는 정적 파일 서버이므로 `/dashboard`에 해당하는 파일이 없으면 404를 반환한다. GitHub Pages는 `404.html`이 존재하면 404 응답 시 이 파일을 보여주는데, `index.html`을 `404.html`로 복사하면 모든 경로에서 SPA가 로드되어 클라이언트 라우팅이 동작한다.

```bash
cp dist/index.html dist/404.html
```

## GitHub Pages 저장소에 push

`<org>.github.io` 저장소에 빌드 결과물을 push한다.

```bash
cd /tmp
git clone https://github.com/baekjoon-recommender/baekjoon-recommender.github.io.git
cd baekjoon-recommender.github.io

# 기존 파일 제거 후 빌드 결과 복사
rm -rf *
cp -r ~/Github/baekjoon-recommender/frontend/dist/* .

git add .
git commit -m "Deploy frontend"
git push
```

- `https://baekjoon-recommender.github.io`로 접속 가능

# CORS 설정

## 개념

브라우저는 **동일 출처 정책**(Same-Origin Policy)에 따라, 현재 페이지와 다른 출처(프로토콜 + 도메인 + 포트)로의 요청을 기본적으로 차단한다. 이는 악성 사이트가 사용자의 인증 정보를 이용해 다른 서비스에 요청을 보내는 것을 방지하기 위한 보안 정책이다.

**CORS**(Cross-Origin Resource Sharing)는 서버가 "이 출처에서 오는 요청은 허용한다"고 명시적으로 선언하는 메커니즘이다. 서버가 응답 헤더에 `Access-Control-Allow-Origin`을 포함하면 브라우저가 해당 출처의 요청을 허용한다.

이 프로젝트에서는 프론트엔드(`https://baekjoon-recommender.github.io`)와 백엔드(`https://baekjoonrec.duckdns.org`)의 출처가 다르므로 CORS 설정이 필수다. `.env.prod`의 `ALLOWED_ORIGINS`에 GitHub Pages 도메인을 설정해야 한다.

```bash
ALLOWED_ORIGINS=https://baekjoon-recommender.github.io
```

- 백엔드 `SecurityConfig`에서 이 값을 읽어 CORS를 허용함
- 설정 변경 후 백엔드 재시작 필요:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --force-recreate backend
```

# 배포 확인

1. `https://baekjoon-recommender.github.io`에서 프론트엔드 로딩 확인
2. 회원가입/로그인 시 `https://baekjoonrec.duckdns.org/api/auth/*`로 요청이 나가는지 브라우저 네트워크 탭에서 확인
3. CORS 에러 없이 응답이 오는지 확인
4. 대시보드, 추천 페이지 정상 동작 확인

# e2-micro 메모리 제약

- e2-micro는 614MB RAM이므로 Spring Boot + PostgreSQL + Caddy를 함께 돌리면 빡빡함
- 빌드 시 Gradle이 메모리를 많이 사용하므로 GCE에서 직접 빌드하면 OOM이 발생할 수 있음

## 로컬에서 이미지 빌드 후 전송

GCE에서 직접 `docker compose build`를 실행하면 Gradle 빌드 과정에서 의존성 다운로드 + 컴파일에 대량의 메모리를 소비한다. e2-micro(614MB RAM + 2GB swap)에서는 swap을 심하게 사용하게 되어 빌드가 극도로 느려지거나 OOM이 발생할 수 있다.

로컬에서 이미지를 빌드하고 `docker save/load`로 전송하면 GCE에서는 이미지를 로드만 하면 되므로 메모리 부담이 없다.

```bash
# 로컬에서 빌드
docker compose -f docker-compose.prod.yml build

# 이미지 저장
docker save baekjoon-recommender-backend | gzip > backend.tar.gz

# GCE로 전송
gcloud compute scp backend.tar.gz baekjoon-recommender:~ --zone=us-central1-a

# GCE에서 로드
docker load < backend.tar.gz
```

- GCE에서 빌드하지 않으므로 메모리 부담이 없음

# Troubleshooting

## 느린 API 응답

배포 후 회원가입 등의 API 요청이 느리게 느껴짐. 원인 진단을 진행함.

```bash
# 메모리 사용량 확인
free -h

# 컨테이너별 리소스 사용량
docker stats --no-stream
```

실제 확인 결과:

```
Mem:  955Mi total, 712Mi used, 109Mi free
Swap: 2.0Gi total, 272Mi used
```

```
backend:   326.8MiB (34.20%)
postgres:   33.57MiB (3.51%)
caddy:      20.34MiB (2.13%)
```

RAM을 거의 다 쓰고 swap까지 272MB나 사용 중이었음. swap은 디스크 I/O로 처리하므로 느릴 수밖에 없던 것.

### 원인: JVM 메모리 설정

Dockerfile에서 `-XX:MaxRAMPercentage=75.0`으로 설정되어 있었음. 시스템 전체 RAM의 75%(~716MB)를 JVM이 쓸 수 있게 되어 있어서, postgres/caddy/OS와 메모리를 경쟁하며 swap을 유발했음.

### 해결: JVM 힙 고정 + DB 커넥션 풀 축소

**Dockerfile** — JVM 힙을 256MB로 고정:

```dockerfile
ENTRYPOINT ["java", \
  "-Xmx256m", \
  "-Xms128m", \
  "-XX:+HeapDumpOnOutOfMemoryError", \
  "-XX:HeapDumpPath=/tmp/heapdump.hprof", \
  "-jar", "app.jar"]
```

**application-prod.yml** — HikariCP 커넥션 풀 축소:

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 5
      minimum-idle: 2
```

변경 후 재배포:

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```
