#!/usr/bin/env node
const path = require('path');
const {run, str} = require('../lib/common');

const opts = {
  input: path.join('dev/css/base/base.scss'),
  output: path.join('dev/dev-dist/css'),
  nodeSass: path.join('./node_modules/.bin/node-sass'),
};

const devCss = [
  opts.nodeSass,
   `--watch ${opts.input}`,
   ` -o ${opts.output} --source-map true`
];

run(`echo "Watching SCSS files"`);
run(str(...devCss), `Couldn't start the watch to watch the scss files.`);
