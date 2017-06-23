#!/usr/bin/env node
const path = require('path');
const {run, str} = require('./lib/utils');
run(`rm -rf dev-dist/js`);
const devScripts = `${path.join('./node_modules/.bin/rollup')} --watch true -c rollup.dev.js`;
run(devScripts);
