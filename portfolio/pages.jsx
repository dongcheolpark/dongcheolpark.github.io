import { cases } from './cases.mjs';

const origin = 'https://dongcheolpark.github.io';
const github = 'https://github.com/dongcheolpark';
const email = 'mailto:dongcheolpark02@gmail.com';

function Arrow({ children = '↗' }) {
  return <span aria-hidden="true">{children}</span>;
}

function Layout({ title, description, path, children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="theme-color" content="#ffffff" />
        <title>{title}</title>
        <link rel="canonical" href={origin + path} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        <link rel="stylesheet" href="/portfolio-assets/site.css" />
      </head>
      <body>
        <a className="skip" href="#main">본문으로 건너뛰기</a>
        <header className="site-header">
          <div className="wrap header-inner">
            <a className="brand" href="/">Portfolio</a>
            <nav aria-label="주 메뉴">
              <a href="/#work">프로젝트</a>
              <a href="/blog/">블로그</a>
              <a href={github}>GitHub <Arrow /></a>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="wrap footer">
          <a className="brand" href="/">박동철</a>
          <div>
            <a href={email}>이메일 <Arrow /></a>
            <a href={github}>GitHub <Arrow /></a>
          </div>
        </footer>
      </body>
    </html>
  );
}

function Tags({ items }) {
  return (
    <ul className="tags" aria-label="사용 기술">
      {items.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}

function ProjectCard({ item }) {
  return (
    <article className="card">
      <div className="card-meta"><span>{item.category}</span><span>{item.period}</span></div>
      <h3><a href={'/work/' + item.id + '/'}>{item.title}</a></h3>
      <p>{item.summary}</p>
      <div className="card-result">{item.result}</div>
      <div className="card-bottom">
        <Tags items={item.tags} />
        <span className="card-arrow" aria-hidden="true">↗</span>
      </div>
    </article>
  );
}

export function HomePage() {
  return (
    <Layout
      title="박동철 | 소프트웨어 엔지니어"
      description="소프트웨어 엔지니어 박동철의 포트폴리오. 인증 통합, 상태 모델링, 개발 환경과 서비스 운영 개선 사례를 소개합니다."
      path="/"
    >
      <section className="wrap hero" aria-labelledby="profile-title">
        <div className="hero-copy">
          <p className="eyebrow">소프트웨어 엔지니어</p>
          <h1 id="profile-title">박동철</h1>
          <p className="intro">
            React와 Ruby on Rails로 에듀테크 서비스를 개발·운영했습니다. 인증, 상태 관리, 성능 개선에서 마주한 제약과 설계 판단을 소개합니다.
          </p>
          <div className="actions">
            <a className="button primary" href="#work">프로젝트 보기 <Arrow>↓</Arrow></a>
            <a className="button secondary" href={email}>이메일 <Arrow /></a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-heading"><span>경력</span><span>2023.01 – 2025.02</span></div>
          <p className="employer">프라이빗노트</p>
          <p className="employment">개발팀 · 산업기능요원</p>
          <dl className="hero-metrics">
            <div><dt>개발 서버 시작</dt><dd>60초 <span>→</span> 10초</dd></div>
            <div><dt>결제 내역 쿼리</dt><dd>4초 <span>→</span> 0.1초</dd></div>
          </dl>
        </div>
      </section>
      <section className="wrap projects" id="work" aria-labelledby="work-title">
        <div className="section-head"><h2 id="work-title">프로젝트</h2></div>
        <div className="project-grid">
          {cases.map((item) => <ProjectCard key={item.id} item={item} />)}
        </div>
      </section>
      <aside className="wrap blog-link">
        <h2>기술 블로그</h2>
        <a href="/blog/">글 목록 보기 <Arrow /></a>
      </aside>
    </Layout>
  );
}

function StructureDiagram({ title, caption, children }) {
  return (
    <figure className="figure">
      <div className="figure-title"><strong>{title}</strong><span>구조도</span></div>
      <div className="diagram">{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function AuthDiagram() {
  return (
    <StructureDiagram title="공통 인증 모듈" caption="두 사이트가 같은 인증 규칙과 인증 정보를 사용합니다.">
      <div className="diagram-row"><span>실시간 수업</span><span>동영상 강의</span></div>
      <div className="diagram-arrow" aria-hidden="true">↓</div>
      <div className="diagram-node highlight">공통 인증 패키지<small>로그인 · 로그아웃 · 만료 · 갱신</small></div>
      <div className="diagram-arrow" aria-hidden="true">↕</div>
      <div className="diagram-node">상위 도메인 쿠키</div>
    </StructureDiagram>
  );
}

function OperationsDiagram() {
  return (
    <StructureDiagram title="결제 조회 경로" caption="결제 시 갱신할 값이 늘어나는 대신, 반복 조회에서 조인을 줄였습니다.">
      <div className="diagram-node"><small>변경 전 · 조회</small>결제 내역 요청 → 테이블 4개 조인</div>
      <div className="diagram-arrow" aria-hidden="true">↓</div>
      <div className="diagram-node highlight"><small>변경 후 · 결제</small>결제 시 조회용 컬럼 함께 저장</div>
      <div className="diagram-node"><small>변경 후 · 조회</small>결제 내역 요청 → 저장된 컬럼 읽기</div>
    </StructureDiagram>
  );
}

function FeedbackSection({ script }) {
  return (
    <section className="figure" aria-labelledby="demo-title">
      <div className="figure-title"><strong id="demo-title">상태 전이 데모</strong><span>가상 수업</span></div>
      <div id="feedback-demo" />
      <noscript><p className="demo">상태 전이 데모를 이용하려면 JavaScript를 활성화하세요.</p></noscript>
      <script type="module" src={script} />
    </section>
  );
}

const caseVisuals = {
  auth: AuthDiagram,
  feedback: FeedbackSection,
  operations: OperationsDiagram,
};

export function CasePage({ item, feedbackScript }) {
  const Visual = caseVisuals[item.id];
  return (
    <Layout
      title={item.title + ' | 박동철'}
      description={item.summary}
      path={'/work/' + item.id + '/'}
    >
      <article className="wrap detail">
        <a className="back" href="/#work"><Arrow>←</Arrow> 프로젝트 목록</a>
        <header className="detail-header">
          <p className="eyebrow">{item.category} · {item.period}</p>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          <Tags items={item.tags} />
        </header>
        <section className="detail-section"><h2>문제와 제약</h2><p>{item.problem}</p></section>
        <section className="detail-section">
          <h2>설계 판단</h2>
          <div className="decisions">
            {item.decisions.map(([heading, body]) => (
              <div key={heading}><h3>{heading}</h3><p>{body}</p></div>
            ))}
          </div>
        </section>
        {Visual && <Visual script={feedbackScript} />}
        <section className="detail-section outcome">
          <h2>결과</h2>
          <p>{item.outcome}</p>
          {item.metrics && (
            <dl className="detail-metrics">
              {item.metrics.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          )}
        </section>
      </article>
    </Layout>
  );
}
