#!/usr/bin/env node
const path = require('path');
const {str, run} = require('../lib/common');
run(path.join('./tasks/prod/build-css.js'), 'Failed to build css');
run(path.join('./tasks/prod/copy-index.js'), 'Failed to copy.');
