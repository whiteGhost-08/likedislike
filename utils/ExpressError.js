class ExpressError extends Error { // extends regular built-in error
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = ExpressError;