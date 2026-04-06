+++
date = '2026-03-31T17:52:06+09:00'
draft = false
title = 'GCE 서버 보안 강화'
categories = ['Project Cloud']
+++

# 배경

GCE에 서비스를 올리고 나면 공격 대상이 된다. 특히 free tier 인스턴스는 크립토 채굴기를 심으려는 자동화 봇의 타깃이 되기 쉽다. 실제로 fail2ban 설치 직후 확인했을 때 이미 SSH 로그인 실패 시도가 4건 잡혀 있었다.

공격 패턴은 대부분 다음과 같다:

```
1. 외부에 열린 포트 스캔 (22, 3389, 5432 등)
2. SSH 브루트포스로 서버 장악
3. 크립토 마이너 설치 → CPU 100% 점유
```

방어는 **GCP 네트워크**, **OS**, **Docker** 세 층으로 나눠서 진행함.

# GCP 방화벽 규칙 정리

## 개념

GCP 방화벽은 VPC 네트워크 레벨에서 동작하는 패킷 필터링 규칙이다. 인스턴스 OS에 도달하기 전에 트래픽을 차단하므로, OS 방화벽(iptables, ufw)보다 앞단에서 필터링된다.

- GCE 인스턴스 생성 시 기본 방화벽 규칙이 자동 생성됨
- 기본 규칙에는 불필요한 포트가 포함되어 있을 수 있음
- 로컬 PC에서 `gcloud` 명령어로 관리함 (SSH 접속 불필요)

## 기본 규칙 확인

```bash
gcloud compute firewall-rules list
```

```
NAME                    NETWORK  DIRECTION  PRIORITY  ALLOW                         DENY  DISABLED
allow-https             default  INGRESS    1000      tcp:80,tcp:443                      False
default-allow-http      default  INGRESS    1000      tcp:80                              False
default-allow-https     default  INGRESS    1000      tcp:443                             False
default-allow-icmp      default  INGRESS    65534     icmp                                False
default-allow-internal  default  INGRESS    65534     tcp:0-65535,udp:0-65535,icmp        False
default-allow-rdp       default  INGRESS    65534     tcp:3389                            False
default-allow-ssh       default  INGRESS    65534     tcp:22                              False
```

## 불필요한 규칙 삭제

- `default-allow-rdp` (3389) — Windows 원격 데스크톱 포트. 리눅스 서버에서는 필요 없고 공격 표면만 늘림
- `default-allow-http` — `allow-https` 규칙에서 이미 80, 443을 둘 다 허용하므로 중복

```bash
gcloud compute firewall-rules delete default-allow-rdp
gcloud compute firewall-rules delete default-allow-http
```

## 정리 후 최종 상태

| 규칙 | 포트 | 용도 |
|------|------|------|
| `allow-https` | 80, 443 | Caddy 리버스 프록시 (HTTP → HTTPS 리다이렉트 포함) |
| `default-allow-ssh` | 22 | SSH 접속 |
| `default-allow-icmp` | icmp | ping (네트워크 진단용) |
| `default-allow-internal` | 전체 | VPC 내부 인스턴스 간 통신 |

- postgres(5432), backend(8080), Docker API(2375/2376)는 외부에 열리지 않음
- `docker-compose.prod.yml`에서 postgres와 backend에 `ports` 매핑이 없으므로 Docker 내부 네트워크에서만 접근 가능

# SSH 보안 강화

## 개념

SSH 브루트포스는 가장 흔한 서버 공격 방식이다. 봇이 일반적인 사용자명(root, admin, ubuntu 등)과 비밀번호 조합을 자동으로 시도한다. 패스워드 인증을 완전히 차단하고 키 기반 인증만 허용하면 브루트포스 자체가 무의미해진다.

- **패스워드 인증**: 사용자명 + 비밀번호로 로그인. 브루트포스에 취약함
- **키 기반 인증**: 공개키/비밀키 쌍을 사용. 비밀키가 없으면 로그인 불가
- `gcloud compute ssh`로 접속하면 GCP가 SSH 키를 자동 관리하므로 키 기반 인증이 이미 설정되어 있음

## 설정

```bash
# SSH 설정 파일에서 패스워드 인증 비활성화
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# 설정 확인
cat /etc/ssh/sshd_config | grep PasswordAuthentication
# PasswordAuthentication no

# SSH 서비스 재시작 (Ubuntu는 sshd가 아닌 ssh)
sudo systemctl restart ssh
```

- 반드시 키 기반 인증으로 접속 가능한 상태에서 설정할 것
- 패스워드로만 접속하고 있었다면 설정 후 접속 불가능해짐

추가로 `/etc/ssh/sshd_config`에서 다음 항목도 확인하면 좋다:

```
PermitRootLogin no          # root 직접 로그인 차단
MaxAuthTries 3              # 인증 시도 횟수 제한
```

# fail2ban

## 개념

fail2ban은 로그 파일을 모니터링하여 반복적인 인증 실패를 감지하고, 해당 IP를 자동으로 차단하는 침입 방지 도구이다.

- **jail**: 감시 대상 서비스 단위. `[sshd]`는 SSH 서비스를 감시하는 jail임
- **filter**: 로그에서 실패를 감지하는 정규식 패턴
- **action**: 감지 시 수행할 동작 (기본값: iptables로 IP 차단)
- **bantime**: 차단 지속 시간
- **maxretry**: 차단까지 허용할 실패 횟수
- **findtime**: 이 시간 내에 maxretry만큼 실패하면 차단

