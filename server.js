const express = require('express');
const rateLimit = require('express-rate-limit')
const passport = require('passport');
require("./models/user");
require("./models/item");
require("./models/purchase");
const index = require('./routes/index');
const agent = require('./routes/agent');
const manager = require('./routes/manager');
const app = express();

// set up rate limiter: maximum of twenty requests every minute
const limiter = rateLimit({
    windowMs: 1 * 10 * 1000, // 1 minute
    max: 20
});

// apply rate limiter to all requests
app.use(limiter);

require('dotenv').config();
const mongoose = require('mongoose');

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/public', express.static('public'));
// Serving my static files
app.use(express.static('public'));
// Serving my routes
app.use('/', index);
app.use('/agent', agent);
app.use('/manager', manager);

//Making database connection to covidStores
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });


// Handling errors
//Unauthorised access
app.get('/401', (req, res) => {
    res.status(401).render('401', { page: '401' })
});
// Internal server error
app.get('/500', (req, res) => {
    res.status(500).render('500', { page: '500' })
});
// Resource not found
app.get('*', (req, res) => {
    res.status(404).render('404', { page: '404' })
});

// Listening for requests: the server!
const port = process.env.PORT || 3000
app.listen(port, (error) => {
    console.log(`Listening on port ${port}`)
});