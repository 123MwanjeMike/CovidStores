const express = require('express');
const login = require('./routes/login');
const agent = require('./routes/agent');
const manager = require('./routes/manager');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
// importing routes
app.use('/login', login);
app.use('/agent', agent);
app.use('/manager', manager);


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