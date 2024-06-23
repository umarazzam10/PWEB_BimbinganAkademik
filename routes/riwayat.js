// var express = require('express');
// var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('riwayat', { title: 'Riwayat Bimbingan' });
// });

// router.get('/details', function(req, res, next) {
//   res.render('detail_riwayat', { title: 'Details' });
// });

var express = require('express');
const { getAllRiwayat, getAllRiwayatDosen, AddDetails } = require('../controllers/riwayat');
var router = express.Router();

router.get('/', getAllRiwayat );
router.get('/dosen', getAllRiwayatDosen);

router.post('/addDetail/:id', AddDetails)

module.exports = router;
