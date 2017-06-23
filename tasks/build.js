#!/usr/bin/env node
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const {str, run, uuid, runAsync, globAsync} = require('./lib/utils');

const guid = uuid();
const smallGuid = guid.substr(0, 8);
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

fs.removeSync(dist);

fs.mkdirp(dist)
.then(() => buildCss())
.then(d => console.log('Done converting scss to css.'))
.catch(e => console.log(e));

/*
 * Build javascript
 */
 const devScripts = `${path.join('./node_modules/.bin/rollup')} -c rollup.prod.js --output dist/js/main${guid}.js`;
 run(devScripts);

/*
 * Copy index.html and replace the uuid values.
 */
 const htmlOpts = {
   input: path.join('index.html'),
   output: path.join(`${dist}/index.html`),
 };

fs.ensureDir(dist)
.then(() => fs.copy(htmlOpts.input, htmlOpts.output))
.then(() => fs.readFile(htmlOpts.output, 'utf-8'))
.then(indexContent => {
  const newContent = indexContent.replace(
    `href="/dev-dist/css/main.css">`,
    `href="/css/main${guid}.css">`
  )
  .replace(
    `<script src="/dev-dist/js/main.js"></script>`,
    `<script src="/js/main${guid}.js"></script>`
  )
  .replace(/#appVersion#/, smallGuid);
  return newContent;
})
.then(newContent => fs.writeFile(htmlOpts.output, newContent))
.then(() => console.log('Done copying index.html.'))
.catch(e => console.log(e));
