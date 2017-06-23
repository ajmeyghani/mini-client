#!/usr/bin/env node
const express = require('express');
const path = require('path');
const app = express();
app.get('/api', (req, res) => {
  res.json({
    status: 'running'
  })
});
const PORT = 8051;

app.listen(PORT, () => {
  console.log(`API server running at ${PORT}`);
});
