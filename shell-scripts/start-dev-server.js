#!/usr/bin/env node
const path = require('path');
const {run} = require('./util');
const startDevServer = path.resolve(`dev/dev-server.js`);
run('node ' + startDevServer, 'Couldnt start the dev server :(');
