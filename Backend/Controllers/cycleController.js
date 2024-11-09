const cycleModels = require('../models/cycleModels');

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

async function unlockCycle(req, res, next) {
    try {
        const cycleId = req.params.id;
        const standIdentity  = req.body;

        const cycleDetails = await cycleModels.getCycleDetails(cycleId);

        const unlockCycle = await cycleModels.unlockCycle(cycleDetails.cycleNo, cycleDetails.slot, standIdentity);

        if (unlockCycle.message == 'ok') {
            return res.status(unlockCycle.statusCode).json(unlockCycle);
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    unlockCycle
}
