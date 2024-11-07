/**
 * Custom error class to handle application-specific errors.
 * Extends the standard JavaScript Error class and adds properties
 * for HTTP status code, error description, and suggested action.
 * 
 * @class AppError
 * @extends {Error}
 */
class AppError extends Error {

    /**
     * Creates an instance of AppError.
     * 
     * @constructs AppError
     * @param {Object} options - Object containing error details.
     * @param {string} options.message - The main error message.
     * @param {number} [options.statusCode=500] - HTTP status code associated with the error. Defaults to 500.
     * @param {string} [options.description="An unexpected error occurred."] - Detailed description of the error.
     * @param {string} [options.suggestedAction="Please try again later."] - Suggested action for the client.
     */
    constructor({ message, statusCode = 500, description = "An unexpected error occurred.", suggestedAction = "Please try again later." }) {
        super(message);
        this.statusCode = statusCode;
        this.description = description;
        this.suggestedAction = suggestedAction;
    }

    /**
     * Formats the error as an object for API responses.
     * 
     * @returns {Object} JSON-formatted error Object
     * @returns {Object.error} The error details.
     * @returns {number} error.statusCode - HTTP status code of the error.
     * @returns {string} error.message - Main error message.
     * @returns {string} error.description - Detailed description of the error.
     * @returns {string} error.suggestedAction - Suggested action for the client.
     */
    toResponseFormat() {
        return {
            error: {
                statusCode: this.statusCode,
                message: this.message,
                description: this.description,
                suggestedAction: this.suggestedAction
            },
        };
    }
}

module.exports = AppError;
