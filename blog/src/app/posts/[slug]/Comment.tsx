'use client';

import Giscus from '@giscus/react';

export default function Comment() {
  return (
    <Giscus
      repo="dongcheolpark/dongcheolpark.github.io"
      repoId="R_kgDOKFhvaA"
      category="General"
      categoryId="DIC_kwDOKFhvaM4Cb9rV"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="ko"
      loading="lazy"
    ></Giscus>
  );
}
