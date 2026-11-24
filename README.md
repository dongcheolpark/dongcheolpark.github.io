# 박동철 포트폴리오와 기술 블로그

저장소 하나에서 두 앱을 관리합니다. 각 앱은 독립적으로 빌드합니다.

| 앱 | 소스 | GitHub Pages 경로 |
| --- | --- | --- |
| 포트폴리오 | `portfolio/` | `/`, `/work/<slug>/` |
| 기술 블로그 | `blog/` | `/blog/`, `/posts/<slug>` |

프로젝트 문구는 `portfolio/cases.mjs`에서, 블로그 글은 `blog/posts/`에서 관리합니다.

저장소 루트에서 아래 명령으로 앱을 각각 빌드하고 배포용 디렉터리를 만들 수 있습니다.

```sh
portfolio_output="$(mktemp -d)"
pages_output="$(mktemp -d)"
(cd portfolio && npm run build -- "$portfolio_output")
(cd blog && bun install --frozen-lockfile && bun run build)
bash scripts/assemble-pages.sh blog/out "$portfolio_output" "$pages_output"
```

GitHub Actions는 같은 방식으로 두 앱을 빌드하고 정적 결과물만 합쳐 배포합니다.