패스워드 인증을 꺼도 fail2ban은 설치하는 것이 좋다. SSH 외에도 다른 서비스에 대한 브루트포스를 차단할 수 있고, 반복 실패 IP를 차단함으로써 로그 노이즈와 불필요한 리소스 소비를 줄여준다.

## 설치 및 설정

```bash
sudo apt update && sudo apt install -y fail2ban
```

```bash
sudo tee /etc/fail2ban/jail.local << 'EOF'
[sshd]
enabled = true
port = ssh
maxretry = 5
bantime = 3600
findtime = 600
EOF
```

| 설정 | 값 | 의미 |
|------|-----|------|
| `maxretry` | 5 | 5번 실패하면 차단 |
| `bantime` | 3600 | 1시간 동안 차단 |
| `findtime` | 600 | 10분 이내에 5번 실패 시 적용 |

```bash
sudo systemctl enable --now fail2ban
```

- `enable`은 부팅 시 자동 시작, `--now`는 즉시 시작

## 상태 확인

```bash
sudo fail2ban-client status sshd
```

```
Status for the jail: sshd
|- Filter
|  |- Currently failed: 1
|  |- Total failed:     4
|  `- Journal matches:  _SYSTEMD_UNIT=sshd.service + _COMM=sshd
`- Actions
   |- Currently banned: 0
   |- Total banned:     0
   `- Banned IP list:
```

- 설치 직후 이미 4건의 로그인 실패 시도가 감지됨
- 서버를 외부에 노출하면 자동화 봇이 즉시 SSH 접속을 시도한다는 것을 보여줌

# 자동 보안 업데이트

## 개념

`unattended-upgrades`는 Debian/Ubuntu에서 보안 패치를 자동으로 설치하는 도구이다. 커널 취약점, OpenSSH 취약점 등이 발견되었을 때 수동으로 업데이트하지 않아도 자동으로 패치됨.

- 기본적으로 보안 업데이트(`-security` 저장소)만 자동 설치
- 일반 패키지 업데이트는 포함되지 않으므로 기존 서비스가 깨질 위험이 낮음
- 서버를 직접 관리하는 경우 필수적인 설정

## 설치

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

- `dpkg-reconfigure`에서 `Yes`를 선택하면 활성화됨

# Docker 리소스 제한

## 개념

Docker 컨테이너에 CPU와 메모리 제한을 설정하면, 만약 컨테이너가 침해당하더라도 호스트 시스템의 리소스를 모두 점유할 수 없다. 채굴기가 설치되어도 CPU를 지정된 양 이상 사용할 수 없으므로 피해를 최소화할 수 있다.

- `cpus`: 사용 가능한 CPU 코어 수 (0.5 = 50%)
- `memory`: 최대 메모리 사용량. 초과 시 OOM Killer가 컨테이너를 종료시킴
- e2-micro는 vCPU 0.25(버스트 가능) + RAM 614MB이므로 제한값을 보수적으로 설정해야 함

## 설정

`docker-compose.prod.yml`에 `deploy.resources.limits`를 추가:

```yaml
services:
  postgres:
    # ...
    deploy:
      resources:
        limits:
          cpus: '0.3'
          memory: 256M

  backend:
    # ...
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 384M
```

| 서비스 | CPU | 메모리 | 비고 |
|--------|-----|--------|------|
| postgres | 0.3 | 256M | DB는 상대적으로 가벼움 |
| backend | 0.5 | 384M | JVM 힙(256MB) + 메타스페이스 등 오버헤드 |
| caddy | 제한 없음 | 제한 없음 | 리소스 사용이 극히 적음 (~20MB) |

- 합계(640MB)가 e2-micro RAM(614MB)보다 약간 큰데, swap(2GB)이 있으므로 문제없음
- 실 사용량은 제한값보다 낮으므로(backend ~327MB, postgres ~34MB) 일상적으로 swap을 쓰지 않음
- 메모리 부족이 발생하면 postgres를 192M으로 낮추면 됨

변경 후 재배포:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

# 보안 강화 요약

```
[인터넷]
   ↓
[GCP 방화벽] ← 22/80/443만 허용, RDP/불필요 포트 차단
   ↓
[GCE 인스턴스 OS]
   ├── SSH: 패스워드 인증 차단, 키 기반만 허용
   ├── fail2ban: 5회 실패 시 1시간 IP 차단
   └── unattended-upgrades: 보안 패치 자동 적용
   ↓
[Docker]
   ├── postgres: CPU 0.3 / 256M 제한, 외부 미노출
   ├── backend: CPU 0.5 / 384M 제한, 외부 미노출
   └── caddy: 80/443만 리슨, 리버스 프록시
```

| 계층 | 조치 | 방어 대상 |
|------|------|-----------|
| GCP 방화벽 | 필요 포트만 개방 | 포트 스캐닝, 불필요 서비스 노출 |
| SSH | 패스워드 인증 차단 | 브루트포스 공격 |
| fail2ban | 반복 실패 IP 차단 | 자동화 봇, 로그 노이즈 |
| unattended-upgrades | 보안 패치 자동 설치 | 알려진 취약점(CVE) |
| Docker 리소스 제한 | CPU/메모리 상한 | 채굴기, 리소스 고갈 공격 |
