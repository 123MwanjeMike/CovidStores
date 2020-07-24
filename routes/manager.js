const express = require('express');
const mongoose = require('mongoose');//Requiring mongoose
const bodyParser = require('body-parser');

const router = express.Router();// Instantiating express application
const users = mongoose.model('users');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

// gets and displays login page
router.get('/', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Dashboard', user: 'Store Manager' });
});

/////////////////////////////////////////////////////////////////////////////////
//Working with agents
router.get('/registerAgent', (req, res) => {
    res.render('./manager/registerAgent', { pageTitle: 'Register Agent', user: 'Store Manager' });
});
// For working on agent registration form posts
router.post('/registerAgent', async (req, res) => {
    try {
        const newAgent = new users(req.body);
        await newAgent.save();
        res.redirect('/manager/agents');
    } catch (error) {
        console.log(err);
        res.render('500')
    };
});
//Fetching database data from agents for display on agent list
router.get('/agents', async (req, res) => {
    try {
        let items = await users.find();
        res.render('manager/viewAgents', { pageTitle: 'Agents', user: 'Store Manager', users: items })
    } catch (err) {
        console.log(err)
        res.render(500);
    };
});
//For delete agent action
router.post('/removeAgent', async (req, res) => {
    try {
        await users.deleteOne({ _id: req.body.id })
        res.redirect('/manager/agents');
    } catch (err) {
        console.log(err)
        res.render(500);
    }
});
//For editing information o agent page
router.get('/updateAgent', async (req, res) => {
    try {
        let agentDetails = await users.find({ _id: req.query.id })
        res.render('manager/editAgent', { pageTitle: 'Update Agents', user: 'Store Manager', agent: agentDetails })
    } catch (err) {
        console.log(err)
        res.render(500);
    }
});
//For updating agent information in database
router.post('/updateAgent', async (req, res) => {
    try {
        await users.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    NIN: req.body.NIN, empid: req.body.empid,
                    fname: req.body.fname, lname: req.body.lname, dob: req.body.dob, gender: req.body.gender,
                    telephone: req.body.telephone, email: req.body.email, address: req.body.address
                }
            }
        )
    } catch (err) {
        console.log(err)
        res.render(500);
    }
    res.redirect('/manager/agents');
});

router.get('/addItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Add Items', user: 'Store Manager' });
});

router.get('/updateItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Update Items', user: 'Store Manager' });
});

router.get('/removeItems', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Remove Items', user: 'Store Manager' });
});

router.get('/items', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Items', user: 'Store Manager' });
});

router.get('/transactions', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Transactions', user: 'Store Manager' });
});

router.get('/clients', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Clients', user: 'Store Manager' });
});

router.get('/search', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: `${req.query.search}`, user: 'Store Manager' });
});

module.exports = router;