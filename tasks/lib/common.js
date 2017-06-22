const Promise = require('bluebird');
const shell = require('shelljs');
const uuidV1 = require('uuid/v1');
const glob = require('glob');

function uuid() {
  return uuidV1().replace(/\-/g, '');
}

function str () {
  return Array.from(arguments).join(' ');
};

function run(cmdStr, err) {
  if (shell.exec(cmdStr).code !== 0) {
    shell.echo(err);
    shell.exit(1);
  }
}

function runTask(cmdStr, err) {
  if (shell.exec('node ' + cmdStr).code !== 0) {
    shell.echo(err);
    shell.exit(1);
  }
}

function runAsync(cmdStr, err) {
  return new Promise((r, j) => {
    const code = shell.exec(cmdStr).code;
    if (code !== 0) {
      return j(err);
    } else {
      r(code);
    }
  });
}

function globAsync(pattern, options) {
  return new Promise((r, j) => {
    options = options || {};
    glob(pattern, options, (err, files) => {
      if (err) {
        return j(err);
      }
      r(files);
    })
  });
}

module.exports = {
  str,
  run,
  runTask,
  runAsync,
  uuid,
  globAsync,
};
