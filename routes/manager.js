const express = require('express');
const mongoose = require('mongoose');//Requiring mongoose
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const users = mongoose.model('users');
const LTPP = mongoose.model('LTPP');

router.use(bodyParser.urlencoded({ extended: true }));
router.use('/public', express.static('public'));

let managerIn = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    } else if (req.user.role !== "Manager") {
        return res.redirect('/401');
    }
    next();
}

// Rendering dashboard after successfull login
router.get('/',managerIn, (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'Dashboard', manager: req.session.user });
});

/////////////////// WORKING WITH AGENTS //////////////////////////////
// Handling register agent request
router.get('/registerAgent', managerIn, (req, res) => {
    res.render('./manager/agents/register', { pageTitle: 'Register Agent', manager: req.session.user });
});
// Saving new agent to database
router.post('/registerAgent', managerIn, async (req, res) => {
    try {
        const newAgent = new users(req.body);
        await users.register(newAgent, req.body.password, (err) => { if (err) { throw err } });
        res.redirect('/manager/agents');
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    };
});
// Fetching data from users collection for display on agent list
router.get('/agents', managerIn, async (req, res) => {
    try {
        let myAgents = await users.find();
        res.render('manager/agents/view', { pageTitle: 'Agents', manager: req.session.user, users: myAgents })
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    };
});
// Working on edit agent details request
router.get('/updateAgent', managerIn, async (req, res) => {
    try {
        let agentDetails = await users.find({ _id: req.query.id })
        res.render('manager/agents/update', { pageTitle: 'Update Agents', manager: req.session.user, agent: agentDetails })
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});
// Updating agent information in database
router.post('/updateAgent', managerIn, async (req, res) => {
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
        res.redirect('/500');
        console.log(err);
    }
    res.redirect('/manager/agents');
});
//Deleting agent record in the users collection(database)
router.post('/removeAgent', managerIn, async (req, res) => {
    try {
        await users.deleteOne({ _id: req.body.id })
        res.redirect('/manager/agents');
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});
//////////////////// END OF WORKING WITH AGENTS //////////////////////////

//////////////////// WORKING WITH ITEMS FOR THE SYSTEM ///////////////////
// Handling add item request
router.get('/addItems', managerIn, (req, res) => {
    res.render('./manager/items/add', { pageTitle: 'Add Item', manager: req.session.user });
});
// Posting new item to database
//Setting Storage
const storage = multer.diskStorage({
    //Define storage location on Server
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    //Give a new name to the uploaded image
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
//Assigning the variable upload with an object that contains methods of storage
const upload = multer({ storage: storage });
router.post('/addItems', managerIn, upload.single('photo'), async (req, res) => {
    try {
        const newItem = new LTPP(req.body);
        newItem.photo = req.file.path
        await newItem.save();
        res.redirect('/manager/items');
    } catch (error) {
        res.redirect('/500');
        console.log(error);
    };
});
// Viewing LTPP items in the database
router.get('/items', managerIn, async (req, res) => {
    try {
        let items = await LTPP.find();
        res.render('manager/items/view', { pageTitle: 'Items', manager: req.session.user, LTPP: items })
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    };
});
// Working on the edit LTPP product request
router.get('/updateItem', managerIn, async (req, res) => {
    try {
        let itemDetails = await LTPP.find({ _id: req.query.id })
        res.render('manager/items/update', { pageTitle: 'Update Items', manager: req.session.user, LTPP: itemDetails })
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});
// Updating Item details in the database
router.post('/updateItem', managerIn, upload.single('photo'), async (req, res) => {
    try {
        await LTPP.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    name: req.body.name, make: req.body.make, DOE: req.body.DOE, category: req.body.category,
                    serialNo: req.body.serialNo, price: req.body.price, initialPay: req.body.initialPay,
                    payInterval: req.body.payInterval, color: req.body.color, description: req.body.description,
                    numberInStock: req.body.numberInStock, photo: req.file.path
                }
            }
        )
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
    res.redirect('/manager/items');
});
// Removing out of stock items
router.post('/removeItem', managerIn, async (req, res) => {
    try {
        let image = await LTPP.find({ _id: req.body.id });// Getting the image
        // Deleting the image from file location and deleting details from database
        fs.unlink(image[0].photo, async (err) => {
            if (err) throw err
            try {
                await LTPP.deleteOne({ _id: req.body.id });
                res.redirect('/manager/items');
            } catch (error) {
                res.redirect('/500');
                console.log(err);
            }
        });
    } catch (err) {
        res.redirect('/500');
        console.log(err);
    }
});
//////////////////// END OF WORKING WITH ITEMS ////////////////////////


router.get('/transactions', managerIn, (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Transactions', manager: req.session.user });
});

router.get('/clients', managerIn, (req, res) => {
    res.render('./manager/dashboard', { pageTitle: 'View Clients', manager: req.session.user });
});

router.get('/search', managerIn, (req, res) => {
    res.render('./manager/dashboard', { pageTitle: `${req.query.search}`, manager: req.session.user });
});

module.exports = router;