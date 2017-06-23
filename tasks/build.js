#!/usr/bin/env node
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const {str, run, uuid, runAsync, globAsync} = require('./lib/utils');

const guid = uuid();
const dist = 'dist';

/*
 * scss -> css, replace uuid
 */
const cssOpts = {
  input: path.join('css/main.scss'),
  output: path.join(`${dist}/css/`),
  nodeSass: path.join('./node_modules/.bin/node-sass'),
};

function buildCss() {
  const build = str(
    cssOpts.nodeSass,
    '--output-style compressed',
    '--source-map true',
    '--recursive',
    '--output', cssOpts.output,
    cssOpts.input
  );
  return runAsync(build, 'Error building the css.');
}

const move = (f, u) => {
  return new Promise((r, j) => {
    fs.move(f, u).then(x => r({
      filepath: f,
      hashedPath: u,
      uuid: guid,
      filename: f.split('/').pop(),
      hashedFilename: u.split('/').pop()
    })).catch(e => j(e));
  });
};
const uuidFile = f => f.replace('.css', guid + '.css');

fs.remove(cssOpts.output)
.then(() => fs.mkdirp(cssOpts.output))
.then(() => buildCss())
.then(() => globAsync(`${cssOpts.output}*`))
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
.then(d => console.log('Done converting scss to css.'))
.catch(e => console.log(e));

/*
 * Copy index.html and replace the uuid values.
 */
 const htmlOpts = {
   input: path.join('index.html'),
   output: path.join(`${dist}/index.html`),
 };

fs.ensureDir(path.join(dist))
.then(() => fs.copy(htmlOpts.input, htmlOpts.output))
.then(() => fs.readFile(htmlOpts.output, 'utf-8'))
.then(content => new Promise(r => {
  globAsync(`${dist}/*/main*.css`)
  .then(files => r({
    files: files,
    indexContent: content
  }))
}))
.then(fo => {
  const distPath = fo.files[0].split('/').pop();
  const newContent = fo.indexContent.replace(
    `href="/dev-dist/css/main.css">`,
    `href="/css/${distPath}">`
  ).replace(/#appVersion#/, guid.substr(0, 8));
  return newContent;
})
.then(newContent => fs.writeFile(htmlOpts.output, newContent))
.then(() => console.log('Done copying index.html.'))
.catch(e => console.log(e));
