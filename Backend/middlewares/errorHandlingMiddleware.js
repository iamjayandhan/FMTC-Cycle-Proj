const AppError = require('../utils/AppError');

function errorHandlingMiddleware(err, req, res, next) {
    if (err instanceof AppError) {
        console.log(err)
        res.status(err.statusCode).json(err.toResponseFormat());
    } else {
        console.log("yeah here")
        res.status(500).json({
            error: {
                statusCode: 500,
                message: 'Internal Server Error.',
                description: 'An unexpected error occurred.',
                suggestedAction: 'Please contact support or try again later.'
            },
        });
    }
}

module.exports = errorHandlingMiddleware;
