const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

const transaction = mongoose.model('transaction');

let agentIn = (req, res, next) => {
    // if (!req.session.user) {
    //     return res.redirect('/login');
    // }
    next();
}

// gets and displays login page
router.get('/', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Dashboard', agent: req.session.user });
});

router.get('/addPurchase', agentIn, (req, res) => {
    res.render('./agent/newPurchase', { pageTitle: 'New Purchase', agent: req.session.user });
});
// Route to save the purchase data into the database
router.post('/addPurchase', agentIn, async (req, res) => {
    try {
        const newTransaction = new transaction(req.body);
        await newTransaction.save();
        res.redirect('/agent/addPurchase');        
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});

router.get('/addInstallment', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Update Purchase', agent: req.session.user });
});

router.get('/viewPurchases', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Record Payment', agent: req.session.user });
});

router.get('/recordPayment', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Record Payment', agent: req.session.user });
});

router.get('/clients', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'View Clients', agent: req.session.user });
});

router.get('/calculator', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Calculator', agent: req.session.user });
});

router.get('/search', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: `${req.query.search}`, agent: req.session.user });
});

module.exports = router;