#!/usr/bin/env node
const {str, run} = require('./util');
const buildSteps = [
  `./shell-scripts/buildcss.js`,
  `&&`,
  `./shell-scripts/copy-index.js`
];
run(str(...buildSteps), 'Failed to build.');
