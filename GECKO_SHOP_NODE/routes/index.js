var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', {title: "GECKO SHOP"});
});


/* GET reviews page. */
router.get('/reviews', function(req, res, next)
{
  res.render('reviews', {title: "Reviews"});
});


/* GET products page. */
router.get('/products', function(req, res, next)
{
  res.render('products', {title: "Products"});
});


/* GET about page. */
router.get('/about', function(req, res, next)
{
  res.render('about', {title: "About"});
});


router.get('/login', function(req, res, next)
{
  res.render('userlogin', {title: "Login"});
});

module.exports = router;
