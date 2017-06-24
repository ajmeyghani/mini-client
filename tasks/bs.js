#!/usr/bin/env node
const bs = require('browser-sync').create();
bs.init({
  server: './',
  port: '9989',
  logLevel: 'info',
  notify: false,
  open: false,
  files: ['index.html', 'dev-dist/**/*']
});

bs.reload('*.html');
