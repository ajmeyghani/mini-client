#!/usr/bin/env node
const {run} = require('./util');
const startDevServer = `(cd dev && node dev-server.js)`;
run(startDevServer, 'Couldnt start the dev server :(');
