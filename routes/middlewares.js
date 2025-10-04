const { isTokenActive } = require('../services/tokens')

function isLoggedin (req, res, next) {
    if (!req.headers.authorization) { return res.send("Unauthorized") }
    if (!req.headers.authorization.startsWith("Bearer ")) { return res.send("Unauthorized") }

    const token = req.headers.authorization.split(" ")[1];

    if (token && isTokenActive(token)) {
        next();
    } else {
        res.send("Unauthorized");
    }
}

module.exports = { isLoggedin  }