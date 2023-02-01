/**
 * The error class for the `Result`
 *
 * It accepts the error value from the `Result` instance
 */
export declare class ResultError<E> extends Error {
    /**
     * The error from the `Result`
     */
    readonly err: E;
    constructor(
    /**
     * The error from the `Result`
     */
    err: E, msg?: string);
    /**
     * Throws itself with the specified error
     */
    static throw<E>(err: E, msg?: string): never;
}
