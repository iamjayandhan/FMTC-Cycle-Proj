const {v4: uuidv4} = require('uuid');

const cycleModels = require('../models/cycleModels');
const standModels = require('../models/standModels');
const userModels = require('../models/userModels');
const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');
const userLogs = require('../models/userLogsModel');

async function unlockCycle(req, res, next) {
    try {
        console.log('Unlocking start...')
        const userId = req.user.userId;
        console.log('User, trying to ulock: ', userId);
        const { standIdentity, cycleId }  = req.body;

        console.log('cycle-id:', cycleId)
        const cycleDetails = await cycleModels.getCycleDetails(cycleId);
        console.log(`cycle_details: ${JSON.stringify(cycleDetails, {}, 2)}`)

        if (cycleDetails.data.availability === true) {
            const unlockCycle = await cycleModels.unlockCycle(cycleDetails.data.cycleNo, cycleDetails.data.slot, standIdentity);
            console.log(`unlocked_cycle: ${JSON.stringify(unlockCycle, {}, 2)}`);
            
            if (unlockCycle.message == 'ok') {
                const trackId = uuidv4()
                const trackDetails = {
                    cycleId,
                    trackId,
                    startStandId: cycleDetails.data.standId,
                    status: 'On-Road..',
                    userId,
                }

                console.log('Updating user-logs:', trackDetails)

                await userLogs.updateLogDetails(trackDetails);
                console.log('User-logs has been updated, passed 1')
                res.status(unlockCycle.statusCode).json(unlockCycle);

                await standModels.updateStandDetailsRemoved(cycleDetails.data.cycleNo, cycleDetails.data.standId);
                console.log('Stand details has been Updated, passed 2')

                await cycleModels.updateCycleDetailsRemoved(cycleId, trackId);
                console.log('Cycle Details has been updated, passed 3')

                await userModels.addUserHistory(userId, trackId);
                console.log('Successfully unlocked cycle and changes updated successfully.');
            }
        } else {
            throw createErrorResponse({
                message: 'Resource in Use',
                statusCode: 409,
                description: 'Cycle with given cycleId is On Road.',
                suggestedAction: 'Try again later or try with different cycle.'
            });
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function lockCycle(cycleNo, standNo, slot) {
    try {
        console.log(`Locing cycle ${cycleNo} started at stand ${standNo}`);
        const cycleDetails = await cycleModels.getCycleDetails('', cycleNo);
        console.log('gonna lock cycle: ', cycleDetails)
        

        const standDetails = await standModels.getStandDetails('', standNo);
        console.log('gonna lock stand: ', standDetails)
        

        const trackId = cycleDetails.data.prevUsageIds.pop();

        const trackData = {
            trackId,
            destStandId: standDetails.data.standId,
            status: 'Completed.'
        }

        await userLogs.updateLogDetails(trackData);
        console.log('user-logs updated');

        await standModels.updateStandDetailsLocked(cycleNo, standDetails.data.standId, cycleDetails.data.cycleId);
        console.log('Stand details updated...')

        await cycleModels.unlockCycleDetailsLocked(standDetails.data.standId, standNo, slot, cycleDetails.data.cycleId);
        console.log('Cycle details updated...');
        

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    unlockCycle,
    lockCycle
}
