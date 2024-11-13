const AppError = require('./AppError');
/**
 * Standardizes the response format for success responses.
 *
 * @param {Object} options - Options to customize the response.
 * @param {string} options.message - The main message of the response.
 * @param {number} options.statusCode - The HTTP status code for the response.
 * @param {string} [options.description] - An optional description for the response.
 * @param {Object} [options.data] - Optional data to include in the response.
 * @returns {Object} The standardized response object.
 */
function createSuccessResponse({ message, statusCode = 200, description = '', data = null }) {
    return {
        statusCode,
        message,
        description,
        data
    };
}

/**
 * Standardizes the response format for error responses.
 * Uses `AppError` for detailed error handling.
 *
 * @param {Object} options - Error details.
 * @param {string} options.message - The error message.
 * @param {number} options.statusCode - HTTP status code.
 * @param {string} [options.description] - Optional detailed description.
 * @param {string} [options.suggestedAction] - Suggested action to resolve the issue.
 * @returns {AppError} Returns an instance of AppError.
 */
function createErrorResponse({ message, statusCode, description = '', suggestedAction = '' }) {
    console.log(message)
    return new AppError({
        message,
        statusCode,
        description,
        suggestedAction
    });
}

module.exports = { createSuccessResponse, createErrorResponse };

