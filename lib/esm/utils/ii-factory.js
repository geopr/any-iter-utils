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
export function syncIIFactory(next) {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next,
    };
}
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
export function asyncIIFactory(next) {
    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        next() {
            return Promise.resolve(next.call(this));
        },
    };
}
