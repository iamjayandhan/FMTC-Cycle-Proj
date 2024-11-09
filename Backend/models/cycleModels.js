const { db, realTimeDb } = require('../confs/dbConfig');

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

async function getCycleDetails(cycleId) {
    const cycleRef = db.collection('cycles');
    const cycleDoc = await cycleRef.get();

    if (!cycleDoc.exists) {
        throw createErrorResponse({
            message: 'Resource Not Found.',
            statusCode: 404,
            description: `Cycle not found for the id: ${cycleId}`,
            suggestedAction: 'Give proper cycleID.'
        });
    } else {
        return {
            message: 'ok',
            data: cycleDoc.data()
        }
    }
}

async function unlockCycle(cycleNo, slot, standNo) {
    const cyclesRef = realTimeDb.ref('cycles');

    await cyclesRef.update({
        CYCLE_ID: cycleNo,
        CYCLE_STATUS: `${standNo}_${slot}_CYCLE_${cycleNo}]`,
        SLOT_ID: slot,
        STAND_ID: standNo,
        STATUS: 'UNLOCK'
    })
    .then(() => {
        // Success response
        return createSuccessResponse({
            message: 'ok',
            statusCode: 200,
            description: `Cycle ${cycleNo} has been unlocked at stand ${standNo} and slot ${slot}.`
        });
    })
    .catch((error) => {
        console.log(error.message, error)
        // Error handling if update fails
        return createErrorResponse({
            message: 'Failed to unlock cycle.',
            statusCode: 500,
            description: `Error while unlocking cycle ${cycleNo}.`,
            suggestedAction: 'Try again later.'
        });
    });
}


module.exports = {
    getCycleDetails,
    unlockCycle,
}
