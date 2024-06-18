var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mahasiswa/pengajuanMhs', { title: 'Pengajuan Bimbingan' });
});

module.exports = router;