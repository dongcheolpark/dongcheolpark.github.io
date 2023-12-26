// app/page.tsx
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import { EmailIcon, GithubIcon, MdiLinkedin } from './components/icons';

import './page.scss';

function PostCard(post: Post) {
  return (
    <a href={post.url} className="text-blue-700 hover:text-blue-900">
      <div className="mb-8 postCard">
        <h2 className="text-xl">{post.title}</h2>
        <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <div className="text-sm">{post.description}</div>
      </div>
    </a>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="mx-auto max-w-xl py-8">
      <div className="mb-8 bb-1">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-4xl">
          🛠️dongcheolpark&#39;s blog
        </h1>
        <p>
          평소에 생각하고 고민했던 내용들을 공유합니다.
          <br />
          최근에는 코드 리뷰, 타입 시스템에 관심이 많습니다.
        </p>
        <div className="link-box">
          <a href="mailto:dongcheolpark02@gmail.com">
            <EmailIcon width="1.3rem" height="1.3rem" />
          </a>
          <a href="https://github.com/dongcheolpark">
            <GithubIcon width="1.3rem" height="1.3rem" />
          </a>
          <a href="https://www.linkedin.com/in/%EB%8F%99%EC%B2%A0-%EB%B0%95-51a99829a/">
            <MdiLinkedin width="1.3rem" height="1.3rem" />
          </a>
        </div>
      </div>
      <div className="mb-8 flex items-end gap-2">
        <h2 className="font-bold tracking-tight md:text-3xl">All Posts</h2>
        <span className="font-bold">({posts.length})</span>
      </div>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
