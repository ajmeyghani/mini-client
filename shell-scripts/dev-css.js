const shell = require('shelljs');
const command = `./node_modules/.bin/node-sass --watch dev/css/base/base.scss -o dev/dev-dist/css --source-map true`;
if (shell.exec(command).code !== 0) {
  shell.echo('Error: failed to run the watch on dev/css');
  shell.exit(1);
}
