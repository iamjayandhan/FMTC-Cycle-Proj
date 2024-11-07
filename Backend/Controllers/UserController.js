const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

const userModels = require('../models/userModels');
const {createSuccessResponse, createErrorResponse} = require('../utils/responseUtils');

/**
 * Handles user registration.
 * 
 * Validates the input data, checks if the user already exists, creates a new user in the database,
 * and returns a success response. In case of any errors, it throws an AppError.
 * 
 * @async
 * @function userRegisterController
 * 
 * @param {Object} req - The request object containing user registration data.
 * @param {Object} res - The response object to send back the result.
 * @param {Function} next - The next middleware function to pass control to.
 * 
 * @returns {Promise<void>} Sends a response object if registration is successful.
 * 
 * @throws {AppError} Throws an error if user already exists or any other error occurs.
 */
async function userRegisterController(req, res, next) {
    try {
        const { rollNumber, userName, mobile, password } = req.body;

        if (!rollNumber || !userName || !mobile || !password) {
            throw createErrorResponse({
                message: 'Missing required fields.',
                statusCode: 400,
                description: 'One or more required fields are missing from the request.',
                suggestedAction: 'Please provide all the required fields (rollNumber, userName, mobile, password).'
            });
        }

        if (rollNumber.length < 4 || userName.length < 4 || mobile.length !== 10 || password.length < 4) {
            throw createErrorResponse({
                message: 'Invalid field lengths.',
                statusCode: 400,
                description: 'Some fields do not meet the required length constraints.',
                suggestedAction: 'Please ensure the following minimum lengths: Roll Number: 4, User Name: 4, Mobile: 10 digits, Password: 4.'
            });
        }
        

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const user = {
            rollNumber,
            userName,
            userId,
            mobile,
            password: hashedPassword,
            prevUsages: [],
        }

        const response = await userModels.userRegistration(user);

        return res.status(response.statusCode).json(response);
    } catch (err) {
        next(err); // Passing the error to the next middleware
    }
    
}

module.exports = {
    userRegisterController,
}
