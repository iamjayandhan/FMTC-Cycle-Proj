const firebaseDb = require('../confs/dbConfig').db;

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

/**
 * Registers a new user in the Firestore database.
 * If the user already exists (based on user ID), an error is thrown.
 * 
 * @param {Object} user - The user details to register in the database.
 * @param {string} user.rollNumber - The user's rollNumber.
 * @param {string} user.userName - The user's name.
 * @param {string} user.userId - The unique ID of the user.
 * @param {string} user.mobile - The user's mobile number.
 * @param {string} user.password - The hashed password of the user.
 * @param {Array} user.prevTracks - List of IDs of previous usage tracks.
 * @returns {Promise<object>} A promise that resolves to the newly created user document.
 * @throws {AppError} Throws an `AppError` if the user already exists or if there's an issue accessing Firestore.
 */
async function userRegistration(user) {
    const rollNumberRef = firebaseDb.collection('users').where('rollNumber', '==', user.rollNumber);
    const rollNumberSnapshot = await rollNumberRef.get();

    const mobileRef = firebaseDb.collection('users').where('mobile', '==', user.mobile);
    const mobileSnapshot = await mobileRef.get();

    // If either rollNumber or mobile exists, throw an error
    if (!rollNumberSnapshot.empty || !mobileSnapshot.empty) {
        throw createErrorResponse({
            message: 'User already exists.',
            statusCode: 409,
            description: 'A user already exists with the same roll number or mobile number.',
            suggestedAction: 'Please try changing the roll number or mobile number.'
        });
    }

    const userRef = firebaseDb.collection('users').doc(user.userId);
    await userRef.set(user);
    return createSuccessResponse({
        message: 'User registered Successfully.',
        statusCode: 201,
        description: 'User has been created with given deatils.',
        suggestedAction: 'null'
    })
}

module.exports = {
    userRegistration,
}
