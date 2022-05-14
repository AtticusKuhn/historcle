#!/bin/bash
NODE_ENV=production 
sudo yarn run build
sudo yarn run export
touch dist/.nojekyll
sudo chown -R "${USER:-$(id -un)}" .
git add dist
git commit -m "Initial dist subtree commit"
git subtree push --prefix dist origin gh-pages