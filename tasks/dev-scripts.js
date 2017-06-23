#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const {run, str} = require('./lib/utils');
fs.removeSync('dev-dist/js');
const devScripts = `${path.join('./node_modules/.bin/rollup')} --watch true -c rollup.dev.js`;
run(devScripts);
