#!/bin/bash
NODE_ENV=production 
yarn run build
yarn run export
touch dist/.nojekyll
git add dist
git commit -m "Initial dist subtree commit"
git subtree push --prefix dist origin gh-pages