#!/usr/bin/env node
const {run, str} = require('./util');
const dev = str(
  `./node_modules/.bin/concurrently`,
  `./shell-scripts/dev-css.js`,
  `./shell-scripts/start-dev-server.js`
);
run(dev, 'Couldnt start the dev tasks :(');
