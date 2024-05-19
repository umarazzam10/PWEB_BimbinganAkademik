var express = require('express');
var router = express.Router();


router.get('/ubahPass', function(req, res, next) {
     res.render('ubahPass', { title: 'Ubah Password' });
 });

router.post('/ganti_pass', verifyToken, async(req, res)=>{
      await ubah_pass(req, res)
 })

module.exports = router;

