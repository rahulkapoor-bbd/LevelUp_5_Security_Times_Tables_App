var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('register.html', { root: 'views' });
});

module.exports = router;
