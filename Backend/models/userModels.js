const firebaseDb = require('../confs/dbConfig').db;
const bcrypt = require('bcrypt');

const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

/**
 * Registers a new user in the Firestore database.
 * If the user already exists (based on user ID), an error is thrown.
 * 
 * @param {Object} user - The user details to register in the database.
 * @param {string} user.rollNumber - The user's Roll Number.
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
    })
}

/**
 * Verifies user credentials by checking the Firestore database for a matching roll number and password.
 * If the user does not exist or the password is incorrect, an error response is returned.
 *
 * @param {string} rollNumber - The user's roll number to be verified.
 * @param {string} password - The user's password for authentication (plain text to be compared with hashed password).
 * @returns {Promise<object>} - A Promise that resolves to an object containing a success message and user data, 
 *                              e.g., { message: 'success', data: userData }.
 * @throws {AppError} - Throws an application error if the user does not exist or if the password is incorrect.
 */

async function verifyCredentials(rollNumber, password) {
    const userDetailsRef = firebaseDb.collection('users').where('rollNumber', '==', rollNumber);
    const querySnapShot = await userDetailsRef.get();

    if (querySnapShot.empty) {
        return createErrorResponse({
            message: 'User not exists with this Roll Number.',
            statusCode: 404,
            description: 'No user found with this roll number. Try another.',
            suggestedAction: 'Try register with this Roll number and try again.'
        });
    }

    const userDoc = querySnapShot.docs[0];
    const userData = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
        return createErrorResponse({
            message: 'Invalid Credentials.',
            statusCode: 401,
            description: 'The password provided is incorrect.',
            suggestedAction: 'Please try again or reset your password.'
        });
    }

    return {
        message: 'success',
        data: userData
    }
}

module.exports = {
    userRegistration,
    verifyCredentials,
}
