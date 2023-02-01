import { Option, SyncIter } from 'containers';
import { ResultError } from './error';
import type { Traits, MatchObject, State } from './interface';
export { ResultError };
/**
 * This class represents two states: everything is either `Ok` or there's an `Err`
 */
export declare class Result<T = unknown, E = unknown> implements Traits<T> {
    #private;
    /**
     * Current value
     * It will have the actual value if the state is `Ok`,
     * otherwise if will be `null`
     */
    protected val: T;
    /**
     * Current error
     * It will have the actual value if the state is `Err`,
     * otherwise if will be `null`
     */
    protected error: E;
    /**
     * Current state
     */
    protected readonly state: State;
    protected constructor(
    /**
     * Current value
     * It will have the actual value if the state is `Ok`,
     * otherwise if will be `null`
     */
    val: T, 
    /**
     * Current error
     * It will have the actual value if the state is `Err`,
     * otherwise if will be `null`
     */
    error: E, 
    /**
     * Current state
     */
    state: State);
    /**
     * Returns the `Result` with the `Ok` state and the specified value
     */
    static Ok<T, E>(val: T): Result<T, E>;
    /**
     * Returns the `Result` with the `Err` state and the specified error
     */
    static Err<E, T>(err: E): Result<T, E>;
    /**
     * Determines if the current state is `Ok`
     *
     * @example
     * Result.Ok(21).isOk(); // true
     * Result.Err(21).isOk(); // false
     */
    isOk(): boolean;
    /**
     * Determines if the current state is `Ok` and the predicate returns `true`
     *
     * @param predicate - Callback that will be invoked if the current state is `Ok`
     * It accepts the current value and should return `boolean`
     *
     * @example
     * Result.Ok(21).isOkAnd((val) => val > 0); // true
     * Result.Ok(21).isOkAnd((val) => val < 0); // false
     * Resutl.Err(21).isOkAnd((val) => val < 0); // false
     */
    isOkAnd(predicate: (val: T) => boolean): boolean;
    /**
     * Determines if the current state is `Err`
     *
     * @example
     * Result.Ok(21).isErr(); // false
     * Result.Err(21).isErr(); // true
     */
    isErr(): boolean;
    /**
     * Determines if the current state is `Err` and the predicate returns `true`
     *
     * @param predicate - Callback that will be invoked if the current state is `Err`
     * It accepts the current error and should return `boolean`
     *
     * @example
     * Result.Err(21).isErrAnd((val) => val > 0); // true
     * Result.Err(21).isErrAnd((val) => val < 0); // false
     * Resutl.Ok(21).isErrAnd((val) => val < 0); // false
     */
    isErrAnd(predicate: (err: E) => boolean): boolean;
    /**
     * The main way to determine the current state and manage the code flow
     *
     * @param obj - The object of handlers for every state inside the `Result`
     * Each handler can return a value that can be used after matching
     *
     * @example
     * Result.Ok(21).match({
     *   Ok: (val) => console.log('we are good'),
     *   Err: (err) => console.log('error'),
     * });
     *
     * @example
     * const num = Result.Err(21).match({
     *   Ok: (val) => val,
     *   Err: (err) => err * 2,
     * }); // 42
     */
    match<R>(obj: MatchObject<T, E, R>): R;
    /**
     * Converts `Result` to `Option` then calls `Option.iter` method
     *
     * @example
     * const
     *   iterable = Result.Ok(21).iter(),
     *   iter = iterable[Symbol.iterator]();
     *
     * iter.next(); // { done: false, value: Some(21) }
     * iter.next(); // { done: true, value: undefined }
     *
     * @example
     * const
     *   iterable = Resut.Err('foo').iter(),
     *   iter = iterable[Symbol.iterator]();
     *
     * iter.next(); // { done: false, value: None }
     * iter.next(); // { done: true, value: undefined }
     */
    iter(): SyncIter<Option<T>>;
    /**
     * Returns the current value if the state is `Ok`, otherwise throws the `ResultError` with the current error
     *
     * @example
     * Result.Ok(21).unwrap(); // 21
     * Result.Err('foo').unwrap(); // ResultError('foo')
     */
    unwrap(): T | never;
    /**
     * Returns the current error if the state is `Err`, otherwise throws the an exception
     *
     * @msg - Custom error message in case of exception
     *
     * @example
     * Result.Ok(21).unwrapErr(); // Error('Cannot apply "unwrapErr" to Ok')
     * Result.Ok(21).unwrapErr('custom message'); // Error('custom message')
     * Result.Err('foo').unwrapErr(); // 'foo'
     */
    unwrapErr(msg?: string): E | never;
    /**
     * Returns the current value if the state is `Ok`, otherwise returns the specified value
     *
     * @param val - The value that will be returned in case of of current state is `Err`
     *
     * @example
     * Result.Ok(21).unwrapOr(0); // 21
     * Result.Err(21).unwrapOr(0); // 0
     */
    unwrapOr(val: T): T;
    /**
     * Returns the current value if the state is `Ok`, otherwise returns the result of the callback
     *
     * @param cb - The callback that returns a value in case of current state is `Err`
     *
     * @example
     * Result.Ok(21).unwrapOr(() => 0); // 21
     * Result.Err(21).unwrapOr((err) => err * 2); // 42
     */
    unwrapOr(cb: (err: E) => T): T;
    /**
     * If the current state is `Err`, returns `Err` with the current error
     * If the current state is `Ok`, applies the specified function to the current value and returns `Ok` with the new value
     *
     * @param cb - The callback that accepts current value and transforms it to a new one
     *
     * @example
     * Result.Ok(21).map(val => val * 2); // Ok(42)
     * Result.Err(21).map(val => val * 2); // Err(21)
     */
    map<R>(cb: (value: T) => R): Result<R, E>;
    /**
     * If the current state is `Err`, returns the specified value
     * If the current state is `Ok`, applies the specified function to the current value and returns the new value
     *
     * @param init - The value that will be returned in case of current state is `Err`
     * @param cb - The callback that accepts curent value and transforms it to a new one
     *
     * @example
     * Result.Ok(21).mapOr(0, (val) => val * 2); // 42
     * Result.Err(21).mapOr(0, (val) => val * 2); // 0
     */
    mapOr<R>(init: R, cb: (val: T) => R): R;
    /**
     * If the current state is `Err`, returns the result of the callback
     * If the current state is `Ok`, applies the specified function to the current value and returns the new value
     *
     * @param getInit - The function that returns a value in case of current state is `Err`
     * @param cb - The callback that accepts curent value and transforms it to a new one
     *
     * @example
     * Result.Ok(21).mapOr(() => 0, (val) => val * 2); // 42
     * Result.Err(21).mapOr((err) => err * 2, (val) => val * 2); // 42
     */
    mapOr<R>(getInit: (err: E) => R, cb: (val: T) => R): R;
    /**
     * If the current state is `Ok`, returns `Ok` with the current value
     * If the current state is `Err`, applies the specified function to the current error and returns `Err` with the new error
     *
     * @param cb - The callback that accepts curent error and transforms it to a new one
     *
     * @example
     * Result.Ok(21).mapErr((val) => val * 2); // Ok(21)
     * Result.Err(21).mapErr((val) => val * 2); // Err(42)
     */
    mapErr<R>(cb: (value: E) => R): Result<T, R>;
    /**
     * If the current state is `Ok` retuns `Option.Ok` with the current value
     * If the current state is `Err` retuns `Option.None`
     *
     * @example
     * Result.Ok(21).ok(); // Some(21)
     * Result.Ok(null).ok(); // None
     * Result.Err(21).ok(); // None
     */
    ok(): Option<T>;
    /**
     * If the current state is `Ok` retuns `Option.None`
     * If the current state is `Err` retuns `Option.Some` with the current error
     *
     * @example
     * Result.Ok(21).err(); // None
     * Result.Err(21).err(); // Some(21)
     */
    err(): Option<E>;
    /**
     * If the current state is `Err` returns `Err`, otherwise returns the specified `Result`
     *
     * @param res - The `Result` that will be returned in case of current state is `Err`
     *
     * @example
     * Result.Ok(1).and(Result.Ok(3)); // Ok(3)
     * Result.Ok(1).and(Result.Err(2)); // Err(2)
     * Result.Err(1).and(Result.Ok(1)); // Err(1)
     * Result.Err(1).and(Result.Err(2)); // Err(1)
     */
    and<R>(val: Result<R, E>): Result<R, E>;
    /**
     * If the current state is `Err` returns `Err`, otherwise returns the `Result` returned from the callback
     *
     * @param cb - The callback that returns `Result`
     * It will be invoked with the current value in case of current state is `Err`
     *
     * @example
     * Result.Ok(1).and((val) => Result.Ok(val + 2)); // Ok(3)
     * Result.Ok(1).and((val) => Result.Err(2)); // Err(2)
     * Result.Err(1).and((val) => Result.Ok(1)); // Err(1)
     * Result.Err(1).and((val) => Result.Err(2)); // Err(1)
     */
    and<R>(cb: (val: T) => Result<R, E>): Result<R, E>;
    /**
     * Returns `Ok` with the current value if exists, otherwise returns the specified `Result`
     *
     * @param res - The `Result` that will be returned in case of current state is `Err`
     *
     * @example
     * Result.Ok(1).or(Result.Ok(2)); // Ok(1)
     * Result.Ok(1).or(Reslt.Err(2)); // Ok(1)
     * Result.Err(1).or(Result.Ok(1)); // Ok(1)
     * Result.Err(1).or(Reslt.Err(2)); // Err(2)
     */
    or(res: Result<T, E>): Result<T, E>;
    /**
     * Returns `Ok` with the current value if exists, otherwise returns `Result` returned from the callback
     *
     * @param getRes - The callback that returns `Result`
     * It will be called in case of current state is `Err`
     *
     * @example
     * Result.Ok(1).or(() => Result.Ok(2)); // Ok(1)
     * Result.Ok(1).or(() => Reslt.Err(2)); // Ok(1)
     * Result.Err(1).or((err) => Result.Ok(err + 1)); // Ok(2)
     * Result.Err(1).or((err) => Result.Err(err + 2)); // Err(3)
     */
    or(getRes: (err: E) => Result<T, E>): Result<T, E>;
}
/**
 * Shortland for `Result.Ok(val)`
 */
export declare function Ok<T, E>(val: T): Result<T, E>;
/**
 * Shortland for `Result.Err(err)`
 */
export declare function Err<E, T>(err: E): Result<T, E>;
