const bcrypt = require("bcrypt");
const { User } = require("../models");
var session = require('express-session');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        
        console.log("Login attempt:", email);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.redirect('/auth'); 
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.redirect('/auth'); 
        }

        
        res.cookie('userId', user.id, { httpOnly: true });
        res.cookie('userName', user.nama, { httpOnly: true });
        req.session.userId = user.id;
        req.session.userRole = user.role;
        console.log("Login successful for user:", email);
        if (user.id == "1" || user.id == "2") {
            return res.redirect("/");
        } else if (user.id == "3") {
            return res.redirect("/dosen/dashboard");
        }
    } catch (error) {
        console.error("Login error:", error);
        next(error);
    }
};

const requireAuth = (req, res, next) => {
    if (!req.cookies.userId) {
        return res.redirect('/auth'); 
    }
    next();
};
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.userRole==='mahasiswa') {
       return res.redirect('/'); 
    }
   next();
};
const logout = (req, res, next) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error("Error while logging out:", err);
            return next(err);
        }
        
        res.redirect('/auth');
    });
};

module.exports = { login, requireAuth,redirectIfAuthenticated,logout };
