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

//Agent home page
router.get('/', agentIn, (req, res) => {
    res.redirect('/agent/addPurchase');
});

router.get('/addPurchase', agentIn, async (req, res) => {
    try {
        let items = await LTPP.find();
        res.render('./agent/purchases/newPurchase', { pageTitle: 'New Purchase', user: req.session.user, LTPP: items });
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});
// Saving purchase data into the database
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

// Update installment details
router.get('/updateInstallment/:id', agentIn, async (req, res) => {
    try {
        let purchase = await transaction.find({ _id: req.params.id })
        res.render('./agent/purchases/updateInstallment', { pageTitle: 'Update Purchase Details', user: req.session.user, purchase: purchase });
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});
router.post('/updateInstallment/', agentIn, async (req, res) => {
    try {
        await transaction.updateOne(
            { _id: req.body.id },
            {
                $set: { 
                   fname: req.body.fname, address: req.body.address,tel: req.body.tel, email: req.body.email,
                   NIN: req.body.NIN, ref: req.body.ref, itemName: req.body.itemName, serialNo: req.body.serialNo
                },
            }
        )
        res.redirect('/agent/viewPurchases');
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});

// New installment
router.get('/installment/:id', agentIn, async (req, res) => {
    try {
        let purchase = await transaction.find({ _id: req.params.id })
        res.render('./agent/purchases/addInstallment', { pageTitle: 'New Installment', user: req.session.user, purchase: purchase });
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});
router.post('/installment', agentIn, async (req, res) => {
    try {
        await transaction.updateOne(
            { _id: req.body.id },
            {
                $set: { nextPay: req.body.nextPay, nDOP: req.body.nDOP, balance: req.body.balance },
                $push: { payment: req.body.payment, DOP: req.body.DOP, agent: req.body.agent }
            }
        )
        res.redirect('/agent/viewPurchases');
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});

// View Items
router.get('/items', agentIn, async (req, res) => {
    try {
        let items = await LTPP.find();
        res.render('./agent/viewItems', { pageTitle: 'Items', user: req.session.user, LTPP: items });
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});

// View Clients
router.get('/clients', agentIn, async (req, res) => {
    try {
        let clients = await transaction.find();
        res.render('./agent/viewClients', { pageTitle: 'Clients', user: req.session.user, Client: clients });
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});

// View Purchases
router.get('/viewPurchases', agentIn, async (req, res) => {
    try {
        let allTransactions = await transaction.find();
        res.render('./agent/purchases/viewPurchases', { pageTitle: 'Purchases', user: req.session.user, Transaction: allTransactions });
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    }
});
// Checking database records
router.get('/api/:serialNo', async (req, res) => {
    try {
        let item = await LTPP.find({serialNo: req.params.serialNo});
        res.json({item});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;