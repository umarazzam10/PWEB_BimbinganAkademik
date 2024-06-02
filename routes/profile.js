var express = require('express');
var router = express.Router();
const controller = require('../controllers/profile')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/edit', function(req, res, next) {
  res.render('editProfile', { title: 'Edit Profile' });
});

router.get('/profile', controller.tampilProfile)

module.exports = router;