#!/usr/bin/env node
const express = require('express');
const path = require('path');
const app = express();
const cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
};
app.use(cors);
app.get('/api', (req, res) => {
  res.json({
    title: 'Mini client in Action'
  })
});
module.exports = app;
