const admin = require('firebase-admin');

const firebaseDb = require('../confs/dbConfig').db;

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

/**
 * Retrieves details of a specified stand from the Firestore database.
 * Returns a success response with stand data if found; otherwise, throws an error.
 * 
 * @async
 * @function getStandDetails
 * @param {string} standId - The unique identifier of the stand to retrieve.
 * @returns {Promise<object>} - A Promise that resolves to an object with stand details if found.
 * @throws {AppError} - Throws an error response if the stand does not exist in the database.
 */
async function getStandDetails(standId, standIdentity = '') {
    if(standIdentity != '') {
        const standIdentityRef = firebaseDb.collection('stands')
        .where('standIdentity', '==', standIdentity);
        const standIdentitySnapShot = await standIdentityRef.get();

        if (!standIdentitySnapShot.empty) {
            const standIdentityDocs = standIdentitySnapShot.docs[0];
            return createSuccessResponse({
                message: 'ok',
                statusCode: 200,
                data: standIdentityDocs.data()
            });
        } else {
            return createErrorResponse({
                message: 'Resource not found.',
                statusCode: 404,
                description: 'Stand not found in the given standIdentity.',
                suggestedAction: 'Provide correct stand Identity.'
            });
        }
    }

    const standRef = firebaseDb.collection('stands').where('standId', '==', standId);
    const standSnapShot = await standRef.get();

    if (!standSnapShot.empty) {
        const standDoc = standSnapShot.docs[0];
        const standData = standDoc.data();

        return createSuccessResponse({
            message: 'ok',
            statusCode: 200,
            description: 'Stand Details fetched Successfully.',
            data: standData
        });
    } else {
        throw createErrorResponse({
            message: 'Stand Not exists.',
            statusCode: 404,
            description: 'Requested Stand Details Not found in Database.',
            suggestedAction: 'NA'
        });
    }
}

async function updateStandDetailsRemoved(cycleNo, standId) {
    const standsRef = firebaseDb.collection('stands').where('standId', '==', standId);
    const standsSnapShot = await standsRef.get();

    if (!standsSnapShot.empty) {
        const standsDoc = standsSnapShot.docs[0];
        const standsDocRef = standsDoc.ref;

        await standsDocRef.update({
            availability: admin.firestore.FieldValue.increment(-1),
            [`cycles.${cycleNo}`]: admin.firestore.FieldValue.delete()
        });

        return createSuccessResponse({
            message: 'updated stand details.',
            statusCode: 200
        });
    } else {
        throw createErrorResponse({
            message: 'Resource not found.',
            statusCode: 404,
            description: 'Stand not found in the given standID.',
            suggestedAction: 'Provide correct standId.'
        });
    }
}

async function updateStandDetailsLocked(cycleNo, standId, cycleID) {
    const standsRef = firebaseDb.collection('stands').where('standId', '==', standId);
    const standsSnapShot = await standsRef.get();

    if (!standsSnapShot.empty) {
        const standsDoc = standsSnapShot.docs[0];
        const standsDocRef = standsDoc.ref;

        await standsDocRef.update({
            availability: admin.firestore.FieldValue.increment(+1),
            [`cycles.${cycleNo}`]: cycleID
        });

        return createSuccessResponse({
            message: 'updated stand details.',
            statusCode: 200
        });
    } else {
        throw createErrorResponse({
            message: 'Resource not found.',
            statusCode: 404,
            description: 'Stand not found in the given standID.',
            suggestedAction: 'Provide correct standId.'
        });
    }
}

module.exports = {
    getStandDetails,
    updateStandDetailsRemoved,
    updateStandDetailsLocked,
}
