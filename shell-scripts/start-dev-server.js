const shell = require('shelljs');
const command = `(cd dev && node dev-server.js)`;
if (shell.exec(command).code !== 0) {
  shell.echo('Error: failed to start the server.');
  shell.exit(1);
}
