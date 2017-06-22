#!/usr/bin/env node
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join('./dev')));
app.listen(9989, () => {
  console.log('server running');
});
