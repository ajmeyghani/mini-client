#!/usr/bin/env node
const path = require('path');
const {str, run} = require('./util');
run(path.resolve(`./shell-scripts/buildcss.js`), `Failed to build css`);
run(path.resolve(`./shell-scripts/copy-index.js`), `Failed to copy.`);
