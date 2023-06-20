var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('timestablegame.html', { title: 'Times Table Game' });
});

module.exports = router;
