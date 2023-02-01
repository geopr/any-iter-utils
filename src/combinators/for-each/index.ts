import { SyncPromise } from 'containers';

import { isAsyncIterable } from 'utils';

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
export function forEach<T>(iterable: AnyIterable<T>, cb: (value: T) => void): SyncPromise<void> {
  return isAsyncIterable(iterable) ? aforEach(iterable, cb) : sforEach(iterable, cb);
}

function sforEach<T>(iterable: Iterable<T>, cb: (value: T) => void): SyncPromise<void> {
  return new SyncPromise<void>((resolve) => {
    for (const value of iterable) {
      cb(value);
    }
    resolve();
  });
}

function aforEach<T>(iterable: AsyncIterable<T>, cb: (value: T) => void): SyncPromise<void> {
  return new SyncPromise<void>(async (resolve) => {
    for await (const value of iterable) {
      cb(value);
    }
    resolve();
  });
}
