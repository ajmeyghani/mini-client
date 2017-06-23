#!/usr/bin/env node
const path = require('path');
const {run, str} = require('./lib/utils');
const sync = path.join('./node_modules/.bin/browser-sync') + " start -s --port 9989 --logLevel 'info' --no-notify  --no-open --files '**/*, !.DS_Store, !css/**, !js/**, !tasks/**, !.git/**, !node_modules/**, !bower_components/**'";
run(sync);
