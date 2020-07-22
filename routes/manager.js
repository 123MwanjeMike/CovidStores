const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

// gets and displays login page
router.get('/', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Dashboard', user: 'Store Manager'  });
});

router.get('/registerAgent', (req, res) => {
    res.render('./manager/registerAgent', { pageTitle: 'Register Agent', user: 'Store Manager'  });
});

router.get('/removeAgent', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Remove Agent', user: 'Store Manager'  });
});

router.get('/addItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Add Items', user: 'Store Manager'  });
});

router.get('/updateItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Update Items', user: 'Store Manager'  });
});

router.get('/removeItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Remove Items', user: 'Store Manager'  });
});

router.get('/items', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Items', user: 'Store Manager'  });
});

router.get('/transactions', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Transactions', user: 'Store Manager'  });
});

router.get('/clients', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Clients', user: 'Store Manager' });
});

router.get('/agents', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Agents', user: 'Store Manager'  });
});

router.get('/search', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: `${req.query.search}`, user: 'Store Manager'  });
});

module.exports = router;