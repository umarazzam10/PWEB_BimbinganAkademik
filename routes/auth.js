var express = require('express');
var router = express.Router();
const controller = require("../controllers/ubahPass");
const { login, requireAuth,redirectIfAuthenticated,logout } = require('../middleware/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'login' });
});
router.post('/login', login);
router.post('/logout', logout);
router.post("/ubahPassword", requireAuth, async (req, res) => {
    try {
        await controller.ubahPassword(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
    });
router.get('/error', function(req, res, next) {
    res.render('error', { title: 'Bimbingan Akademik' });
});
router.get('/logout', function(req, res, next) {
    //req.session.userId = null
    res.clearCookie('userId');
    res.redirect("/auth");
});


module.exports = router;
