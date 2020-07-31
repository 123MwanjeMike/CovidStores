const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

const transaction = mongoose.model('transaction');

let agentIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

// gets and displays login page
router.get('/', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Dashboard', user: req.session.user });
});

router.get('/addPurchase', agentIn, (req, res) => {
    res.render('./agent/newPurchase', { pageTitle: 'New Purchase', user: req.session.user });
});
// Route to save the purchase data into the database
router.post('/addPurchase', agentIn, async (req, res) => {
    try {
        const newTransaction = new transaction(req.body);
        await newTransaction.save();
        res.redirect('/agent/viewPurchases');        
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});
// View purchases
router.get('/viewPurchases', agentIn, async (req, res) => {
    try {
        let allTransactions = await transaction.find();
        res.render('./agent/viewPurchases', {pageTitle: 'Purchases', user: req.session.user, Transaction: allTransactions});
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});

router.get('/addInstallment', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Update Purchase', user: req.session.user });
});

router.get('/recordPayment', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Record Payment', user: req.session.user });
});

router.get('/clients', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'View Clients', user: req.session.user });
});

router.get('/calculator', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Calculator', user: req.session.user });
});

router.get('/search', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: `${req.query.search}`, user: req.session.user });
});

module.exports = router;