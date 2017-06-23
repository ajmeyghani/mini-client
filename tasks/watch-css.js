#!/usr/bin/env node
const path = require('path');
const {run, str} = require('./lib/utils');

const opts = {
  input: path.join('css/main.scss'),
  output: path.join('dev-dist/css'),
  nodeSass: path.join('./node_modules/.bin/node-sass'),
};

const watchCss = [
  opts.nodeSass,
   `--watch ${opts.input}`,
   ` -o ${opts.output} --source-map true`
];

const devCss = [
  opts.nodeSass,
   `${opts.input}`,
   ` -o ${opts.output} --source-map true`
];

run(`echo "Watching SCSS files"`);
run(`rm -rf ${opts.output}/*`);
run(str(...devCss));
run(str(...watchCss), `Couldn't start the watch to watch the scss files.`);
