import { cp, mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { cases } from './cases.mjs';

const destination = process.argv[2];
if (!destination) throw new Error('출력 디렉터리를 지정하세요.');
const output = resolve(destination);

const escape = (value) => value.replace(/[&<>"']/g, (char) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
);

function layout({ title, description, path = '/', content, home = false }) {
  const name = home ? '박동철 | 소프트웨어 엔지니어' : title + ' | 박동철';
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#ffffff">
  <title>${escape(name)}</title>
  <link rel="canonical" href="https://dongcheolpark.github.io${path}">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
  <link rel="stylesheet" href="/portfolio-assets/site.css">
</head>
<body>
  <a class="skip" href="#main">본문으로 건너뛰기</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="/">Portfolio</a>
      <nav aria-label="주 메뉴">
        <a href="/#work">프로젝트</a>
        <a href="/blog/">블로그</a>
        <a href="https://github.com/dongcheolpark">GitHub <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>
  <main id="main">${content}</main>
  <footer class="wrap footer">
    <a class="brand" href="/">박동철</a>
    <div><a href="mailto:dongcheolpark02@gmail.com">이메일 <span aria-hidden="true">↗</span></a>
    <a href="https://github.com/dongcheolpark">GitHub <span aria-hidden="true">↗</span></a></div>
  </footer>
</body>
</html>`;
}

function tags(items) {
  return `<ul class="tags" aria-label="사용 기술">${items.map((tag) => `<li>${escape(tag)}</li>`).join('')}</ul>`;
}

function card(item) {
  return `<article class="card">
    <div class="card-meta"><span>${escape(item.category)}</span><span>${escape(item.period)}</span></div>
    <h3><a href="/work/${item.id}/">${escape(item.title)}</a></h3>
    <p>${escape(item.summary)}</p>
    <div class="card-result">${escape(item.result)}</div>
    <div class="card-bottom">${tags(item.tags)}<span class="card-arrow" aria-hidden="true">↗</span></div>
  </article>`;
}

const home = layout({
  title: '박동철',
  description: '소프트웨어 엔지니어 박동철의 포트폴리오. 인증 통합, 상태 모델링, 개발 환경과 서비스 운영 개선 사례를 소개합니다.',
  home: true,
  content: `<section class="wrap hero" aria-labelledby="profile-title">
    <div class="hero-copy">
      <p class="eyebrow">소프트웨어 엔지니어</p>
      <h1 id="profile-title">박동철</h1>
      <p class="intro">React와 Ruby on Rails로 에듀테크 서비스를 개발·운영했습니다. 인증, 상태 관리, 성능 개선에서 마주한 제약과 설계 판단을 소개합니다.</p>
      <div class="actions"><a class="button primary" href="#work">프로젝트 보기 <span aria-hidden="true">↓</span></a><a class="button secondary" href="mailto:dongcheolpark02@gmail.com">이메일 <span aria-hidden="true">↗</span></a></div>
    </div>
    <div class="hero-panel">
      <div class="panel-heading"><span>경력</span><span>2023.01 – 2025.02</span></div>
      <p class="employer">프라이빗노트</p>
      <p class="employment">개발팀 · 산업기능요원</p>
      <dl class="hero-metrics">
        <div><dt>개발 서버 시작</dt><dd>60초 <span>→</span> 10초</dd></div>
        <div><dt>결제 내역 쿼리</dt><dd>4초 <span>→</span> 0.1초</dd></div>
      </dl>
    </div>
  </section>
  <section class="wrap projects" id="work" aria-labelledby="work-title">
    <div class="section-head"><h2 id="work-title">프로젝트</h2></div>
    <div class="project-grid">${cases.map(card).join('')}</div>
  </section>
  <aside class="wrap blog-link"><h2>기술 블로그</h2><a href="/blog/">글 목록 보기 <span aria-hidden="true">↗</span></a></aside>`,
});

const diagrams = {
  auth: `<figure class="figure">
    <div class="figure-title"><strong>공통 인증 모듈</strong><span>구조도</span></div>
    <div class="diagram">
      <div class="diagram-row"><span>실시간 수업</span><span>동영상 강의</span></div>
      <div class="diagram-arrow" aria-hidden="true">↓</div>
      <div class="diagram-node highlight">공통 인증 패키지<small>로그인 · 로그아웃 · 만료 · 갱신</small></div>
      <div class="diagram-arrow" aria-hidden="true">↕</div>
      <div class="diagram-node">상위 도메인 쿠키</div>
    </div>
    <figcaption>두 사이트가 같은 인증 규칙과 인증 정보를 사용합니다.</figcaption>
  </figure>`,
  feedback: `<section class="figure" aria-labelledby="demo-title">
    <div class="figure-title"><strong id="demo-title">상태 전이 데모</strong><span>가상 수업</span></div>
    <div class="demo" data-feedback-demo hidden>
      <p class="demo-intro">학생을 바꿔 피드백을 작성하고, 전체 미작성을 적용해 완료 항목이 유지되는지 확인할 수 있습니다.</p>
      <fieldset class="student-switch"><legend>학생 선택</legend><label><input type="radio" name="student" value="0" checked> 학생 A</label><label><input type="radio" name="student" value="1"> 학생 B</label></fieldset>
      <ul class="states" aria-label="학생 상태"></ul>
      <div class="demo-actions">
        <button type="button" data-action="start">작성 선택</button>
        <button type="button" data-action="skip">미작성 선택</button>
        <button type="button" data-action="skipAll">전체 미작성</button>
      </div>
      <div class="editor" hidden>
        <label for="feedback-text">피드백 내용</label>
        <textarea id="feedback-text" rows="4" aria-describedby="feedback-count"></textarea>
        <div class="editor-meta"><button type="button" data-action="fill">예시 채우기</button><span id="feedback-count">0 / 200자</span></div>
        <div class="demo-actions"><button class="save" type="button" data-action="save">저장</button></div>
      </div>
      <p class="demo-status" role="status"></p>
    </div>
    <noscript><p class="demo">상태 전이 데모를 이용하려면 JavaScript를 활성화하세요.</p></noscript>
    <script type="module" src="/portfolio-assets/feedback.mjs"></script>
  </section>`,
  operations: `<figure class="figure">
    <div class="figure-title"><strong>결제 조회 경로</strong><span>구조도</span></div>
    <div class="diagram">
      <div class="diagram-node"><small>변경 전 · 조회</small>결제 내역 요청 → 테이블 4개 조인</div>
      <div class="diagram-arrow" aria-hidden="true">↓</div>
      <div class="diagram-node highlight"><small>변경 후 · 결제</small>결제 시 조회용 컬럼 함께 저장</div>
      <div class="diagram-node"><small>변경 후 · 조회</small>결제 내역 요청 → 저장된 컬럼 읽기</div>
    </div>
    <figcaption>결제 시 갱신할 값이 늘어나는 대신, 반복 조회에서 조인을 줄였습니다.</figcaption>
  </figure>`,
};

function detail(item) {
  const metrics = item.metrics
    ? `<dl class="detail-metrics">${item.metrics.map(([label, value]) =>
        `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`
      ).join('')}</dl>`
    : '';
  return layout({
    title: item.title,
    description: item.summary,
    path: '/work/' + item.id + '/',
    content: `<article class="wrap detail">
      <a class="back" href="/#work"><span aria-hidden="true">←</span> 프로젝트 목록</a>
      <header class="detail-header">
        <p class="eyebrow">${escape(item.category)} · ${escape(item.period)}</p>
        <h1>${escape(item.title)}</h1>
        <p>${escape(item.summary)}</p>
        ${tags(item.tags)}
      </header>
      <section class="detail-section"><h2>문제와 제약</h2><p>${escape(item.problem)}</p></section>
      <section class="detail-section"><h2>설계 판단</h2>
        <div class="decisions">${item.decisions.map(([heading, body]) =>
          `<div><h3>${escape(heading)}</h3><p>${escape(body)}</p></div>`
        ).join('')}</div>
      </section>
      ${diagrams[item.id] ?? ''}
      <section class="detail-section outcome"><h2>결과</h2><p>${escape(item.outcome)}</p>${metrics}</section>
    </article>`,
  });
}

await mkdir(output, { recursive: true });
await cp(new URL('./assets/', import.meta.url), join(output, 'portfolio-assets'), { recursive: true });
await writeFile(join(output, 'index.html'), home);
for (const item of cases) {
  const directory = join(output, 'work', item.id);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), detail(item));
}
