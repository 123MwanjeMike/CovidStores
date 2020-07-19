const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

// gets and displays login page
router.get('/', (req, res) => {
    res.render('layout/manager', { pageTitle: 'Dashboard', template: 'manager' });
});

module.exports = router;