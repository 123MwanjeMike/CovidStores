const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

// gets and displays login page
router.get('/', (req, res) => {
    res.sendFile(__dirname + 'agent')
    res.send('Welcome agent');
});

module.exports = router;