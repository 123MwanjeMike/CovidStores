const express = require('express');
const app = express();
const logins = require('./routes/login')

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', { message: 'Welcome to covidStore!', fname: 'First name', quote: 'Your quote'});
});

// import routes
app.use('/login', logins);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// });
// app.get('/agent', (req, res) => {
//     res.sendFile(__dirname + '/public/SalesAgent/index.html')
// });
// app.get('/manager', (req, res) => {
//     res.sendFile(__dirname + '/public/StoreManager/index.html')
// });
// app.get('*', (req,res) => {
//     res.send('error 404 <br/>Page not found')
// });

// Listening for requests: the server!
app.listen(3000, () => {
    console.log(`listening on port 3000`)
});