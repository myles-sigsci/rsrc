#!/bin/sh

git add packages/website/out/
git commit -m "chore: build website for gh-pages"
git subtree push --prefix packages/website/out origin gh-pages
