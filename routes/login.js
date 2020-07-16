const express = require('express');
const router = express.Router();

// gets and displays login page
router.get('/', (req,res) => {
    res.render('login')
});

module.exports = router;