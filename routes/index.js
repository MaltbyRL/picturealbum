var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Richard' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/album', function(req, res, next) {
  res.render('album');
});

router.get('/albumpic', function(req, res, next) {
  res.render('album');
});

router.get('/changepw', function(req, res, next) {
  res.render('changepw');
});

// router.get('/resetPswd', function(req, res, next) {
//   res.render('/');
// });
module.exports = router;
