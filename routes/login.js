const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

// gets and displays login page
router.get('/', (req,res) => {
    res.render('login')
});

router.get('/passwordrecovery', (req,res) => {
    res.render('password')
});

router.post('/', (req,res) => {        
    //Enter here code to verify kind of admin this is
    console.log(req.body);
    if(req.body.username == 'manager' && req.body.password == '1234'){
        res.redirect('manager')
    }else if (req.body.username == 'agent' && req.body.password == '1234') {
        res.redirect('agent')
    } else {
        res.render('login', { message: 'Username or password incorrect! Try again'})
    }
});

module.exports = router;