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
export declare function syncIIFactory<T>(next: (this: IterableIterator<T>) => IteratorResult<T>): IterableIterator<T>;
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
export declare function asyncIIFactory<T>(next: (this: AsyncIterableIterator<T>) => IteratorResult<T> | Promise<IteratorResult<T>>): AsyncIterableIterator<T>;
