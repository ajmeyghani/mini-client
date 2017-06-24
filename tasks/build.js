#!/usr/bin/env node
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs-extra');
const sass = require('node-sass');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
const glob = require('glob');
const {str, run, uuid, runAsync, globAsync} = require('./lib/utils');

const guid = uuid();
const smallGuid = guid.substr(0, 8);
const dist = 'dist';

/* clean up */
fs.removeSync(dist);
fs.mkdirpSync(dist);

/* scss  -> css */
const cssOpts = {
  input: path.join('css/main.scss'),
  output: path.join(`${dist}/css/main${guid}.css`),
  nodeSass: path.join('./node_modules/.bin/node-sass'),
};

fs.mkdirpSync(`${dist}/css`);
sass.render({
  file: cssOpts.input,
  outputStyle: 'compressed',
  outFile: cssOpts.output,
  sourceMap: cssOpts.output.replace('.css', '.css.map'),
  // sourceMapContents: true,
  // sourceComments: true,
  includePaths: ['node_modules', 'css']
}, function(error, result) {
  if (!error) {
    fs.writeFile(cssOpts.output, result.css, function(err) {
      if (!err) {
        console.log('Done converting the SASS files.');
      }
    });
    fs.writeFile(cssOpts.output.replace('.css', '.css.map'), result.map, function(err) {
      if (!err) {
        console.log('Done writing the SASS map file.');
      }
    });
  }
});

/*
 * Build javascript
 */
const jsOpts = {
  input: path.join('js/main.js'),
  output: path.join(`dist/js/main${guid}.js`),
};

var cache;

rollup.rollup({
  entry: jsOpts.input,
  cache: cache,
  plugins: [
  buble(),
  uglify()
  ],
})
.then(bundle => {
  cache = bundle;
  bundle.write({
    format: 'iife',
    sourceMap: true,
    dest: jsOpts.output
  });
})
.then(() => console.log('Done building the js files.'))
.catch(console.error);

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
