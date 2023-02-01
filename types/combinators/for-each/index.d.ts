import { SyncPromise } from '../../containers';
/**
 * iterates over passed any iterable object
 *
 * @param iterable - any iterable object
 *
 * @param cb - the callback will be called on each iteration and recieve value of iterable
 *
 * @return - `SyncPromise` that will be resolved when iteraion is done
 *
 * @example
 * forEach([1, 2, 3], console.log).then(() => console.log('finish')); // 1 2 3 "finish"
 *
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 * forEach(gen(), console.log).then(() => console.log('finish')); // 1 2 3 "finish"
 */
export declare function forEach<T>(iterable: AnyIterable<T>, cb: (value: T) => void): SyncPromise<void>;
