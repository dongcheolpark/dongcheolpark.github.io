#!/usr/bin/env bash
set -euo pipefail

blog_output="${1:?사용법: assemble-pages.sh <블로그 결과물> <포트폴리오 결과물> <출력 디렉터리>}"
portfolio_output="${2:?포트폴리오 결과물을 지정하세요.}"
destination="${3:?출력 디렉터리를 지정하세요.}"

test -f "$blog_output/blog.html"
test -f "$portfolio_output/index.html"
mkdir -p "$destination/blog"
cp -R "$blog_output/." "$destination/"
rm -f "$destination/index.txt"
mv "$destination/blog.html" "$destination/blog/index.html"
cp -R "$portfolio_output/." "$destination/"
