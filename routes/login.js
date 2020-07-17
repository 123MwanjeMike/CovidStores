const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

// gets and displays login page
router.get('/', (req,res) => {
    res.render('login')
});

router.get('/passwordRecovery', (req,res) => {
    res.render('password')
});

router.post('/authentication', (req,res) => {
    console.log(req.body);
    res.send('Welcome admin');
    //Enter here code to verify kind of admin this is
});

module.exports = router;