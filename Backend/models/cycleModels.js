const admin = require('firebase-admin');
const { db, realTimeDb } = require('../confs/dbConfig');

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');
const cycleController = require('../controllers/cycleController')



async function getCycleDetails(cycleId, cycleNo = 0) {
    if(cycleNo != 0) {
        const cycleRef = db.collection('cycles')
        .where('cycleNo', '==', cycleNo)
        const cycleSnapShot = await cycleRef.get();

        if (!cycleSnapShot.empty) {
            const cycleDocs = cycleSnapShot.docs[0];
            return createSuccessResponse({
                message: 'ok',
                statusCode: 200,
                data: cycleDocs.data()
            });
        } else {
            return createErrorResponse({
                message: 'Resource not found.',
                statusCode: 404,
                description: 'Cycle not found in the given cycleID.',
                suggestedAction: 'Provide correct cycleId.'
            });
        }
    }
    const cycleRef = db.collection('cycles').doc(cycleId);
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
    const cyclesRef = realTimeDb.ref('CYCLE_UNLOCK');

    try {
        await cyclesRef.update({
            CYCLE_ID: cycleNo,
            STAND_STATUS: `${standNo}_${slot}_CYCLE_${cycleNo}`,
            SLOT_ID: +slot,
            STAND_ID: standNo,
            CYCLE_STATUS: 'UNLOCKED'
        });

        
        // Return the success response
        return createSuccessResponse({
            message: 'ok',
            statusCode: 200,
            description: `Cycle ${cycleNo} has been unlocked at stand ${standNo} and slot ${slot}.`
        });
        
    } catch (error) {
        // Return the error response
        return createErrorResponse({
            message: 'Failed to unlock cycle.',
            statusCode: 500,
            description: `Error while unlocking cycle ${cycleNo}.`,
            suggestedAction: 'Try again later.'
        });
    }
}


async function updateCycleDetailsRemoved(cycleId, trackId) {
    const cycleRef = db.collection('cycles').where('cycleId', '==', cycleId);
    const cyclesSnapShot = await cycleRef.get();

    if (!cyclesSnapShot.empty) {
        const cyclesDoc = cyclesSnapShot.docs[0];
        const cyclesDocRef = cyclesDoc.ref;

        await cyclesDocRef.update({
            prevUsageIds: admin.firestore.FieldValue.arrayUnion(trackId),
            availability: false,
            slot: 0,
            standId: '',
            standIdentity: ''
        });

        return createSuccessResponse({
            message: 'Updated cycles db.',
            statusCode: 200
        });
    } else {
        throw createErrorResponse({
            message: 'Resource not found.',
            statusCode: 404,
            description: 'Cycle not found in the given cycleID.',
            suggestedAction: 'Provide correct cycleId.'
        });
    }
}

async function unlockCycleDetailsLocked(standId, standIdentity, slot, cycleId) {
    const cycleRef = db.collection('cycles').where('cycleId', '==', cycleId);
    const cyclesSnapShot = await cycleRef.get();

    if (!cyclesSnapShot.empty) {
        const cyclesDoc = cyclesSnapShot.docs[0];
        const cyclesDocRef = cyclesDoc.ref;

        await cyclesDocRef.update({
            availability: true,
            slot,
            standId,
            standIdentity
        });

        return createSuccessResponse({
            message: 'Updated cycles db.',
            statusCode: 200
        });
    } else {
        throw createErrorResponse({
            message: 'Resource not found.',
            statusCode: 404,
            description: 'Cycle not found in the given cycleID.',
            suggestedAction: 'Provide correct cycleId.'
        });
    }
}

module.exports = {
    getCycleDetails,
    unlockCycle,
    updateCycleDetailsRemoved,
    unlockCycleDetailsLocked,
}
