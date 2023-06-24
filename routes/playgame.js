var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('playgame.html', { root: 'views' });
});

module.exports = router;
