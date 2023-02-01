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
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

/**
 * determines if passed value is string
 * it uses native "typeof" operator to do that
 *
 * @example
 * isNumber(1); // false
 * isNumber(''); // true
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

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
export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}

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
export function isPlainObject<T = unknown>(value: any): value is Record<PropertyKey, T> {
  return isObject(value) && !Array.isArray(value);
}

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
export function isFunction(value: any): value is AnyFunction {
  return typeof value === 'function';
}

/**
 * determines if passed value is `GeneratorFunction`
 *
 * @example
 * isGeneratorFunction(function* () {}); // true
 * isGeneratorFunction(function() {}); // false
 * isGeneratorFunction(async function() {}); // false
 * isGeneratorFunction(async function* () {}); // false
 */
export function isGeneratorFunction<T>(value: any): value is () => Generator<T> {
  return isFunction(value) && value.constructor.name === 'GeneratorFunction';
}

/**
 * determines if passed value is `AsyncGeneratorFunction`
 *
 * @example
 * isAsyncGeneratorFunction(async function* () {}); // true
 * isAsyncGeneratorFunction(function* () {}); // false
 * isAsyncGeneratorFunction(function() {}); // false
 * isAsyncGeneratorFunction(async function() {}); // false
 */
export function isAsyncGeneratorFunction<T>(value: any): value is () => Generator<T> {
  return isFunction(value) && value.constructor.name === 'AsyncGeneratorFunction';
}

/**
 * determines if passed value is either `GeneratorFunction` or `AsyncGeneratorFunction`
 *
 * @example
 * isAnyGeneratorFunction(async function* () {}); // true
 * isAnyGeneratorFunction(function* () {}); // true
 * isAnyGeneratorFunction(function() {}); // falsle
 * isAnyGeneratorFunction(async function() {}); // false
 */
export function isAnyGeneratorFunction<T>(value: any): value is () => Generator<T> {
  return isGeneratorFunction(value) || isAsyncGeneratorFunction(value);
}

/**
 * determines if passed value has `Set` prototype in its prototype chain
 * it uses native "instanceof" operator to do that
 *
 * @example
 * isSet(new Set()); // true
 * isSet(new class extends Set {}); // true
 * isSet([]); // false
 */
export function isSet<T>(value: any): value is Set<T> {
  return value instanceof Set;
}

/**
 * determines if passed value has `Map` prototype in its prototype chain
 * it uses native "instanceof" operator to do that
 *
 * @example
 * isMap(new Map()); // true
 * isMap(new class extends Map {}); // true
 * isMap([]); // false
 */
export function isMap<K = any, V = unknown>(value: any): value is Map<K, V> {
  return value instanceof Map;
}

/**
 * determines if passed value has `Promise` prototype in its prototype chain
 * it uses native "instanceof" operator to do that
 *
 * @example
 * isPromise(Promise.resolve(21)); // true
 * isPromise(SyncPromise.resolve(21)); // false
 * isPromise({ then() {} }); // false
 */
export function isPromise<T>(value: any): value is Promise<T> {
  return value instanceof Promise;
}


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
export function isIterable<T>(value: any): value is Iterable<T> {
  return isFunction(value?.[Symbol.iterator]);
}

/**
 * determines if passed value is `AsyncIterable`
 *
 * @example
 * isAsyncIterable([]); // false
 * isAsyncIterable(''); // false
 * isAsyncIterable((async function* () {})()); // true
 * isAsyncIterable({ [Symbol.asyncIterator]() {} }); // true
 */
export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
  return isFunction(value?.[Symbol.asyncIterator]);
}

/**
 * determines if passed value is either `Iterable` or `AsyncIterable`
 *
 * @example
 * isAnyIterable([]); // true
 * isAnyIterable(''); // true
 * isAnyIterable((async function* () {})()); // true
 * isAnyIterable({ [Symbol.asyncIterator]() {} }); // true
 */
export function isAnyIterable<T>(value: any): value is AsyncIterable<T> | Iterable<T> {
  return isIterable(value) || isAsyncIterable(value);
}

/**
 * determines if passed value is either `IterableIterator` or `AsyncIterableIterator`
 *
 * @example
 * isAnyIterableIterator([]); // true
 * isAnyIterableIterator(''); // true
 * isAnyIterableIterator((async function* () {})()); // true
 * isAnyIterableIterator({ [Symbol.asyncIterator]() {} }); // false
 */
export function isAnyIterableIterator<T>(value: any): value is AnyIterableIterator<T> {
  return isAnyIterable(value) && isAnyIterator(value);
}

/**
 * determines if passed value is either `Iterator` or `AsyncIterator`
 *
 * @example
 * isAnyIterator([]); // false
 * isAnyIterator(''); // false
 * isAnyIterator((async function* () {})()); // true
 * isAnyIterator({ [Symbol.asyncIterator]() {} }); // false
 */
export function isAnyIterator<T>(value: any): value is AnyIterator<T> {
  return isFunction(value?.next);
}

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
export function isPromiseLike<T>(value: any): value is PromiseLike<T> {
  return isFunction(value?.then);
}
