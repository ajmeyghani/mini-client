const express = require('express');
const app = express();
app.use(express.static('./dev'));
app.listen(9989, () => {
  console.log('server running');
});
