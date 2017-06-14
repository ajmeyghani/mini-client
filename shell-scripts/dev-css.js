#!/usr/bin/env node
const path = require('path');
const {run, str} = require('./util');

const opts = {
  input: path.resolve(`dev/css/base/base.scss`),
  output: path.resolve(`dev/dev-dist/css`),
  nodeSass: path.resolve(`./node_modules/.bin/node-sass`),
};

const devCss = [
  opts.nodeSass,
   `--watch ${opts.input}`,
   ` -o ${opts.output} --source-map true`
];

run(str(...devCss), 'Couldnt start the watch css');
