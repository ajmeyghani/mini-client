#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const sass = require('node-sass');
const Gaze = require('gaze').Gaze;

const devDist = 'dev-dist';
const cssOpts = {
  input: path.join('css/main.scss'),
  output: path.join(`${devDist}/css/main.css`),
};

const gaze = new Gaze('css/**');
fs.remove(`${devDist}/css`)
.then(() => fs.ensureDir(`${devDist}/css`))
.then(() => {
  gaze.on('all', (event, filepath) => {
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
