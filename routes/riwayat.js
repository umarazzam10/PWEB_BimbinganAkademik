var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('riwayat', { title: 'Riwayat Bimbingan' });
});

module.exports = router;
