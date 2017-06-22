#!/usr/bin/env node
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const {str, run, uuid, runAsync, globAsync} = require('../lib/common');

const opts = {
  input: path.join('dev/css/base/'),
  output: path.join('dist/css/'),
  uuid: uuid(),
  nodeSass: path.join('./node_modules/.bin/node-sass'),
};

/* css build helpers */
function buildCss() {
  const build = str(
    opts.nodeSass,
    '--output-style compressed',
    '--source-map true',
    '--recursive',
    '--output', opts.output,
    opts.input
  );
  return runAsync(build, 'Error building the css.');
}

const move = (f, u) => {
  return new Promise((r, j) => {
    fs.move(f, u).then(x => r({
      filepath: f,
      hashedPath: u,
      uuid: opts.uuid,
      filename: f.split('/').pop(),
      hashedFilename: u.split('/').pop()
    })).catch(e => j(e));
  });
};
const uuidFile = f => f.replace('.css', opts.uuid + '.css');

/* replace file names file uuid values
  and also replace the path inside the css
  file to point to the right map file.
*/
fs.remove(opts.output)
.then(() => fs.mkdirp(opts.output))
.then(() => buildCss())
.then(() => globAsync(`${opts.output}*`))
.then(files => files.map(f => move(f, uuidFile(f))))
.then(ps => Promise.all(ps))
.then(rs => rs.map(fo => {
  const isCssfile = /\.css$/.test(fo.filename);
  if(isCssfile) {
    return fs.readFile(fo.hashedPath, 'utf-8')
    .then(content => {
      const newContent = content.replace(
        `sourceMappingURL=${fo.filename}.map`,
        `sourceMappingURL=${fo.hashedFilename}.map`
      );
      return fs.writeFile(fo.hashedPath, newContent);
    });
  }
  return new Promise((r) => r('not css file'));
}))
.then(ps => Promise.all(ps))
.then(d => console.log('Done building css.'))
.catch(r => console.log(e));
