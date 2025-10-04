const express = require('express');
const fs = require('fs');
const path = require('path');
const { generateToken } = require('../utils/general');
const { isLoggedin } = require('./middlewares');
const { addToken, removeToken } = require('../services/tokens');

const router = express.Router();
const dataPath = path.join(__dirname, '../data.json');

function readData() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8')).users;
}

function writeData(users) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.users = users;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

router.post('/login', (req, res) => {
    const { userName, password } = req.body;
    const users = readData();
    const user = users.find(u => u.userName === userName);

    if (!user) {
        return res.send('user not found');
    }
    if (user.password !== password) {
        return res.send('wrong password');
    }

    const token = generateToken();
    addToken(token);
    return res.json({ token });
});

router.post('/logout', isLoggedin, (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    removeToken(token);
    return res.send("logged out");
});

router.post('/register', async (req, res) => {
    const { userName, password } = req.body;
    const users = readData();

    const userExists = users.find(u => u.userName === userName);
    if (userExists) {
        return res.send('username already exists');
    }
    if (password.length < 4) {
        return res.send('password too short');
    }

    const newUser = { userName, password };
    users.push(newUser);
    writeData(users);
    const token = generateToken();
    addToken(token);
    return res.json({ message: 'user registered successfully', token });
});

module.exports = router;