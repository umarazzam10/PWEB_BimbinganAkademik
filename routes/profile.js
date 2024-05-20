var express = require('express');
var router = express.Router();
import{tampilProfile} from "../controllers/profile"

router.get('/profile', tampilProfile)

module.exports = router;
