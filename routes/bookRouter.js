const express = require('express');
const books = require('../data.json').books
const { isLoggedin } = require('./middlewares')

const router = express.Router();

router.get('/', isLoggedin, (req, res) => {
    console.log(req.body);
    res.send(books)
})

module.exports = router;
