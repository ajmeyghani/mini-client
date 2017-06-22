#!/usr/bin/env node
const path = require('path');
const {str, runTask} = require('../lib/common');
runTask(path.join('./tasks/prod/build-css.js'), 'Failed to build css');
runTask(path.join('./tasks/prod/copy-index.js'), 'Failed to copy.');
