# AI Agent 세계 들여다 보기 — 경영자 AI 세미나 랜딩페이지

> 검색의 시대를 넘어, 에이전트 시대를 준비합니다.

## 프로젝트 개요

바톤터치 "클로버" 셀이 주관하는 경영자 대상 AI 세미나 **"AI Agent 세계 들여다 보기"** (2026-04-07 오후 6시)의 전환 중심 랜딩페이지입니다.

- **목적**: 세미나 홍보, 신청 유도, 문의 창구
- **대상**: 중소·중견기업 대표, COO, 임원 및 의사결정자
- **강사**: 에스유디자인㈜ 김길호 대표
- **장소**: 바이텍시스템 (경기 성남시 분당구 대왕판교로 660, B동 1102호)

---

## ✅ 완성된 기능

### 섹션 구성 (Hero → Footer 순)
| 섹션 | 설명 |
|------|------|
| **Hero** | 강렬한 헤드라인, 날짜·장소·강사 정보 칩, 신청 CTA (구글 폼 연결) |
| **Problem** | AI 도입 실패 원인 4가지 카드 |
| **Insight** | 검색 시대 vs. 에이전트 시대 타임라인 |
| **Value** | 참가자가 얻는 6가지 가치 + 핵심 인용구 |
| **Speaker** | 강사 프로필 (실제 사진 임베딩, bio, 태그) |
| **Audience** | 추천 대상 카드 4종 + 부적합 대상 안내 |
| **CTA** | 신청 버튼 (구글 폼), 문의 버튼 (모달), 날짜·장소 정보 |
| **Footer** | 브랜드, 링크, 네이버 지도, 이메일 문의 |

### 인터랙션
- 네이버 지도 연결 (Hero 칩, CTA 스트립, Footer — 3곳)
- 문의 모달 + 폼 제출 → DB 저장 (seminar_inquiries 테이블)
- 세미나 신청 → Google Form 직접 연결 (새 탭)
- 스크롤 애니메이션, Hero 파티클 캔버스, CTA 오브 캔버스
- 모바일 햄버거 메뉴
- 스크롤 시 활성 섹션 네비 하이라이트

---

## 📁 파일 구조

```
index.html          # 메인 랜딩페이지
css/style.css       # 전체 스타일 (반응형 포함)
js/main.js          # 인터랙션, 캔버스, 폼 제출 JS
images/speaker.jpg  # 강사 프로필 사진 (김길호 대표)
README.md
```

---

## 🔗 주요 링크 및 경로

| 항목 | 값 |
|------|-----|
| 진입점 | `index.html` |
| 신청 폼 | `https://docs.google.com/forms/d/e/1FAIpQLSfXRLAEyK6FY92VNTyTMs8V33RKP0490ZKsRkpFVwB1oqAbMg/viewform` |
| 문의 이메일 | `sudesigmgo@gmail.com` |
| 네이버 지도 | `https://map.naver.com/p/search/경기 성남시 분당구 대왕판교로 660` |

---

## 🗄️ 데이터 모델

### `seminar_inquiries` (문의 접수)
| 필드 | 타입 | 설명 |
|------|------|------|
| id | text | 자동 생성 UUID |
| name | text | 성함 |
| contact | text | 연락처 또는 이메일 |
| message | text | 문의 내용 |
| type | text | 'inquiry' |
| recipient | text | sudesigmgo@gmail.com |
| timestamp | datetime | 제출 시각 |
| event | text | 세미나명 |

### `seminar_applications` (신청 기록 — 현재 Google Form 사용)
신청은 Google Form으로 직접 연결됩니다.

---

## 📱 반응형 브레이크포인트

| 브레이크포인트 | 적용 내용 |
|----------------|-----------|
| `> 1024px` | 풀 데스크탑 레이아웃 |
| `≤ 1024px` | 태블릿: 2단 그리드 축소, 강사 이미지 조정 |
| `≤ 768px` | 모바일: 1단 레이아웃, 햄버거 메뉴, CTA 세로 배치 |
| `≤ 480px` | 소형 모바일: 폰트·패딩·간격 세밀 최적화 |

---

## 🎨 디자인 토큰

- **배경**: `#080c14` (black), `#0d1220` (dark), `#111827` (dark-2)
- **강조색**: `#c9a84c` (gold), `#e8c97a` (gold-light)
- **보조색**: `#4af4ff` (blue-neon)
- **폰트**: Noto Serif KR (헤드라인), Noto Sans KR (본문), Inter (영문)

---

## ⏳ 미구현 / 권장 추가 작업

- [ ] QR 코드 실제 생성 및 삽입 (Google Form URL 기반)
- [ ] 신청 완료 후 담당자 이메일 자동 발송 (서버 사이드 필요)
- [ ] 페이지 방문자 분석 (Google Analytics 등)
- [ ] OG 메타 태그 (og:image, og:title) 소셜 미리보기 이미지 추가
- [ ] 행사 후 아카이브 페이지 전환

---

## 🚀 배포

Publish 탭에서 원클릭으로 배포하세요.

---

© 2026 바톤터치 클로버 셀. All rights reserved.
