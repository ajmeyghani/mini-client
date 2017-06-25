#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const apiServer = require('./api-server');
const uglify = require('rollup-plugin-uglify');
const uuidV1 = require('uuid/v1');

const guid = uuidV1().replace(/\-/g, '');
const smallGuid = guid.substr(0, 8);

const prodDist = 'dist';

/* clean up and dev */
fs.removeSync(prodDist);
fs.ensureDirSync(`${prodDist}/css`);

/* build js */
require('./compile-js')({
  input: path.join('js/main.js'),
  output: path.join(`${prodDist}/js/main${guid}.js`),
  plugins: [uglify()]
})();

/* scss -> css */
compileCss = require('./compile-css')({
  input: path.join('css/main.scss'),
  output: path.join(`${prodDist}/css/main${guid}.css`),
  includes: ['node_modules', 'css'],
  outputStyle: 'compressed',
})();

/*
 * Copy index.html and replace the uuid values.
 */
 const htmlOpts = {
   input: path.join('index.html'),
   output: path.join(`${prodDist}/index.html`),
 };

fs.copy(htmlOpts.input, htmlOpts.output)
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
