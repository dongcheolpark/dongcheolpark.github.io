import { cp, mkdir, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { cases } from './cases.mjs';
import { CasePage, HomePage } from './pages.jsx';

const destination = process.argv[2];
if (!destination) throw new Error('출력 디렉터리를 지정하세요.');

const output = resolve(destination);
const assets = join(output, 'portfolio-assets');
await mkdir(assets, { recursive: true });
await cp(new URL('./assets/site.css', import.meta.url), join(assets, 'site.css'));

const { outputs } = await Bun.build({
  entrypoints: [join(import.meta.dir, 'feedback.jsx')],
  outdir: assets,
  target: 'browser',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  naming: 'feedback-[hash].js',
  throw: true,
});
const feedbackScript = '/portfolio-assets/' + basename(outputs[0].path);

async function writePage(directory, page) {
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), '<!doctype html>\n' + renderToStaticMarkup(page));
}

await writePage(output, <HomePage />);
for (const item of cases) {
  await writePage(join(output, 'work', item.id), <CasePage item={item} feedbackScript={feedbackScript} />);
}
