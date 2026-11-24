import './styles/global.scss';
import './styles/_global.css';
import './layout.scss';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "dongcheolpark's blog",
  description: '박동철의 기술 블로그',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="mainNav">
          <div className="innerWrapper">
            <a className="logo" href="/blog/">Blog</a>
            <nav aria-label="주 메뉴">
              <a href="/">포트폴리오</a>
              <a href="https://github.com/dongcheolpark" target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </header>
        <div className="px-5 sm:px-8">{children}</div>
      </body>
    </html>
  );
}
