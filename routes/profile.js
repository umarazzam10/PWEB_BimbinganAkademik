var express = require('express');
var router = express.Router();
const controller = require('../controllers/profile')
const profile = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Profile' , profile});
});

router.get('/edit', function(req, res, next) {
  res.render('editProfile', { title: 'Edit Profile' });
});

router.get('/', controller.tampilProfile)

module.exports = router;