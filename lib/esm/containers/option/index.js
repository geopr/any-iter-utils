var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Option_instances, _Option_unwrapF;
import { fromGen, isFunction } from 'utils';
import { Result, SyncIter } from 'containers';
/**
 * This class represents two states: a value either exists or not
 *
 * The inexistance of a value is determined by checking it like that: `val == null`
 *
 * If the value exists `Option` contains `Some` state, otherwise `None`
 */
export class Option {
    constructor(
    /**
     * Current value
     */
    value) {
        this.value = value;
        _Option_instances.add(this);
    }
    /**
     * Represents existance of a value
     *
     * @returns new `Option` with the specified value
     */
    static Some(val) {
        return new Option(val);
    }
    /**
     * Represents inexistance of a value
     *
     * @returns new empty `Option`
     */
    static None() {
        return new Option();
    }
    /**
     * Determines if the current state is `None`
     *
     * @example
     * Option.Some(21).isNone(); // false
     * Option.None().isNone(); // true
     */
    isNone() {
        return this.value == null;
    }
    /**
     * Determines if the current state is `Some`
     *
     * @example
     * Option.Some(21).isSome(); // true
     * Option.None().isSome(); // false
     */
    isSome() {
        return !this.isNone();
    }
    /**
     * Determines if the current state is `Some` and the predicate returns `true`
     *
     * @param predicate - Callback that will be invoked if the current state is `None`
     * It accepts the current value and should return `boolean`
     *
     * @example
     * Option.Some(21).isSomeAnd((val) => val > 0); // true
     * Option.Some(21).isSomeAnd((val) => val < 0); // false
     * Option.None().isSomeAnd((val) => val < 0); // false
     */
    isSomeAnd(predicate) {
        return this.match({
            Some: predicate,
            None: () => false,
        });
    }
    /**
     * Returns the current value if the state is `Some`, otherwise throws and exception
     *
     * @param msg - Custom error message in case of exception
     *
     * @example
     * Option.Some(21).unwrap(); // 21
     * Option.None().unwrap(); // Error('Cannot unwrap Option.None')
     * Option.None('custom message').unwrap(); // Error('custom message')
     */
    unwrap(msg = 'Cannot unwrap Option.None') {
        return this.match({
            Some: (val) => val,
            None: () => { throw new Error(msg); },
        });
    }
    unwrapOr(val) {
        return this.match({
            Some: v => v,
            None: () => __classPrivateFieldGet(this, _Option_instances, "m", _Option_unwrapF).call(this, val),
        });
    }
    /**
     * The main way to determine the current state and manage the code flow
     *
     * @param obj - The object of handlers for every state inside the `Option`
     * Each handler can return a value that can be used after matching
     *
     * @example
     * Option.Some(21).match({
     *   Some: (val) => console.log(`value ${value} exists`),
     *   None: () => console.log('value does not exist'),
     * });
     *
     * @example
     * const num = Option.None().match({
     *   Some: (val) => val,
     *   None: () => 0,
     * }); // 0
     */
    match(obj) {
        return this.isSome() ? obj.Some(this.value) : obj.None();
    }
    /**
     * If the current state is `None`, returns `None`
     * If the current state is `Some` and the predicate returns `true`, returns `Some` with the current value,
     * otherwise returns `None`
     *
     * @param predicate - The predicate function that accepts current value if exists
     *
     * @example
     * Option.Some(21).filter(val => val > 0); // Some(21)
     * Option.Some(21).filter(val => val < 0); // None
     * Option.None().filter(() => true); // None
     */
    filter(predicate) {
        return this.match({
            Some: (val) => predicate(val) ? Some(val) : None(),
            None: (None),
        });
    }
    /**
     * If the current state is `None`, returns `None`
     * If the current state is `Some`, applies the specified function to the current value and returns `Some` with the new value
     *
     * @param cb - The callback that accepts current value and transforms it to a new one
     *
     * @example
     * Option.Some(21).map(val => val * 2); // Some(42)
     * Option.Some(21).map(() => null); // Some(null) -> None
     * Option.None().map(val => val * 2); // None
     */
    map(cb) {
        return this.match({
            Some: (val) => Some(cb(val)),
            None: (None),
        });
    }
    mapOr(init, cb) {
        return this.match({
            Some: cb,
            None: () => __classPrivateFieldGet(this, _Option_instances, "m", _Option_unwrapF).call(this, init),
        });
    }
    okOr(val) {
        return this.match({
            Some: (Result.Ok),
            None: () => Result.Err(__classPrivateFieldGet(this, _Option_instances, "m", _Option_unwrapF).call(this, val)),
        });
    }
    /**
     * Converts `Option` to `SyncIter` that yields the current instance of `Option` once
     *
     * @example
     * const
     *   iterable = Option.Some(21).iter(),
     *   iter = iterable[Symbol.iterator]();
     *
     * iter.next(); // { done: false, value: Some<21> }
     * iter.next(); // { done: true, value: undefined }
     *
     * @example
     * const
     *   iterable = Option.None().iter(),
     *   iter = iterable[Symbol.iterator]();
     *
     * iter.next(); // { done: false, value: None }
     * iter.next(); // { done: true, value: undefined }
     */
    iter() {
        const that = this;
        return SyncIter.from(fromGen(function* () { yield that; }));
    }
    and(val) {
        return this.match({
            Some: (curr) => isFunction(val) ? val(curr) : val,
            None: (None),
        });
    }
    or(val) {
        return this.match({
            Some: (Some),
            None: () => __classPrivateFieldGet(this, _Option_instances, "m", _Option_unwrapF).call(this, val),
        });
    }
    xor(val) {
        return this.match({
            Some: (curr) => __classPrivateFieldGet(this, _Option_instances, "m", _Option_unwrapF).call(this, val).isSome() ? None() : Some(curr),
            None: () => {
                const opt = __classPrivateFieldGet(this, _Option_instances, "m", _Option_unwrapF).call(this, val);
                return opt.isSome() ? opt : None();
            },
        });
    }
}
_Option_instances = new WeakSet(), _Option_unwrapF = function _Option_unwrapF(val) {
    return isFunction(val) ? val() : val;
};
/**
 * Shortland for `Option.Some(val)`
 */
export function Some(value) {
    return Option.Some(value);
}
/**
 * Shortland for `Option.None`
 */
export function None() {
    return Option.None();
}
