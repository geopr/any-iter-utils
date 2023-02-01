"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const utils_1 = require("../../utils");
const combinators_1 = require("../../combinators");
/**
 * it's used to compute result of collecting values from `AnyIterable`
 *
 * @param ProxyCtr - constructor for `CollectableProxy`
 * it's used to create a new data structure to store values in
 *
 * @param iterable - `AnyIterable` object
 * if it's `Iterable` the returned value will be the specified data structure with values,
 * otherwise the data stucture will be wrapped in `Promise`
 *
 * @returns the specified data structure with values or `Promise` based on the accepted `AnyIterable`
 */
function factory(ProxyCtr, iterable) {
    const proxy = new ProxyCtr(), promise = (0, combinators_1.forEach)(iterable, proxy.add.bind(proxy)).then(() => proxy.store);
    return (0, utils_1.isAsyncIterable)(iterable) ? Promise.resolve(promise) : promise.unwrap();
}
exports.factory = factory;
