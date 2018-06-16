var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  console.log('hello index')
  res.render('index', { title: 'China' });
});

module.exports = router;
