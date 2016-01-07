#!/usr/bin/env bash
set -xeuo pipefail

rm -rf dist && mkdir dist
cp index.html dist
exportjs iffy index.js > dist/index.js
uglifyjs dist/index.js -mc > dist/index.min.js
hashmark --cwd dist --rename --length 6 '*.js' '{dir}/{name}.{hash}{ext}' | \
  json -e 'this["index.js"] = this["index.min.js"]' | \
  replaceinfiles --silent --source 'dist/index.html' --dest-pattern '{dir}/{base}'
