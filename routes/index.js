const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();
const LTPP = mongoose.model('LTPP');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    try {
        let all = await LTPP.find();
        res.render('index', { page: 'All Categories', category: all })
    } catch (err) {        
        console.log(err)
        res.render(500);
    }
});

router.get('/Categories/:category', async (req, res) => {
    try {
        let selection = await LTPP.find({category: req.params.category});
        res.render('categories', { page: `${req.params.category}`, category: selection })
    } catch (err) {        
        console.log(err)
        res.render(500);
    }
});

// gets and displays login page
router.get('/login', (req,res) => {
    res.render('login', {page: 'Login'})
});

router.post('/login', (req,res) => {        
    //Enter here code to verify kind of admin this is
    if(req.body.username == 'manager' && req.body.password == '1234'){
        res.redirect('manager')
    }else if (req.body.username == 'agent' && req.body.password == '1234') {
        res.redirect('agent')
    } else {
        res.render('login', { message: 'Username or password incorrect! Try again'})
    }
});

module.exports = router;