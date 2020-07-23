const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();// Instantiating express application
const user = mongoose.model('user');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

// gets and displays login page
router.get('/', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Dashboard', user: 'Store Manager' });
});

router.get('/registerAgent', (req, res) => {
    res.render('./manager/registerAgent', { pageTitle: 'Register Agent', user: 'Store Manager' });
});

router.post('/registerAgent', async (req, res) => {
    try {
        const newAgent = new user(req.body);
        await newAgent.save();
        res.redirect('/manager/agents');
    } catch (error) {
        console.log(err);
        res.render('500')
    };
});

router.get('/agents', async (req, res) => {
    try {
        let items = await user.find();
        res.render('manager/viewAgents', {pageTitle: 'View Agents', user: 'Store Manager', users: items })
    } catch (err) {
        console.log(err)
        res.render(500);
    };
    res.render('./manager/viewAgents', { pageTitle: 'View Agents', user: 'Store Manager' });
});

router.get('/removeAgent', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Remove Agent', user: 'Store Manager' });
});

router.get('/addItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Add Items', user: 'Store Manager' });
});

router.get('/updateItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Update Items', user: 'Store Manager' });
});

router.get('/removeItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Remove Items', user: 'Store Manager' });
});

router.get('/items', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Items', user: 'Store Manager' });
});

router.get('/transactions', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Transactions', user: 'Store Manager' });
});

router.get('/clients', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Clients', user: 'Store Manager' });
});

router.get('/search', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: `${req.query.search}`, user: 'Store Manager' });
});

module.exports = router;