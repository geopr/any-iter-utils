"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncIIFactory = exports.syncIIFactory = void 0;
/**
 * Creates `IterableIterator` based on accepted function
 * The function will be used as the `next` method inside the created `IterableIterator` and will be bound to it
 *
 * @param next - the `Iterator.next` method
 *
 * @example
 * syncIIFactory(() => {
 *   return { done: false, value: 1 };
 *});
 */
function syncIIFactory(next) {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next,
    };
}
exports.syncIIFactory = syncIIFactory;
/**
 * Creates `AsyncIterableIterator` based on accepted function
 * The function will be used as the `next` method inside the created `AsyncIterableIterator` and will be bound to it
 *
 * @param next - the `AsyncIterator.next` method
 *
 * @example
 * asyncIIFactory(() => {
 *   return { done: false, value: 1 };
 *});
 *
 * asyncIIFactory(() => {
 *   return Promise.resolve({ done: false, value: 1 });
 *});
 */
function asyncIIFactory(next) {
    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        next() {
            return Promise.resolve(next.call(this));
        },
    };
}
exports.asyncIIFactory = asyncIIFactory;
