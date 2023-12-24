// app/page.tsx
import './page.scss';
import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';

function PostCard(post: Post) {
  return (
    <Link
      href={post.url}
      className="text-blue-700 hover:text-blue-900"
      legacyBehavior
    >
      <div className="mb-8 postCard">
        <h2 className="text-xl">{post.title}</h2>
        <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <div className="text-sm">{post.description}</div>
      </div>
    </Link>
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
          🛠️donngcheolpark&#39;s blog
        </h1>
        <p>
          평소에 생각하고 고민했던 내용들을 공유합니다.
          <br />
          최근에는 코드 리뷰, 타입 시스템에 관심을 가지고 있습니다.
        </p>
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
