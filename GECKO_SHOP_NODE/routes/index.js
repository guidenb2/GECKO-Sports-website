var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', {title: "GECKO SHOP"});
});

router.get('/login', function(req, res, next)
{
  res.render('userlogin', {title: "Login"});
});

module.exports = router;
