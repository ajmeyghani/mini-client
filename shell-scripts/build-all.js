#!/usr/bin/env node
const shell = require('shelljs');
const command = `./shell-scripts/buildcss.js && ./shell-scripts/copy-index.js`;
if (shell.exec(command).code !== 0) {
  shell.echo('Error: failed to build.');
  shell.exit(1);
}
