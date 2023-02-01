var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Result_instances, _Result_unwrapF;
import { isFunction } from 'utils';
import { Option } from 'containers';
import { ResultError } from './error';
export { ResultError };
/**
 * This class represents two states: everything is either `Ok` or there's an `Err`
 */
export class Result {
    constructor(
    /**
     * Current value
     * It will have the actual value if the state is `Ok`,
     * otherwise if will be `null`
     */
    val, 
    /**
     * Current error
     * It will have the actual value if the state is `Err`,
     * otherwise if will be `null`
     */
    error, 
    /**
     * Current state
     */
    state) {
        this.val = val;
        this.error = error;
        this.state = state;
        _Result_instances.add(this);
    }
    /**
     * Returns the `Result` with the `Ok` state and the specified value
     */
    static Ok(val) {
        return new Result(val, null, 'Ok');
    }
    /**
     * Returns the `Result` with the `Err` state and the specified error
     */
    static Err(err) {
        return new Result(null, err, 'Err');
    }
    /**
     * Determines if the current state is `Ok`
     *
     * @example
     * Result.Ok(21).isOk(); // true
     * Result.Err(21).isOk(); // false
     */
    isOk() {
        return this.state == 'Ok';
    }
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
    isOkAnd(predicate) {
        return this.match({
            Ok: predicate,
            Err: () => false,
        });
    }
    /**
     * Determines if the current state is `Err`
     *
     * @example
     * Result.Ok(21).isErr(); // false
     * Result.Err(21).isErr(); // true
     */
    isErr() {
        return this.state == 'Err';
    }
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
    isErrAnd(predicate) {
        return this.match({
            Ok: () => false,
            Err: predicate,
        });
    }
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
    match(obj) {
        return this.isOk() ? obj.Ok(this.val) : obj.Err(this.error);
    }
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
    iter() {
        return this.ok().iter();
    }
    /**
     * Returns the current value if the state is `Ok`, otherwise throws the `ResultError` with the current error
     *
     * @example
     * Result.Ok(21).unwrap(); // 21
     * Result.Err('foo').unwrap(); // ResultError('foo')
     */
    unwrap() {
        return this.match({
            Ok: (val) => val,
            Err: ResultError.throw,
        });
    }
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
    unwrapErr(msg = 'Cannot apply "unwrapErr" to Ok') {
        return this.match({
            Ok: () => { throw new Error(msg); },
            Err: (err) => err,
        });
    }
    unwrapOr(val) {
        return this.match({
            Ok: (val) => val,
            Err: __classPrivateFieldGet(this, _Result_instances, "m", _Result_unwrapF).call(this, val),
        });
    }
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
    map(cb) {
        return this.match({
            Ok: (val) => Ok(cb(val)),
            Err: (Err),
        });
    }
    mapOr(val, cb) {
        return this.match({
            Ok: cb,
            Err: __classPrivateFieldGet(this, _Result_instances, "m", _Result_unwrapF).call(this, val),
        });
    }
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
    mapErr(cb) {
        return this.match({
            Ok: (Ok),
            Err: (err) => Err(__classPrivateFieldGet(this, _Result_instances, "m", _Result_unwrapF).call(this, cb)(err)),
        });
    }
    /**
     * If the current state is `Ok` retuns `Option.Ok` with the current value
     * If the current state is `Err` retuns `Option.None`
     *
     * @example
     * Result.Ok(21).ok(); // Some(21)
     * Result.Ok(null).ok(); // None
     * Result.Err(21).ok(); // None
     */
    ok() {
        return this.match({
            Ok: (Option.Some),
            Err: (Option.None),
        });
    }
    /**
     * If the current state is `Ok` retuns `Option.None`
     * If the current state is `Err` retuns `Option.Some` with the current error
     *
     * @example
     * Result.Ok(21).err(); // None
     * Result.Err(21).err(); // Some(21)
     */
    err() {
        return this.match({
            Ok: (Option.None),
            Err: (Option.Some),
        });
    }
    and(val) {
        return this.match({
            Ok: __classPrivateFieldGet(this, _Result_instances, "m", _Result_unwrapF).call(this, val),
            Err: (Err),
        });
    }
    or(res) {
        return this.match({
            Ok: (Ok),
            Err: __classPrivateFieldGet(this, _Result_instances, "m", _Result_unwrapF).call(this, res),
        });
    }
}
_Result_instances = new WeakSet(), _Result_unwrapF = function _Result_unwrapF(target) {
    return (val) => isFunction(target) ? target(val) : target;
};
/**
 * Shortland for `Result.Ok(val)`
 */
export function Ok(val) {
    return Result.Ok(val);
}
/**
 * Shortland for `Result.Err(err)`
 */
export function Err(err) {
    return Result.Err(err);
}
