const standModels = require('../models/standModels');

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

async function getStandDetails(req, res, next) {
    try {
        const standId = req.params.id;
        const standDetails = await standModels.getStandDetails(standId);

        if (standDetails.message == 'ok') {
            return res.status(standDetails.statusCode).json(standDetails);
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    getStandDetails,
}
