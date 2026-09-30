# IDEAS Lab Homepage

Integrated Design, Engineering & Automation for Systems — 서울대학교 조선해양공학과

순수 HTML/CSS 사이트로, 빌드 과정 없이 GitHub Pages에 올리면 바로 동작합니다.

## 배포 방법 (snu-ideas.github.io)

1. GitHub에서 Organization `snu-ideas`를 만듭니다 (프로필 메뉴 → Your organizations → New organization → Free).
2. 이 Organization 안에 저장소 `snu-ideas.github.io`를 **Public**으로 만듭니다.
3. 이 폴더의 파일 전체를 저장소 루트에 업로드합니다 (Add file → Upload files → 드래그 → Commit).
   - `index.html`이 저장소 최상위에 있어야 합니다.
4. Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)`로 설정합니다.
5. 1~2분 뒤 https://snu-ideas.github.io 에서 확인할 수 있습니다.

## 파일 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 홈 (소개, 연구 방향, 비전, 뉴스, 대표 연구) |
| `research.html` | 연구 분야와 대표 성과, 연구 계획 |
| `projects.html` | 진행 중 과제와 전체 과제 목록, 인력양성사업 |
| `publications.html` | 국제·국내 논문 (분야별 필터) |
| `people.html` | 교수 소개, 구성원, 학생 모집, 연락처 |
| `teaching.html` | 강의 과목 |
| `assets/style.css` | 공통 디자인 (색상은 맨 위 `:root`에서 변경) |
| `assets/img/` | 연구 그림 (발표 자료에서 발췌) |

## 올리기 전에 채워 넣을 것 (HTML 안에 `TODO`로 표시)

- `people.html`: 서울대 이메일, 연구실 위치(동·호수)
- `people.html`: 교수님 사진 → `assets/img/minjae-oh.jpg`로 넣고 주석 안내대로 교체
- 학생이 합류하면 `people.html`의 Members 섹션에 카드 추가 (예시 주석 있음)

## 자주 하는 수정

- **뉴스 추가**: `index.html`에서 `<ul class="news">` 안에 `<li><time>2026.10</time><span>내용</span></li>` 한 줄 추가
- **논문 추가**: `publications.html`의 해당 연도 `<ol class="pubs">` 안에 `<li data-a="ship">...</li>` 추가
  (`data-a`는 필터용 분야: `cagd`, `ship`, `ai`)
- 웹에서 파일을 열고 연필 아이콘(Edit)으로 수정한 뒤 Commit하면 1분 안에 반영됩니다.
