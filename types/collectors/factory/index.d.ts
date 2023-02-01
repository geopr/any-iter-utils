import type { CollectableProxy, CollectableProxyCtr } from './interface';
export type { CollectableProxy, CollectableProxyCtr };
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
export declare function factory<T, R>(ProxyCtr: CollectableProxyCtr<T, R>, iterable: AnyIterable<T>): Promisify<R>;
