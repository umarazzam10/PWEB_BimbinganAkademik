var express = require('express');
const { getAllPengajuan, uploadd, postPengajuan, getEditPengajuan, putPengajuan, getAllPengajuanDosen, putStatusPengajuan } = require('../controllers/pengajuan');
const { requireAuth } = require('../middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/', getAllPengajuan);
router.get('/dosen', getAllPengajuanDosen);
router.post('/', uploadd, postPengajuan);
router.get('/edit/:id', uploadd, getEditPengajuan);
router.post('/edit', uploadd, putPengajuan);
router.post('/update', uploadd, putStatusPengajuan);

module.exports = router;