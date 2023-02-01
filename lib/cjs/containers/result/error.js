"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultError = void 0;
/**
 * The error class for the `Result`
 *
 * It accepts the error value from the `Result` instance
 */
class ResultError extends Error {
    constructor(
    /**
     * The error from the `Result`
     */
    err, msg = 'Cannot unwrap Err') {
        super(msg);
        this.err = err;
    }
    /**
     * Throws itself with the specified error
     */
    static throw(err, msg) {
        throw new ResultError(err, msg);
    }
}
exports.ResultError = ResultError;
