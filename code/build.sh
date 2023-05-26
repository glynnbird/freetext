#!/bin/bash
# -p @rollup/plugin-terser 
npx rollup --format=es --file=dist/post_docs.js -- post_docs.js
npx rollup --format=es --file=dist/search.js -- search.js
# npx rollup -p @rollup/plugin-terser --format=es --file=dist/delete_todo.js -- delete_todo.js
# npx rollup -p @rollup/plugin-terser --format=es --file=dist/get_todo.js -- get_todo.js
# npx rollup --format=es --file=dist/get.js -- get.js
# npx rollup --format=es --file=dist/delete.js -- delete.js
# npx rollup --format=es --file=dist/list.js -- list.js
# npx rollup --format=es --file=dist/query_network.js -- query_network.js
# npx rollup --format=es --file=dist/query_date.js -- query_date.js
# npx rollup --format=es --file=dist/router.js -- router.js