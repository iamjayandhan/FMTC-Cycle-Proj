const jwt = require('jsonwebtoken');
require('dotenv').config();

const { createErrorResponse } = require('../utils/responseUtils')

function verifyToken(req, res, next) {
    const token = req.cookies.JTOK;

    if (!token) {
        const error = createErrorResponse({
            message: 'No token provided.',
            statusCode: 403,
            description: 'In cookies there is no crendetial token.',
            suggestedAction: 'Try login with your user Roll Number and password.'
        });

        return next(error);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const error = createErrorResponse({
                message: err.message,
                statusCode: 401,
                description: 'Token has been compromised or Expired.',
                suggestedAction: 'Try Login with your credentials.'
            });

            next(error);
        }

        req.user = decoded;
        next();
    })
}

module.exports = verifyToken;
