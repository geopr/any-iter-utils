import { isAsyncIterable } from 'utils';

import { forEach } from 'combinators';

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
export function factory<T, R>(ProxyCtr: CollectableProxyCtr<T, R>, iterable: AnyIterable<T>): Promisify<R> {
  const 
    proxy = new ProxyCtr(),
    promise = forEach(iterable, proxy.add.bind(proxy)).then(() => proxy.store);

  return isAsyncIterable(iterable) ? Promise.resolve(promise) : promise.unwrap();
}
