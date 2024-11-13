const firebaseDb = require('../confs/dbConfig').db;
const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

async function updateLogDetails({ cycleId, userId, startStandId, destStandId, ideal, trackId, status }) {
    const data = {
        cycleId,
        userId,
        trackId,
        status,
    }

    if (status === 'On-Road..') {
        data.startStandId = startStandId; 
        const now = new Date();
        data.startTime = now.toTimeString().slice(0, 5);
    } else {
        delete data.userId;
        delete data.cycleId;
        delete data.trackId;
        data.destStandId = destStandId
        const now = new Date();
        data.endTime = now.toTimeString().slice(0, 5);
    }

    await firebaseDb.collection('user-logs').doc(trackId).set(data, { merge: true });

    return createSuccessResponse({
        message: 'Data successfully updated.',
        statusCode: 200,
    });
}

async function updateLogDetailsComplete(cycleNo, standNo) {
    
}

module.exports = {
    updateLogDetails,
}
