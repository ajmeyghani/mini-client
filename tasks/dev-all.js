#!/usr/bin/env node
const bs = require('browser-sync').create();
const fs = require('fs-extra');
const Gaze = require('gaze').Gaze;
const sass = require('node-sass');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const express = require('express');
const path = require('path');

const devDist = 'dev-dist';

/* clean up */
fs.remove(devDist)
.then(() => {
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
  const app = express();
  app.get('/api', (req, res) => {
    res.json({
      status: 'mock server running...'
    })
  });
  const PORT = 8051;
  app.listen(PORT, () => {
    console.log(`API server running at ${PORT}`);
  });

  /* start watching js files */
  const jsOpts = {
    input: path.join('js/main.js'),
    output: path.join(`${devDist}/js/main.js`),
  };
  var cache;
  const gazeJs = new Gaze('js/**/*.js');
  gazeJs.on('all', (event, filepath) => {
    rollup.rollup({
      entry: jsOpts.input,
      cache: cache,
      plugins: [
        buble()
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
    .then(() => console.log('Output js file'))
    .catch(console.error);
  });

  /* watch sass files and output css */
  const cssOpts = {
    input: path.join('css/main.scss'),
    output: path.join(`${devDist}/css/main.css`),
  };

  const gazeCss = new Gaze('css/**/*.scss');
  fs.ensureDir(`${devDist}/css`)
  .then(() => {
    gazeCss.on('all', (event, filepath) => {
      sass.render({
        file: cssOpts.input,
        outFile: cssOpts.output,
        sourceMap: cssOpts.output.replace('.css', '.css.map'),
        includePaths: ['node_modules', 'css'],
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
    });
  });
});
