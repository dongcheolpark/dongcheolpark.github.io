// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

const rehypeOptions = {
  theme: 'slack-dark',
  keepBackground: true,
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] });
