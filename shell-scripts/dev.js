#!/usr/bin/env node
const path = require('path');
const {run, str} = require('./util');
const currently = path.resolve(`./node_modules/.bin/concurrently`);

const dev = str(
  currently,
  path.resolve(`./shell-scripts/dev-css.js`),
  path.resolve(`./shell-scripts/start-dev-server.js`)
);
run(dev, 'Couldnt start the dev tasks :(');
