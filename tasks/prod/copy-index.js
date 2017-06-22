#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const Promise = require('bluebird');
const {globAsync} = require('../lib/common');


const opts = {
  input: path.join('dev/index.html'),
  output: path.join('dist/index.html'),
  dist: 'dist',
};

fs.ensureDir(opts.dist)
.then(() => fs.copy(opts.input, opts.output))
.then(() => fs.readFile(opts.output, 'utf-8'))
.then(content => new Promise(r => {
  globAsync('dist/css/*.css')
  .then(files => r({
    files: files,
    indexContent: content
  }))
}))
.then(fo => {
  const distPath = fo.files[0].split('/').pop();
  const newContent = fo.indexContent.replace(
    `<link rel="stylesheet" href="/dev-dist/css/base.css">`,
    `<link rel="stylesheet" href="/css/${distPath}">`
  );
  return fs.writeFile(opts.output, newContent);
})
.then(() => console.log('done copying index.html'))
.catch(e => console.log(e));
