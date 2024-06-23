var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const controller = require('../controllers/ubahPass');
const controller1 = require('../controllers/notification');


router.get('/', requireAuth, function(req, res, next) {
  res.render('home', { title: 'Bimbingan Akademik' });
});
router.get('/ubahPass', requireAuth, function(req, res, next) {
  res.render('ubahPass', { title: 'Bimbingan Akademik' });
});
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Bimbingan Akademik', message: 'You need to log in to access this page' });
});

router.get('/notification', controller1.getAllNotification);
router.get('/notification/json', controller1.getAllNotificationJson);

module.exports = router;
