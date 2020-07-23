const express = require('express');
require("./models/manager/registerAgent");
const login = require('./routes/login');
const agent = require('./routes/agent');
const manager = require('./routes/manager');
const app = express();
//database
require('dotenv').config();
const mongoose = require('mongoose');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
// importing routes
app.use('/login', login);
app.use('/agent', agent);
app.use('/manager', manager);


//Making database connection to covidStores
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });


app.get('/', (req, res) => {
    res.render('index', { message: 'This is a message to render from server.js'});
});

app.get('*', (req,res) => {
    res.render('404')
});

// Listening for requests: the server!
app.listen(3000, () => {
    console.log(`listening on port 3000`)
});