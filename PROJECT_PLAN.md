# AEGIS — 프로젝트 기획서

## 한줄 요약
AI 트레이딩 에이전트를 노코드로 만들고 배포하는 플랫폼. TEE로 전략 프라이버시 보장.

## 핵심 컨셉
- 사용자가 드래그앤드롭 + 수치 조정으로 퀀트 트레이딩 에이전트를 만든다
- 만든 에이전트를 온체인에 배포한다
- 전략 데이터는 TEE(Trusted Execution Environment)로 암호화 — 본인 외 누구도 볼 수 없음
- 배포된 에이전트들의 성과를 Marketplace에서 열람 가능 (전략 자체는 비공개)
- Arena에서 토너먼트 경쟁 (입장료 → 승자 독식)

---

## 페이지 구성

### 1. Landing
**히어로 섹션**
- 헤드라인 (예: "Build & Deploy AI Trading Agents Privately")
- 서브 텍스트 (플랫폼 설명 1~2줄)
- CTA 버튼: "Build Your Agent"
- 배경: 그리드 패턴 + 글로우 오브

**기능 소개 섹션 (4개 카드)**
- No-Code Builder — 드래그앤드롭으로 전략 생성
- TEE Security — 전략 완전 비공개
- Marketplace — 에이전트 성과 탐색 + 랭킹
- Arena — 토너먼트 경쟁

**기술 스택 뱃지**
- BNB Chain, NEAR AI TEE, opBNB

### 2. Builder (핵심 페이지)
**캔버스 (풀스크린에 가깝게)**
- 드래그앤드롭 노드 에디터
- 노드 추가: 플로팅 "+" 버튼 → 카테고리별 노드 목록 팝업
- 노드 클릭 시 → 팝오버로 수치 조정 (슬라이더, 인풋, 드롭다운)
- 모든 파라미터에 기본값 제공

**노드 종류:**
- Trigger: Price Feed (타임프레임 설정), Time Trigger, On-Chain Event
- Indicator (Tier 1): MA(SMA/EMA), RSI, MACD, Bollinger Bands, Volume
- Indicator (Tier 2, 후순위): Stochastic, ATR, VWAP
- Condition: Crosses Above/Below, Is Above/Below, AND/OR 게이트, Threshold
- Action: Market Buy/Sell, Limit Order, Stop Loss, Take Profit, Trailing Stop
- Risk: Max Position Size, Max Drawdown, Cooldown

**툴바:**
- 전략 이름 (편집 가능)
- 페어 선택 드롭다운
- 타임프레임 (1m~1d)
- Undo/Redo
- Backtest (가장 눈에 띄는 버튼)
- Deploy (배포 스텝 시작)
- Save

**배포 플로우 (한 페이지 내 오버레이/모달):**
전략 완성 → 백테스트 → 지갑 연결 → 배포 확인 → 완료

### 3. Dashboard
**상단 — 요약 카드 (3~4개)**
- 총 포트폴리오 가치
- 전체 수익률 (%)
- 활성 에이전트 수
- 24시간 P&L

**중앙 — 내 에이전트 목록 (테이블)**
- 에이전트 이름
- 거래쌍
- 상태 (Running / Paused / Stopped)
- 수익률
- 트레이드 수
- TEE 암호화 상태 뱃지
- 일시정지/재시작 버튼

**하단 — 최근 거래 내역**
- 시간, 페어, 매수/매도, 가격, 수량

### 4. Marketplace
**상단 — 검색 + 필터바**
- 검색창 (에이전트 이름)
- 필터: 운용 기간, 거래쌍, ROI 범위
- 정렬: ROI (기본), 승률, 트레이드 수, 운용 기간

**메인 — 에이전트 랭킹 테이블**
- 순위
- 에이전트 이름
- 제작자 (지갑 주소 축약)
- 거래쌍
- ROI (%)
- 승률
- 트레이드 수
- 운용 기간
- 미니 스파크라인 차트
- TEE 뱃지

전략 내용은 비공개 — 성과 숫자만 보이는 구조.

### 5. Arena
**상단 — 현재 토너먼트 정보**
- 토너먼트 이름
- 기간 (시작일 ~ 종료일)
- 입장료
- 총 상금 풀
- 참가자 수
- 남은 시간

**메인 — 토너먼트 참가자 랭킹 테이블**
- 순위
- 에이전트 이름
- 제작자
- ROI (기본 정렬)
- P&L
- 트레이드 수
- 미니 스파크라인

**하단**
- 참가 버튼 (입장료 표시)
- 과거 토너먼트 결과 목록 (우승자, 상금 등)

---

## 네비게이션 구조

