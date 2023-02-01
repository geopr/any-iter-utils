/**
 * The error class for the `Result`
 *
 * It accepts the error value from the `Result` instance
 */
export class ResultError<E> extends Error {
  constructor(
    /**
     * The error from the `Result`
     */
    public readonly err: E,
    msg = 'Cannot unwrap Err',
  ) {
    super(msg);
  }

  /**
   * Throws itself with the specified error
   */
  static throw<E>(err: E, msg?: string): never {
    throw new ResultError(err, msg);
  }
}
