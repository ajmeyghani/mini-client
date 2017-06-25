#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const Gaze = require('gaze').Gaze;
const apiServer = require('./api-server');
const bs = require('browser-sync').create();

const devDist = 'dev-dist';

/* clean up and dev */
fs.removeSync(devDist);
fs.ensureDirSync(`${devDist}/css`);

/* start browser sync */
bs.init({
  server: './',
  port: '9989',
  logLevel: 'info',
  notify: false,
  open: false,
  files: ['index.html', `${devDist}/**/*`]
});
bs.reload('*.html');

/* start the api server */
const PORT = 8051;
apiServer.listen(PORT, () => {
  console.log(`API server running at ${PORT}`);
});

/* start watching js files */
const compileJs = require('./compile-js')({
  input: path.join('js/main.js'),
  output: path.join(`${devDist}/js/main.js`),
});
const gazeJs = new Gaze('js/**/*.js');
gazeJs.on('all', compileJs);

/* watch sass, output css */
const compileCss = require('./compile-css')({
  input: path.join('css/main.scss'),
  output: path.join(`${devDist}/css/main.css`),
  includes: ['node_modules', 'css'],
});
const gazeCss = new Gaze('css/**/*.scss');
gazeCss.on('all', compileCss);
