const firebaseDb = require('../confs/dbConfig');

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

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
            description: 'Reqested Stand Details Not found in Database.',
            suggestedAction: 'NA'
        })
    }
}

module.exports = {
    getStandDetails
}
