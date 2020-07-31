const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use('/public', express.static('public'));

const transaction = mongoose.model('transaction');
const LTPP = mongoose.model('LTPP');

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
    res.render('./agent/purchases/newPurchase', { pageTitle: 'New Purchase', user: req.session.user });
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
        res.render('./agent/purchases/viewPurchases', {pageTitle: 'Purchases', user: req.session.user, Transaction: allTransactions});
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

router.get('/items', agentIn, async (req, res) => {
    try {
        let items = await LTPP.find();
        res.render('./agent/viewItems', {pageTitle: 'Items', user: req.session.user, LTPP: items});
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});

router.get('/clients', agentIn, async (req, res) => {
    try {
        let clients = await transaction.find();
        res.render('./agent/viewClients', {pageTitle: 'Clients', user: req.session.user, Client: clients});
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});

router.get('/search', agentIn, (req, res) => {
    res.render('./agent/dashboard', { pageTitle: `${req.query.search}`, user: req.session.user });
});

module.exports = router;