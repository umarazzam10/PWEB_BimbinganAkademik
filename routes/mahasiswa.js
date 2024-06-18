var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const controller = require('../controllers/ubahPass');

/* GET home page. */


router.get('/', requireAuth, function(req, res, next) {
  res.render('home', { title: 'Bimbingan Akademik' });
});
router.get('/ubahPass', requireAuth, function(req, res, next) {
  res.render('ubahPass', { title: 'Bimbingan Akademik' });
});
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Bimbingan Akademik', message: 'You need to log in to access this page' });
});

module.exports = router;
