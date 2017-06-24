#!/usr/bin/env node
const express = require('express');
const path = require('path');
const app = express();
app.get('/api', (req, res) => {
  res.json({
    status: 'mock server running...'
  })
});
module.exports = app;
