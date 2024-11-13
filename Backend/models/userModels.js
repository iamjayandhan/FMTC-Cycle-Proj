const admin = require('firebase-admin');

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
        throw createErrorResponse({
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
        throw createErrorResponse({
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

/**
 * Checks the current usage status of a user.
 * This function queries the "usage-logs" collection in Firestore to determine if the user is currently riding a cycle.
 * If the user is riding a cycle, it throws an error with relevant information; otherwise, it returns a success response indicating the user is idle.
 * 
 * @async
 * @function checkCurrUsage
 * @param {string} userId - The ID of the user whose cycle usage status is being checked.
 * @returns {Promise<Object>} - Returns a success response if the user is idle, or throws an error if the user is currently using a cycle.
 * @throws {Error} - Throws an error with a 409 status code if the user is currently using a cycle.
 */
async function checkCurrUsage(userId) {
    console.log("Checking current Usage")
    const currUsageRef = firebaseDb.collection('user-logs').where('userId', '==', userId);
    const querySnapShot = await currUsageRef.get();

    if (!querySnapShot.empty) {
        const currUsageDoc = querySnapShot.docs[0];
        const currUsageData = currUsageDoc.data();

        console.log(currUsageData)

        if (currUsageData.status === "On-Road..") {
            throw createErrorResponse({
                message: 'Resource not available.',
                statusCode: 409,
                description: `User Currently riding the cycle`,
                suggestedAction: 'Please leave the cycle in stand, and book again.'
            });
        } else {
            return createSuccessResponse({
                message: 'ok',
                statusCode: 200,
                description: 'User is ideal now.',
            });
        }
    } else {
        return createSuccessResponse({
            message: 'ok',
            statusCode: 200,
            description: 'User is ideal now.',
        });
    }
}

async function addUserHistory(userId, trackId) {
    const usersRef = firebaseDb.collection('users').where('userId', '==', userId);
    const usersSnapShot = await usersRef.get();

    if (!usersSnapShot.empty) {
        const userDocs = usersSnapShot.docs[0];
        const userDocsRef = userDocs.ref;

        await userDocsRef.update({
            prevUsages: admin.firestore.FieldValue.arrayUnion(trackId),
        });

        return createSuccessResponse({
            message: 'user details updated.',
            statusCode: 200
        });
    } else {
        throw createErrorResponse({
            message: 'Resource not found.',
            statusCode: 404,
            description: 'User not found in the given userId.',
            suggestedAction: 'Provide correct userId.'
        });
    }
}

module.exports = {
    userRegistration,
    verifyCredentials,
    checkCurrUsage,
    addUserHistory,
}
