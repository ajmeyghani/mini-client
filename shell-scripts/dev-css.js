#!/usr/bin/env node
const {run, str} = require('./util');

const opts = {
  input: `dev/css/base/base.scss`,
  output: `dev/dev-dist/css`
};

const devCss = [
  `./node_modules/.bin/node-sass`,
   `--watch ${opts.input}`,
   ` -o ${opts.output} --source-map true`
];

run(str(...devCss), 'Couldnt start the watch css');
