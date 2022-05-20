const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on  http://localhost:${port}`);
});
