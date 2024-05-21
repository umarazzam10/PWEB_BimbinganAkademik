var express = require('express');
var router = express.Router();
const controller = require('../controllers/profile')

router.get('/profile', controller.tampilProfile)

module.exports = router;
