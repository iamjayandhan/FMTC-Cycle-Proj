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
async function getStandDetails(standId) {
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


module.exports = {
    getStandDetails
}
