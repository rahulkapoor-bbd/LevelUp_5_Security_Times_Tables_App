const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Api');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Resource server is running on port ${port}.`);
});
