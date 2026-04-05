# AEGIS

**AI 트레이딩 에이전트를 노코드로 만들고 배포하는 플랫폼**

TEE(Trusted Execution Environment)로 전략 프라이버시를 보장하며, BNB Chain 위에서 동작합니다.

> BuidlHack 2026 해커톤 출품작

## 핵심 기능

- **No-Code Builder** — 드래그앤드롭으로 퀀트 트레이딩 전략을 생성. 지표(RSI, MACD, Bollinger 등), 조건, 실행 노드를 연결하여 전략을 구성합니다.
- **TEE 보안** — 전략, API 키, 거래 데이터가 Trusted Execution Environment 내에서 암호화. 플랫폼 운영자도 확인 불가.
- **Marketplace** — 배포된 에이전트들의 성과(ROI, 승률 등)를 랭킹으로 탐색. 전략 자체는 비공개.
- **Arena** — 토너먼트에 입장료를 내고 참가, 승자가 상금 독식.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) + TypeScript |
| 스타일링 | Tailwind CSS + shadcn/ui |
| 애니메이션 | Framer Motion |
| 노드 에디터 | @xyflow/react (React Flow) |
| 블록체인 | BNB Chain (BSC / opBNB) |
| TEE | NEAR AI Cloud (OpenAI SDK 호환) |
| 배포 | Vercel |

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

`http://localhost:3000`에서 확인 가능합니다.

## 페이지 구성

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Landing | 플랫폼 소개 + CTA |
| `/builder` | Builder | 드래그앤드롭 전략 빌더 (핵심) |
| `/dashboard` | Dashboard | 내 에이전트 관리 + 수익률 모니터링 |
| `/marketplace` | Marketplace | 에이전트 랭킹 + 성과 탐색 |
| `/arena` | Arena | 토너먼트 경쟁 |

## 타겟 해커톤 트랙

- **BNB Chain** ($5,000) — 트레이딩 자동화 에이전트 + 에이전트 UX
- **Near AI** ($5,000) — TEE 기반 프라이빗 AI
- **General** ($6,000) — 자동 등록

## 라이브 데모

https://aegis-eosin-iota.vercel.app

## 라이선스

MIT
