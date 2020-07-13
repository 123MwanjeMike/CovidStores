const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/agent', (req, res) => {
    res.sendFile(__dirname + '/public/SalesAgent/index.html')
});

app.get('/manager', (req, res) => {
    res.sendFile(__dirname + '/public/StoreManager/index.html')
});

app.get('*', (req,res) => {
    res.send('error 404 <br/>Page not found')
});

// Listening for requests: the server!
app.listen(3000, () => {
    console.log(`listening on port 3000`)
});