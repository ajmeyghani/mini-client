#!/usr/bin/env node
const shell = require('shelljs');
const command = `./node_modules/.bin/concurrently "node shell-scripts/dev-css.js" "node shell-scripts/start-dev-server.js"`;
if (shell.exec(command).code !== 0) {
  shell.echo('Error: failed to run the scripts');
  shell.exit(1);
}
