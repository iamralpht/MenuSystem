#!/bin/sh
npm run build
npm run build-min
echo "gzipped, the global build is:"
echo "`gzip -c dist/menusystem.min.js | wc -c` bytes"
