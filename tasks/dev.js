#!/usr/bin/env node
const path = require('path');
const {run, str} = require('./lib/utils');
const currently = path.join('./node_modules/.bin/concurrently');

const dev = str(
  currently,
  `"node ${path.join(`./tasks/watch-css.js`)}"`,
  `"node ${path.join(`./tasks/dev-server.js`)}"`
);
run(dev, `Couldn't start the dev server.`);
