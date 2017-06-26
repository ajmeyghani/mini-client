#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const Gaze = require('gaze').Gaze;

const DEV_DIST = 'dev-dist';

fs.removeSync(DEV_DIST);
fs.ensureDirSync(`${DEV_DIST}/css`);

(function() {
  const bs = require('browser-sync').create();
  bs.init({
    server: './',
    port: '9989',
    logLevel: 'info',
    notify: false,
    open: false,
    files: ['index.html', `${DEV_DIST}/**/*`]
  });
  bs.reload('*.html');
}());

(function() {
  const PORT = 8051;
  require('./api-server').listen(PORT, () => {
    console.log(`API server running at ${PORT}`);
  });
}());

(function() {
  const compileJs = require('./compile-js')({
    input: path.join('js/main.js'),
    output: path.join(`${DEV_DIST}/js/main.js`),
    plugins: [
      require('rollup-plugin-html')({
        include: 'js/**/*.html'
      }),
      require('rollup-plugin-buble')()
    ]
  });
  compileJs();
  const gazeJs = new Gaze(['js/**/*.js', 'js/**/*.html']);
  gazeJs.on('all', compileJs);
}());

(function() {
  const compileCss = require('./compile-css')({
    input: path.join('css/main.scss'),
    output: path.join(`${DEV_DIST}/css/main.css`),
    includes: ['node_modules', 'css'],
  });
  compileCss();
  const gazeCss = new Gaze('css/**/*.scss');
  gazeCss.on('all', compileCss);
}());
