var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', {title: "GECKO SHOP"});
});


/* GET home page. */
router.get('/reviews', function(req, res, next)
{
  res.render('reviews', {title: "GECKO SHOP"});
});


/* GET home page. */
router.get('/products', function(req, res, next)
{
  res.send("hello love");
});

module.exports = router;
