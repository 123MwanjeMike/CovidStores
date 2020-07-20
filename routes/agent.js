const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

// gets and displays login page
router.get('/', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'Dashboard', user: 'Sales Agent' });
});

router.get('/addPurchase', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'Add Purchase', user: 'Sales Agent' });
});

router.get('/updatePurchase', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'Update Purchase', user: 'Sales Agent' });
});

router.get('/recordPayment', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'Record Payment', user: 'Sales Agent' });
});

router.get('/updatePayment', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'Update Payment', user: 'Sales Agent' });
});

router.get('/balances', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'View Balances', user: 'Sales Agent' });
});

router.get('/clients', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'View Clients', user: 'Sales Agent' });
});

router.get('/calculator', (req, res) => {    
    res.render('./agent/dashboard', { pageTitle: 'Calculator', user: 'Sales Agent' });
});

router.get('/search', (req, res) => {
    res.render('./agent/dashboard', { pageTitle: `${req.query.search}`, user: 'Store Manager' });
});

module.exports = router;