const express = require('express');
const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});
const passport = require ('passport');
const router = express.Router();
const users = mongoose.model('users');
const LTPP = mongoose.model('LTPP');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressSession);
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
        res.render(500);
        console.log(err)
    }
});
// Category page
router.get('/Categories/:category', async (req, res) => {
    try {
        let selection = await LTPP.find({ category: req.params.category });
        res.render('categories', { page: `${req.params.category}`, category: selection })
    } catch (err) {
        res.render(500);
        console.log(err);
    }
});
// Product page
router.get('/product', async (req, res) => {
    try {
        let details = await LTPP.find({ _id: req.query.id });
        res.render('product', { page: `${req.query.name}`, product: details })
    } catch (err) {
        res.render(500);
        console.log(err);
    }
});

// gets and displays login page
router.get('/login', (req, res) => {
    res.render('login', { page: 'Login' })
});

router.post('/login', (req, res) => {
    //Enter here code to verify kind of admin this is
    if (req.body.username == 'manager' && req.body.password == '1234') {
        res.redirect('manager')
    } else if (req.body.username == 'agent' && req.body.password == '1234') {
        res.redirect('agent')
    } else {
        res.render('login', { message: 'Username or password incorrect! Try again' })
    }
});

module.exports = router;