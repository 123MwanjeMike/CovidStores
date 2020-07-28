const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

var agentIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}
router.use(agentIn);

// gets and displays login page
router.get('/', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Dashboard', agent: req.session.user });
});

router.get('/addPurchase', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Add Purchase', agent: req.session.user });
});

router.get('/updatePurchase', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Update Purchase', agent: req.session.user });
});

router.get('/recordPayment', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Record Payment', agent: req.session.user });
});

router.get('/updatePayment', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Update Payment', agent: req.session.user });
});

router.get('/balances', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'View Balances', agent: req.session.user });
});

router.get('/clients', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'View Clients', agent: req.session.user });
});

router.get('/calculator', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: 'Calculator', agent: req.session.user });
});

router.get('/search', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: `${req.query.search}`, agent: req.session.user });
});

module.exports = router;