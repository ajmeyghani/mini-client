const Promise = require('bluebird');
const uuidV1 = require('uuid/v1');
const glob = require('glob');

function uuid() {
  return uuidV1().replace(/\-/g, '');
}

function isRoot() {
  return new Promise((r, j) => {
    glob('package.json', (err, package) => {
      if (err) {
        return j(err);
      }
      r(Boolean(package.length));
    });
  });
}

module.exports = {
  uuid,
  isRoot,
};