### 진입 플로우
```
Landing → 지갑 연결 → Builder (기본 진입)
```

### 사이드바 (앱 진입 후)
```
Builder (기본) → Dashboard → Marketplace → Arena
```

### 핵심 사용자 플로우
```
Builder에서 만든다 → 배포한다 → Dashboard에서 관리한다 → Marketplace에 노출 → Arena에서 경쟁
```

---

## 디자인 가이드라인

### 기본 톤
- **테마**: 다크 전용
- **스타일**: 네온 사이버펑크 (dYdX + Jupiter 감성)
- **배경**: 딥 블랙 (#09090b), 카드: #0f0f12, Builder 캔버스: #0a0b14 (미세한 블루틴트)
- **액센트**: 시안(#06b6d4) + 퍼플(#8b5cf6) 그라디언트 메인, 에메랄드(#10b981)는 수익/긍정, 로즈(#ef4444)는 손실
- **폰트**: Inter (본문) + Geist Mono (숫자/금융 데이터)

### 이중 밀도 전략
- **시원한 페이지** (Landing, Builder): 넉넉한 여백, 48px+ 섹션 간격, Linear/Vercel 수준
- **데이터 페이지** (Dashboard, Marketplace, Arena): 높은 정보 밀도, 타이트한 테이블 행, DefiLlama/DexScreener 수준

### 카드 디자인
- 글래스모피즘: backdrop-filter blur(12px), 반투명 배경, 보더 5~10% opacity
- 모서리: 12~16px radius
- 글로우 이펙트: 호버/활성 상태에서만 (시안/퍼플)
- 그라디언트 보더: 중요 카드/프리미엄 요소에만

### 애니메이션 원칙
- Linear 수준의 절제 — 과하지 않게
- 페이지 전환: fade + 약간의 upward slide (0.3s ease-out)
- 숫자 카운트업: 대시보드 통계에 적용
- 라이브 표시: 초록 펄스 점 (에이전트 상태)
- 호버: 미세한 scale(1.02) + 글로우

### 참고 사이트별 적용
- **dYdX**: 전체 컬러/톤, 라이브 상태 표시
- **Jupiter**: 그라디언트 배경, 글래스모피즘 카드
- **Linear**: 여백/타이포그래피/애니메이션 절제
- **n8n**: Builder 노드 에디터 캔버스
- **DefiLlama**: Marketplace 랭킹 테이블
- **DexScreener**: 미니 스파크라인 차트, 실시간 데이터 표시

---

## 타겟 해커톤 트랙

### BNB Chain ($5,000) — ✅ 적합
- 방향: ① 트레이딩 자동화 에이전트 + ② 에이전트 UX
- 필수: opBNB/BSC 스마트 컨트랙트 배포 + 2개 이상 성공 tx
- 필수: 데모 + 2~4분 영상 + 덱 + GitHub 공개 레포 + 트윗

### Near AI ($5,000) — ✅ 적합
- TEE 기반 프라이빗 AI
- NEAR AI Cloud TEE API 연동 필수 (OpenAI SDK 호환)
- 심사 핵심: "TEE가 아니면 불가능했던 것" 필연성

### YGG & Verse8 ($5,000) — ❌ 부적합
- Verse8 플랫폼에서 캐주얼 게임 빌드 필요
- 프로젝트 컨셉과 완전히 다른 제품

### Status Network ($5,000) — ❓ TBA
- 4/7 워크샵 후 확인

### General ($6,000) — ✅ 자동 등록
- 심사: Technicality, Originality, Practicality, Aesthetics, Wow Factor

---

## MVP에서 실제 동작 vs UI만

### 실제 동작 필요
- [ ] BNB Chain (opBNB/BSC) 스마트 컨트랙트 배포 + 2tx
- [ ] NEAR AI Cloud TEE API 연동 (전략 실행 시 TEE 거쳐야 함)
- [ ] 지갑 연결

### UI만 (데모용)
- [ ] Builder 드래그앤드롭 (시각적으로 동작하면 됨)
- [ ] Dashboard 수익률 (목데이터)
- [ ] Marketplace 랭킹 (목데이터)
- [ ] Arena 토너먼트 (목데이터)
- [ ] 배포 플로우 (UI 스텝만)

---

## 기술 스택
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (애니메이션)
- @xyflow/react (드래그앤드롭 노드 에디터)
- 지갑 연결: TBD (wagmi + RainbowKit 등)
- 온체인: BSC/opBNB (EVM 호환)
- TEE: NEAR AI Cloud API (OpenAI SDK 호환)
- 배포: Vercel

---

*마지막 수정: 2026-04-05*
