#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const guid = require('uuid/v1')().replace(/\-/g, '');
const smallGuid = guid.substr(0, 8);

const PROD_DIST = 'dist';

fs.removeSync(PROD_DIST);
fs.ensureDirSync(`${PROD_DIST}/css`);

(function() {
  require('./compile-js')({
    input: path.join('js/main.js'),
    output: path.join(`${PROD_DIST}/js/main${guid}.js`),
    plugins: [
      require('rollup-plugin-html')({
        include: 'js/**/*.html'
      }),
      require('rollup-plugin-buble')(),
      require('rollup-plugin-uglify')({
        mangle: false
      })
    ]
  })();
}());

(function() {
  compileCss = require('./compile-css')({
    input: path.join('css/main.scss'),
    output: path.join(`${PROD_DIST}/css/main${guid}.css`),
    includes: ['node_modules', 'css'],
    outputStyle: 'compressed',
  })();
}());

(function() {
  fs.copy(path.join('node_modules/angular'), path.join('dist/lib/angular'))
  .then(() => console.log('Copied lib files.'))
  .catch(console.error);
}());

(function() {
  fs.copy('favicon.ico', path.join('dist/favicon.ico'))
  .then(() => console.log('Copied favicon.ico'))
  .catch(console.error);
}());

(function() {
  const htmlOpts = {
    input: path.join('index.html'),
    output: path.join(`${PROD_DIST}/index.html`),
  };
  fs.copy(htmlOpts.input, htmlOpts.output)
  .then(() => fs.readFile(htmlOpts.output, 'utf-8'))
  .then(indexContent => {
    const newContent = indexContent.replace(
      `/dev-dist/css/main.css`,
      `/css/main${guid}.css`
    )
    .replace(
      `/dev-dist/js/main.js`,
      `/js/main${guid}.js`
    )
    .replace(
      `/node_modules/angular/angular.js`,
      `/lib/angular/angular.min.js`
    )
    .replace(`<devinfo></devinfo>`, '')
    .replace(/#buildVersion#/, smallGuid);
    return newContent;
  })
  .then(newContent => fs.writeFile(htmlOpts.output, newContent))
  .then(() => console.log('Done copying index.html.'))
  .catch(e => console.log(e));
}());
