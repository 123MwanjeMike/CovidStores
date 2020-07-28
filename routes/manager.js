const express = require('express');
const mongoose = require('mongoose');//Requiring mongoose
const bodyParser = require('body-parser');

const router = express.Router();
const users = mongoose.model('users');
const LTPP = mongoose.model('LTPP');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

var managerIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }else if (req.session.user.role !== "Manager"){
        return res.render('401');
    }
    next();
}
router.use(managerIn);

// Rendering dashboard after successfull login
router.get('/', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Dashboard', user: 'Store Manager' });
});

/////////////////// WORKING WITH AGENTS //////////////////////////////
// Handling register agent request
router.get('/registerAgent', (req, res) => {
    res.render('./manager/agents/register', { pageTitle: 'Register Agent', user: 'Store Manager' });
});
// Saving new agent to database
router.post('/registerAgent', async (req, res) => {
    try {
        const newAgent = new users(req.body);
        await users.register(newAgent, req.body.password, (err) => {if (err){throw err}});
        res.redirect('/manager/agents');
    } catch (error) {
        res.render('500');
        console.log(error);
    };
});
// Fetching data from users collection for display on agent list
router.get('/agents', async (req, res) => {
    try {
        let myAgents = await users.find();
        res.render('manager/agents/view', { pageTitle: 'Agents', user: 'Store Manager', users: myAgents })
    } catch (err) {
        res.render('500');
        console.log(err);
    };
});
// Working on edit agent details request
router.get('/updateAgent', async (req, res) => {
    try {
        let agentDetails = await users.find({ _id: req.query.id })
        res.render('manager/agents/update', { pageTitle: 'Update Agents', user: 'Store Manager', agent: agentDetails })
    } catch (err) {
        res.render('500');
        console.log(err);
    }
});
// Updating agent information in database
router.post('/updateAgent', async (req, res) => {
    try {
        await users.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    NIN: req.body.NIN, empid: req.body.empid,
                    fname: req.body.fname, lname: req.body.lname, dob: req.body.dob, gender: req.body.gender,
                    password: req.body.password
                }
            }
        )
    } catch (err) {
        res.render('500');
        console.log(err);
    }
    res.redirect('/manager/agents');
});
//Deleting agent record in the users collection(database)
router.post('/removeAgent', async (req, res) => {
    try {
        await users.deleteOne({ _id: req.body.id })
        res.redirect('/manager/agents');
    } catch (err) {
        res.render('500');
        console.log(err);
    }
});
//////////////////// END OF WORKING WITH AGENTS //////////////////////////

//////////////////// WORKING WITH ITEMS FOR THE SYSTEM ///////////////////
// Handling add item request
router.get('/addItems', (req, res) => {
    res.render('./manager/items/add', { pageTitle: 'Add Item', user: 'Store Manager' });
});
// Posting new item to database
router.post('/addItems', async (req, res) => {
    try {
        const newItem = new LTPP(req.body);
        await newItem.save();
        res.redirect('/manager/items');
    } catch (error) {
        res.render('500');
        console.log(err);
    };
});
// Viewing LTPP items in the database
router.get('/items', async (req, res) => {
    try {
        let items = await LTPP.find();
        res.render('manager/items/view', { pageTitle: 'Items', user: 'Store Manager', LTPP: items })
    } catch (err) {
        res.render('500');
        console.log(err);
    };
});
// Working on the edit LTPP product request
router.get('/updateItem', async (req, res) => {
    try {
        let itemDetails = await LTPP.find({ _id: req.query.id })
        res.render('manager/items/update', { pageTitle: 'Update Items', user: 'Store Manager', LTPP: itemDetails })
    } catch (err) {
        res.render('500');
        console.log(err);
    }
});
// Updating Item details in the database
router.post('/updateItem', async (req, res) => {
    try {
        await LTPP.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    name: req.body.name, make: req.body.make, DOE: req.body.DOE, category: req.body.category,
                    serialNo: req.body.serialNo, price: req.body.price, initialPay: req.body.initialPay,
                    payInterval: req.body.payInterval, color: req.body.color, description: req.body.description,
                    numberInStock: req.body.numberInStock, photo: req.body.photo
                }
            }
        )
    } catch (err) {
        res.render('500');
        console.log(err);
    }
    res.redirect('/manager/items');
});
// Removing out of stock items
router.post('/removeItem', async (req, res) => {
    try {
        await LTPP.deleteOne({ _id: req.body.id })
        res.redirect('/manager/items');
    } catch (err) {
        res.render('500');
        console.log(err);
    }
});
//////////////////// END OF WORKING WITH ITEMS ////////////////////////


router.get('/transactions', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Transactions', user: 'Store Manager' });
});

router.get('/clients', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Clients', user: 'Store Manager' });
});

router.get('/search', (req, res) => {
    res.render('./manager/dashboard', { pageTitle: `${req.query.search}`, user: 'Store Manager' });
});

//logout
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return res.render('/manager', { pageTitle: 'Failed to log out', agent:req.session.user });
            } else {
                return res.redirect('/');
            }
        })
    }
})


module.exports = router;