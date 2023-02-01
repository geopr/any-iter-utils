"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromiseLike = exports.isAnyIterator = exports.isAnyIterableIterator = exports.isAnyIterable = exports.isAsyncIterable = exports.isIterable = exports.isPromise = exports.isMap = exports.isSet = exports.isAnyGeneratorFunction = exports.isAsyncGeneratorFunction = exports.isGeneratorFunction = exports.isFunction = exports.isPlainObject = exports.isObject = exports.isString = exports.isNumber = void 0;
/**
 * determines if passed value is number
 * it uses native "typeof" operator to do that
 *
 * @example
 * isNumber(1); // true
 * isNumber(Infinity); // true
 * isNumber(NaN); // true
 * isNumber(''); // false
 */
function isNumber(value) {
    return typeof value === 'number';
}
exports.isNumber = isNumber;
/**
 * determines if passed value is string
 * it uses native "typeof" operator to do that
 *
 * @example
 * isNumber(1); // false
 * isNumber(''); // true
 */
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
/**
 * determines if passed value is object
 * it uses native "typeof" operator to do that
 * it also checks for null (which is not an object)
 *
 * @example
 * isObject([]); // true
 * isObject(new Set()); // true
 * isObject({}); // true
 * isObject(null); // false
 * isObject(1); // false
 */
function isObject(value) {
    return value !== null && typeof value === 'object';
}
exports.isObject = isObject;
/**
 * determines if passed value is anything that can be made using "{}" literals
 *
 * @example
 * isPlainObject([]); // false
 * isPlainObject(null); // false
 * isPlainObject(1); // false
 * isPlainObject({}); // true
 * isPlainObject(new Set()); // true
 */
function isPlainObject(value) {
    return isObject(value) && !Array.isArray(value);
}
exports.isPlainObject = isPlainObject;
/**
 * determines if passed value is any function
 * it uses native "typeof" operator to do that
 *
 * @example
 * isFunction(function() {}); // true
 * isFunction(async function() {}); // true
 *
 * isFunction(() => {}); // true
 * isFunction(async () => {}); // true
 *
 * isFunction(function* () {}); // true
 * isFunction(async function* () {}); // true
 *
 * isFunction(1); // false
 * isFunction([]); // false
 */
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
/**
 * determines if passed value is `GeneratorFunction`
 *
 * @example
 * isGeneratorFunction(function* () {}); // true
 * isGeneratorFunction(function() {}); // false
 * isGeneratorFunction(async function() {}); // false
 * isGeneratorFunction(async function* () {}); // false
 */
function isGeneratorFunction(value) {
    return isFunction(value) && value.constructor.name === 'GeneratorFunction';
}
exports.isGeneratorFunction = isGeneratorFunction;
/**
 * determines if passed value is `AsyncGeneratorFunction`
 *
 * @example
 * isAsyncGeneratorFunction(async function* () {}); // true
 * isAsyncGeneratorFunction(function* () {}); // false
 * isAsyncGeneratorFunction(function() {}); // false
 * isAsyncGeneratorFunction(async function() {}); // false
 */
function isAsyncGeneratorFunction(value) {
    return isFunction(value) && value.constructor.name === 'AsyncGeneratorFunction';
}
exports.isAsyncGeneratorFunction = isAsyncGeneratorFunction;
/**
 * determines if passed value is either `GeneratorFunction` or `AsyncGeneratorFunction`
 *
 * @example
 * isAnyGeneratorFunction(async function* () {}); // true
 * isAnyGeneratorFunction(function* () {}); // true
 * isAnyGeneratorFunction(function() {}); // falsle
 * isAnyGeneratorFunction(async function() {}); // false
 */
function isAnyGeneratorFunction(value) {
    return isGeneratorFunction(value) || isAsyncGeneratorFunction(value);
}
exports.isAnyGeneratorFunction = isAnyGeneratorFunction;
/**
 * determines if passed value has `Set` prototype in its prototype chain
 * it uses native "instanceof" operator to do that
 *
 * @example
 * isSet(new Set()); // true
 * isSet(new class extends Set {}); // true
 * isSet([]); // false
 */
function isSet(value) {
    return value instanceof Set;
}
exports.isSet = isSet;
/**
 * determines if passed value has `Map` prototype in its prototype chain
 * it uses native "instanceof" operator to do that
 *
 * @example
 * isMap(new Map()); // true
 * isMap(new class extends Map {}); // true
 * isMap([]); // false
 */
function isMap(value) {
    return value instanceof Map;
}
exports.isMap = isMap;
/**
 * determines if passed value has `Promise` prototype in its prototype chain
 * it uses native "instanceof" operator to do that
 *
 * @example
 * isPromise(Promise.resolve(21)); // true
 * isPromise(SyncPromise.resolve(21)); // false
 * isPromise({ then() {} }); // false
 */
function isPromise(value) {
    return value instanceof Promise;
}
exports.isPromise = isPromise;
/**
 * determines if passed value is `Iterable`
 *
 * @example
 * isIterable([]); // true
 * isIterable(''); // true
 * isIterable((function* () {})()); // true
 * isIterable({ [Symbol.iterator]() {} }); // true
 * isIterable(1); // false
 */
function isIterable(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value[Symbol.iterator]);
}
exports.isIterable = isIterable;
/**
 * determines if passed value is `AsyncIterable`
 *
 * @example
 * isAsyncIterable([]); // false
 * isAsyncIterable(''); // false
 * isAsyncIterable((async function* () {})()); // true
 * isAsyncIterable({ [Symbol.asyncIterator]() {} }); // true
 */
function isAsyncIterable(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value[Symbol.asyncIterator]);
}
exports.isAsyncIterable = isAsyncIterable;
/**
 * determines if passed value is either `Iterable` or `AsyncIterable`
 *
 * @example
 * isAnyIterable([]); // true
 * isAnyIterable(''); // true
 * isAnyIterable((async function* () {})()); // true
 * isAnyIterable({ [Symbol.asyncIterator]() {} }); // true
 */
function isAnyIterable(value) {
    return isIterable(value) || isAsyncIterable(value);
}
exports.isAnyIterable = isAnyIterable;
/**
 * determines if passed value is either `IterableIterator` or `AsyncIterableIterator`
 *
 * @example
 * isAnyIterableIterator([]); // true
 * isAnyIterableIterator(''); // true
 * isAnyIterableIterator((async function* () {})()); // true
 * isAnyIterableIterator({ [Symbol.asyncIterator]() {} }); // false
 */
function isAnyIterableIterator(value) {
    return isAnyIterable(value) && isAnyIterator(value);
}
exports.isAnyIterableIterator = isAnyIterableIterator;
/**
 * determines if passed value is either `Iterator` or `AsyncIterator`
 *
 * @example
 * isAnyIterator([]); // false
 * isAnyIterator(''); // false
 * isAnyIterator((async function* () {})()); // true
 * isAnyIterator({ [Symbol.asyncIterator]() {} }); // false
 */
function isAnyIterator(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.next);
}
exports.isAnyIterator = isAnyIterator;
/**
 * determines if passed value is `PromiseLike`
 *
 * @example
 * isPromiseLike(Promise.resolve(21)); // true
 * isPromiseLike(SyncPromise.resolve(21)); // true
 * isPromiseLike({ then() {} }); // true
 * isPromiseLike({}); // false
 * isPromiseLike(1); // false
 */
function isPromiseLike(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
exports.isPromiseLike = isPromiseLike;
