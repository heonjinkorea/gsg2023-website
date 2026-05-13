# ㈜공생계 공식 웹사이트

도시계획 전문기업 ㈜공생계의 공식 웹사이트 소스코드입니다.

## 폴더 구조

```
site/
├── index.html        ← 메인 페이지 (모든 섹션)
├── css/style.css     ← 스타일시트
├── js/main.js        ← 자바스크립트
├── images/           ← 사용 이미지
│   └── _pdf/         ← (원본 PDF에서 추출한 백업 이미지, git 제외)
├── favicon.svg       ← 사이트 아이콘
├── robots.txt        ← 검색엔진 설정
├── netlify.toml      ← Netlify 배포 설정
└── .gitignore        ← Git 제외 파일 목록
```

## 로컬에서 미리보기

### 1. 그냥 더블클릭 (가장 간단)

`index.html` 파일을 더블클릭하면 브라우저에서 바로 열립니다.

### 2. 로컬 서버로 보기 (지도 등 일부 기능을 정확히 확인하려면 권장)

명령 프롬프트(cmd) 또는 PowerShell을 열어서:

```bash
cd D:\Choice\gsg2023\site
python -m http.server 8000
```

브라우저에서 [http://localhost:8000](http://localhost:8000) 접속.

## 콘텐츠 수정 가이드

| 수정 위치 | 파일 |
|---|---|
| 전화/이메일/주소 | `index.html` 안의 `CONTACT` 섹션 |
| 회사 소개/연혁/조직도 | `index.html` 안의 `ABOUT US` 섹션 |
| 대표 인사말 | `index.html` 안의 `CEO` 섹션 |
| 프로젝트 목록 | `index.html` 안의 `PROJECT` 섹션 (`.project-card` 추가/수정) |
| 색상/폰트 | `css/style.css` 맨 위의 `:root` 변수 |

## 배포 (Netlify)

1. GitHub 저장소에 코드 푸시
2. Netlify에서 GitHub 저장소 연결
3. Publish directory: `.` (또는 `site/` — 폴더 구조에 따라)
4. Deploy 클릭

상세 절차는 `../README-DEPLOY.md` 참조.
