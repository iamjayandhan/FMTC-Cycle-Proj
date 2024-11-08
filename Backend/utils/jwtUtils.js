const jwt = require('jsonwebtoken');
require('dotenv').config()

function genJWTToken({userId, rollNumber}) {
    const token = jwt.sign({userId, rollNumber}, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
}

module.exports = genJWTToken;
