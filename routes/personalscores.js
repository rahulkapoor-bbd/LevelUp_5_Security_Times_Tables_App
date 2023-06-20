var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('personalscores.html', { title: 'Personal Score' });
});

module.exports = router;
