const express = require('express');
const mongoose = require('mongoose');
require('passport-local-mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: false
});
const passport = require('passport');
const csrf = require("csurf");

const router = express.Router();
const users = mongoose.model('users');
const LTPP = mongoose.model('LTPP');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressSession);
router.use(csrf({ cookie: true }));
router.use(passport.initialize());
router.use(passport.session());
passport.use(users.createStrategy());

passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

// Home page
router.get('/', async (req, res) => {
    try {
        let all = await LTPP.find();
        res.render('index', { page: 'All Categories', category: all })
    } catch (err) {
        res.redirect('/500');
        console.log(err)
    }
});
// Category page
router.get('/Categories/:category', async (req, res) => {
    try {
        let selection = await LTPP.find({ category: req.params.category });
        res.render('categories', { page: `${req.params.category}`, category: selection })
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});
// Product page
router.get('/product', async (req, res) => {
    try {
        let details = await LTPP.find({ _id: req.query.id });
        res.render('product', { page: `${req.query.name}`, product: details })
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});

// gets and displays login page
router.get('/login', (req, res) => {
    res.render('login', { page: 'Login' })
});
// Logging and giving role specific pages
router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            return res.render('login', { page: 'Login', message: 'Employee ID or Password incorrect!' })
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            req.session.user = req.user;
            if (req.session.user.role == 'Manager') {
                return res.redirect('manager');
            } else {
                return res.redirect('agent');
            }
        });
    })(req, res, next);
});

//logout
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(function (err) {
            return res.redirect('/login');
        })
    }
})

module.exports = router;