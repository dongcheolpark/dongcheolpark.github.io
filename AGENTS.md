# 작업 지침

## 소통

- 한국어로 간결하게 보고한다. 꾸미거나 과장하지 않고 중립적인 표현을 사용한다.
- 결과, 변경 사항, 검증 여부를 우선 전달한다.
- 요청 범위를 우선한다. 구조 파악 요청에는 임의로 글 주제나 기능을 추가하지 않는다.

## 프로젝트 구조

- 실제 애플리케이션은 `blog/`에 있다. 개발·빌드 명령은 해당 디렉터리에서 실행한다.
- Next.js App Router와 TypeScript를 사용하며, 정적 사이트로 내보낸다.
- `blog/posts/*.mdx`: 글 원본. Contentlayer가 읽어 페이지 데이터를 생성한다.
- `blog/contentlayer.config.ts`: 글 스키마, URL 생성, MDX 처리 설정.
- `blog/src/app/page.tsx`: 소개와 최신순 글 목록.
- `blog/src/app/layout.tsx`: 공통 레이아웃과 기본 메타데이터.
- `blog/src/app/posts/[slug]/page.tsx`: 글 상세, 정적 경로 생성, 글 제목 메타데이터, 읽기 시간.
- `blog/src/app/posts/[slug]/Comment.tsx`: Giscus 댓글. GitHub Discussions에 연동된다.
- `blog/src/app/components/`: 공통 컴포넌트.
- `blog/src/app/styles/` 및 각 페이지의 SCSS: 스타일. Tailwind CSS와 Typography 플러그인을 함께 사용한다.
- `blog/public/`: 정적 자산. 글 이미지는 `posts/글이름/` 아래에 둔다.
- `.github/workflows/nextjs.yml`: Bun으로 설치·빌드한 `blog/out`을 GitHub Pages에 배포한다. `main` 푸시와 수동 실행이 트리거다.

## 글 작성·수정

- MDX frontmatter에는 `title`, `date`, `description`이 필수다. 날짜는 `YYYY-MM-DD` 형식을 따른다.
- 파일명은 URL `/posts/파일명`이 된다. 기존 파일명을 바꾸면 링크와 경로 기반 댓글 연결에 영향을 줄 수 있다.
- 현재 상세 라우트는 `[slug]` 단일 경로다. 별도 라우팅 수정 없이 글을 하위 폴더로 분리하지 않는다.
- 이미지는 `/posts/글이름/파일명`으로 참조한다.
- 코드 블록에 언어를 지정한다. GFM과 rehype-pretty-code가 설정되어 있다.
- 원문의 의도와 작성자 관점을 유지한다. 경험이나 측정 결과를 임의로 만들어 넣지 않는다.
- 초안·태그·카테고리 필드는 현재 스키마에 없다. MDX 파일을 추가하면 글 목록과 정적 경로 생성 대상에 포함된다.

## 구현·검증

- 기존 코드와 스타일을 확인하고 필요한 범위만 수정한다.
- 정적 배포를 유지한다. 서버 런타임이 필요한 기능은 배포 방식과 함께 검토한다.
- `.next/`, `.contentlayer/`, `out/`, `node_modules/` 등 생성물을 직접 수정하거나 커밋하지 않는다.
- CI는 Bun을 사용하고 `blog/bun.lockb`가 있다. 의존성 변경 시 잠금 파일을 함께 관리하고 다른 패키지 관리자의 잠금 파일을 임의로 추가하지 않는다.
- `blog/package.json`의 명령: `bun run dev`, `bun run build`, `bun run start`, `bun run lint`.
- 정적 배포 결과 확인에는 빌드 후 `out/`을 제공하는 정적 서버를 사용한다.
- 글·코드 변경은 가능한 경우 `cd blog` 후 `bun run build`로 확인한다. 코드 변경 시 관련 린트도 확인한다.
- 문서 지침만 변경한 경우에는 내용과 diff 확인으로 검증한다.
- 의존성이나 실행 환경 문제로 검증하지 못하면 미검증 항목과 원인을 보고한다. 요청과 관계없는 업그레이드는 진행하지 않는다.

## Git

- 작업 전 상태를 확인하고 기존 사용자 변경을 보존한다.
- 요청에 해당하는 파일만 스테이징하고 커밋한다.
- 커밋·푸시는 사용자 요청이 있을 때 수행한다. `main`에 푸시하면 배포 워크플로가 실행된다.
- 강제 푸시나 이력 재작성은 명시적 요청 없이 수행하지 않는다.
