var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signin', {
    title: 'Sign in'
  });
});

module.exports = router;
