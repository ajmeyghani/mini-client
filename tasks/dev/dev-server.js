#!/usr/bin/env node
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join('./dev')));
const PORT = 9989;
app.listen(PORT, () => {
  console.log(`Dev server running at ${PORT}`);
});
