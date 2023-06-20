const express = require('express');
const app = express();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Identity server is running on port ${port}.`);
});

function authenticate(username, password) {
  // This funtion will handle authentication
  if(username != '' && password != '')
  {
    return true;
  }
  return false;
}

module.exports = {
  authenticate
};