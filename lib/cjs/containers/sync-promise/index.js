"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SyncPromise_instances, _SyncPromise_value, _SyncPromise_err, _SyncPromise_resolvers, _SyncPromise_rejecters, _SyncPromise_finallizers, _SyncPromise_status, _SyncPromise_isPending_get, _SyncPromise_isFullfilled_get, _SyncPromise_execResolve, _SyncPromise_execReject, _SyncPromise_next, _SyncPromise_resolve, _SyncPromise_reject, _SyncPromise_finally, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncPromise = void 0;
const utils_1 = require("../../utils");
/**
 * implements `Promise` interface but behaves synchronously if possible
 *
 * @example
 * console.log(1);
 * SyncPromise.resolve(2).then(console.log)
 * SyncPromise.resolve(SyncPromise.resolve(3)).then(console.log)
 * console.log(4);
 *
 * // the output will be: 1, 2, 3, 4
 */
class SyncPromise {
    constructor(executor) {
        _SyncPromise_instances.add(this);
        /**
         * the value from then/catch/resolve methods
         */
        _SyncPromise_value.set(this, void 0);
        /**
         * error in case `SyncPromise` rejects
         */
        _SyncPromise_err.set(this, void 0);
        /**
         * functions that will be invoked when `SyncPromise` resolves
         */
        _SyncPromise_resolvers.set(this, []);
        /**
         * functions that will be invoked when `SyncPromise` rejects
         */
        _SyncPromise_rejecters.set(this, []);
        /**
         * functions that will be invoked when `SyncPromise` resolves or rejects
         */
        _SyncPromise_finallizers.set(this, []);
        /**
         * current status of the `SyncPromise`
         *
         * it will be "resolved" in case `SyncPromise` resolves,
         * "rejected" in case it rejects and "pending" otherwise
         */
        _SyncPromise_status.set(this, 'pending');
        this[_a] = 'SyncPromise';
        /**
         * will be passed to the "executor" function in the `SyncPromise` constructor
         * does the same thing that it does in the native `Promise`
         *
         * @example
         *         that's it  \
                               \
         * new SyncPromise((resolve) => {});
         */
        _SyncPromise_execResolve.set(this, (value) => {
            if (!__classPrivateFieldGet(this, _SyncPromise_instances, "a", _SyncPromise_isPending_get))
                return;
            if ((0, utils_1.isPromiseLike)(value)) {
                value.then(resolve.bind(this), __classPrivateFieldGet(this, _SyncPromise_execReject, "f").bind(this));
            }
            else {
                resolve.call(this, value);
            }
            function resolve(value) {
                __classPrivateFieldSet(this, _SyncPromise_value, value, "f");
                __classPrivateFieldSet(this, _SyncPromise_status, 'fullfilled', "f");
                __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_resolve).call(this);
            }
        });
        /**
         * will be passed to the "executor" function in the `SyncPromise` constructor
         * does the same thing that it does in the native `Promise`
         *
         * @example
         *                 that's it  \
         *                             \
         * new SyncPromise((resolve, reject) => {});
         */
        _SyncPromise_execReject.set(this, (e) => {
            if (!__classPrivateFieldGet(this, _SyncPromise_instances, "a", _SyncPromise_isPending_get))
                return;
            __classPrivateFieldSet(this, _SyncPromise_err, e, "f");
            __classPrivateFieldSet(this, _SyncPromise_status, 'rejected', "f");
            __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_reject).call(this);
        });
        try {
            Promise.resolve(executor(__classPrivateFieldGet(this, _SyncPromise_execResolve, "f"), __classPrivateFieldGet(this, _SyncPromise_execReject, "f")))
                .catch(__classPrivateFieldGet(this, _SyncPromise_execReject, "f").bind(this));
        }
        catch (e) {
            __classPrivateFieldGet(this, _SyncPromise_execReject, "f").call(this, e);
        }
    }
    /**
     * determines if current status is 'rejected'
     */
    get isRejected() {
        return __classPrivateFieldGet(this, _SyncPromise_status, "f") === 'rejected';
    }
    /**
     * @see {@link Promise.resolve}
     */
    static resolve(value) {
        return new SyncPromise((resolve) => resolve(value));
    }
    /**
     * @see {@link Promise.reject}
     */
    static reject(err) {
        return new SyncPromise((_, reject) => reject(err));
    }
    /**
     * @see {@link Promise.all}
     */
    static all(iterable) {
        return new SyncPromise((resolve, reject) => {
            const arr = [...iterable], { length } = arr, result = new Array(length);
            let resolvedCount = 0;
            arr.map(SyncPromise.resolve).forEach((promise, idx) => {
                promise.then((val) => {
                    result[idx] = val;
                    if (++resolvedCount === length) {
                        resolve(result);
                    }
                }, reject);
            });
        });
    }
    /**
     * @see {@link Promise.any}
     */
    static any(iterable) {
        return new SyncPromise((resolve, reject) => {
            const arr = [...iterable], { length } = arr;
            if (length === 0) {
                reject(new AggregateError([], 'No Promise in SyncPromise.any was resolved'));
                return;
            }
            const errors = [];
            let rejectedCount = 0;
            arr.map(SyncPromise.resolve).forEach((promise, idx) => {
                promise.then(resolve, (err) => {
                    errors[idx] = err;
                    if (++rejectedCount === length) {
                        reject(new AggregateError(errors, 'No Promise in SyncPromise.any was resolved'));
                    }
                });
            });
        });
    }
    /**
     * @see {@link Promise.allSettled}
     */
    static allSettled(iterable) {
        return new SyncPromise((resolve) => {
            const arr = [...iterable], { length } = arr, result = new Array(length);
            let settledCount = 0;
            arr.map(SyncPromise.resolve).forEach((promise, idx) => {
                promise.then((value) => {
                    result[idx] = { status: 'fulfilled', value };
                    possiblyResolve();
                }, (reason) => {
                    result[idx] = { status: 'rejected', reason };
                    possiblyResolve();
                });
            });
            function possiblyResolve() {
                if (++settledCount === length) {
                    resolve(result);
                }
            }
        });
    }
    /**
     * @see {@link Promise.race}
     */
    static race(iterable) {
        return new SyncPromise((resolve, reject) => {
            for (const val of iterable) {
                SyncPromise.resolve(val).then(resolve, reject);
            }
        });
    }
    then(onFullfill, onReject) {
        return new SyncPromise((resolve, reject) => {
            __classPrivateFieldGet(this, _SyncPromise_resolvers, "f").push((val) => {
                try {
                    if (onFullfill == null) {
                        resolve((0, utils_1.cast)(val));
                    }
                    else {
                        resolve(onFullfill(val));
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
            __classPrivateFieldGet(this, _SyncPromise_rejecters, "f").push((err) => {
                try {
                    if (onReject == null) {
                        reject(err);
                    }
                    else {
                        resolve(onReject(err));
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
            __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_next).call(this);
        });
    }
    /**
     * @see {@link Promise.catch}
     */
    catch(onReject) {
        return new SyncPromise((resolve, reject) => {
            __classPrivateFieldGet(this, _SyncPromise_resolvers, "f").push((0, utils_1.cast)(resolve));
            __classPrivateFieldGet(this, _SyncPromise_rejecters, "f").push((err) => {
                try {
                    if (onReject == null) {
                        reject(err);
                    }
                    else {
                        resolve(onReject(err));
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
            __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_next).call(this);
        });
    }
    /**
     * @see {@link Promise.finally}
     */
    finally(cb) {
        return new SyncPromise((resolve, reject) => {
            __classPrivateFieldGet(this, _SyncPromise_resolvers, "f").push(resolve);
            __classPrivateFieldGet(this, _SyncPromise_rejecters, "f").push(reject);
            __classPrivateFieldGet(this, _SyncPromise_finallizers, "f").push(cb);
            __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_next).call(this);
        });
    }
    /**
     * returns current value if "status" is not "pending"
     * and throws an error otherwise
     */
    unwrap() {
        // TODO: replace with Result
        (0, utils_1.assert)(__classPrivateFieldGet(this, _SyncPromise_instances, "a", _SyncPromise_isFullfilled_get), 'cannot unwrap pending SyncPromise');
        return __classPrivateFieldGet(this, _SyncPromise_value, "f");
    }
}
exports.SyncPromise = SyncPromise;
_SyncPromise_value = new WeakMap(), _SyncPromise_err = new WeakMap(), _SyncPromise_resolvers = new WeakMap(), _SyncPromise_rejecters = new WeakMap(), _SyncPromise_finallizers = new WeakMap(), _SyncPromise_status = new WeakMap(), _SyncPromise_execResolve = new WeakMap(), _SyncPromise_execReject = new WeakMap(), _SyncPromise_instances = new WeakSet(), _a = Symbol.toStringTag, _SyncPromise_isPending_get = function _SyncPromise_isPending_get() {
    return __classPrivateFieldGet(this, _SyncPromise_status, "f") === 'pending';
}, _SyncPromise_isFullfilled_get = function _SyncPromise_isFullfilled_get() {
    return __classPrivateFieldGet(this, _SyncPromise_status, "f") === 'fullfilled';
}, _SyncPromise_next = function _SyncPromise_next() {
    switch (__classPrivateFieldGet(this, _SyncPromise_status, "f")) {
        case 'fullfilled': {
            __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_resolve).call(this);
            break;
        }
        case 'rejected': {
            __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_reject).call(this);
            break;
        }
    }
}, _SyncPromise_resolve = function _SyncPromise_resolve() {
    __classPrivateFieldGet(this, _SyncPromise_resolvers, "f").forEach(cb => cb(__classPrivateFieldGet(this, _SyncPromise_value, "f")));
    __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_finally).call(this);
}, _SyncPromise_reject = function _SyncPromise_reject() {
    __classPrivateFieldGet(this, _SyncPromise_rejecters, "f").forEach(cb => cb(__classPrivateFieldGet(this, _SyncPromise_err, "f")));
    __classPrivateFieldGet(this, _SyncPromise_instances, "m", _SyncPromise_finally).call(this);
}, _SyncPromise_finally = function _SyncPromise_finally() {
    __classPrivateFieldGet(this, _SyncPromise_finallizers, "f").forEach(cb => cb());
};
