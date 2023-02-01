import { assert, cast, isPromiseLike } from 'utils';

import type { Unwrapable } from 'containers';

import type { ExecReject, ExecResolve, Executor, IterValue, Status } from './interface';

/**
 * implements `Promise` interface but behaves synchronously if possible
 *
 * @example
 * console.log(1);
 * SyncPromise.resolve(2).then(console.log)
 * SyncPromise.resolve(SyncPromise.resolve(3)).then(console.log)
 * console.log(4);
 * 
 * // the output will be: 1, 2, 3, 4
 */
export class SyncPromise<T = unknown> implements Omit<Unwrapable<T>, 'unwrapOr'> {
  /**
   * the value from then/catch/resolve methods
   */
  #value?: T;

  /**
   * error in case `SyncPromise` rejects
   */
  #err?: any;

  /**
   * functions that will be invoked when `SyncPromise` resolves
   */
  #resolvers: Array<(value: T) => void> = [];

  /**
   * functions that will be invoked when `SyncPromise` rejects
   */
  #rejecters: Array<(err: any) => void> = [];

  /**
   * functions that will be invoked when `SyncPromise` resolves or rejects
   */
  #finallizers: VoidFunction[] = [];

  /**
   * current status of the `SyncPromise`
   *
   * it will be "resolved" in case `SyncPromise` resolves,
   * "rejected" in case it rejects and "pending" otherwise
   */
  #status: Status = 'pending';

  [Symbol.toStringTag] = 'SyncPromise';

  constructor(executor: Executor<T>) {
    try {
      Promise.resolve(executor(this.#execResolve, this.#execReject))
        .catch(this.#execReject.bind(this));
    } catch (e) {
      this.#execReject(e);
    }
  }

  /**
   * determines if current status is 'pending'
   */
  get #isPending(): boolean {
    return this.#status === 'pending';
  }

  /**
   * determines if current status is 'rejected'
   */
  get isRejected(): boolean {
    return this.#status === 'rejected';
  }

  /**
   * determines if current status is 'fulfilled'
   */
  get #isFullfilled(): boolean {
    return this.#status === 'fullfilled';
  }

  /**
   * @see {@link Promise.resolve}
   */
  static resolve<R>(value: PromiseLike<R> | R): SyncPromise<R> {
    return new SyncPromise((resolve) => resolve(value));
  }

  /**
   * @see {@link Promise.reject}
   */
  static reject(err: any): SyncPromise {
    return new SyncPromise((_, reject) => reject(err));
  }

  /**
   * @see {@link Promise.all}
   */
  static all<I extends Iterable<any>>(iterable: I): SyncPromise<IterValue<I>[]> {
    return new SyncPromise((resolve, reject) => {
      const 
        arr = [...iterable],
        { length } = arr,
        result: IterValue<I>[] = new Array(length);

      let resolvedCount = 0;

      arr.map(SyncPromise.resolve).forEach((promise, idx) => {
        promise.then(
          (val) => {
            result[idx] = val;

            if (++resolvedCount === length) {
              resolve(result);
            }
          },
          reject,
        );
      });
    });
  }

  /**
   * @see {@link Promise.any}
   */
  static any<I extends Iterable<any>>(iterable: I): SyncPromise<IterValue<I>> {
    return new SyncPromise((resolve, reject) => {
      const
        arr = [...iterable],
        { length } = arr;

      if (length === 0) {
        reject(new AggregateError([], 'No Promise in SyncPromise.any was resolved'));
        return;
      }

      const errors: any[] = [];

      let rejectedCount = 0;

      arr.map(SyncPromise.resolve).forEach((promise, idx) => {
        promise.then(resolve, (err) => {
          errors[idx] = err;

          if (++rejectedCount === length) {
            reject(new AggregateError(errors, 'No Promise in SyncPromise.any was resolved'));
          }
        });
      });
    });
  }

  /**
   * @see {@link Promise.allSettled}
   */
  static allSettled<I extends Iterable<any>>(iterable: I): SyncPromise<PromiseSettledResult<IterValue<I>>[]> {
    return new SyncPromise((resolve) => {
      const
        arr = [...iterable],
        { length } = arr,
        result: PromiseSettledResult<IterValue<I>>[] = new Array(length);
        
      let settledCount = 0;

      arr.map(SyncPromise.resolve).forEach((promise, idx) => {
        promise.then(
          (value) => {
            result[idx] = { status: 'fulfilled', value };
            possiblyResolve();
          },
          (reason) => {
            result[idx] = { status: 'rejected', reason };
            possiblyResolve();
          },
        );
      });

      function possiblyResolve(): void {
        if (++settledCount === length) {
          resolve(result);
        }
      }
    });
  }

  /**
   * @see {@link Promise.race}
   */
  static race<I extends Iterable<any>>(iterable: I): SyncPromise<IterValue<I>> {
    return new SyncPromise((resolve, reject) => {
      for (const val of iterable) {
        SyncPromise.resolve(val).then(resolve, reject);
      }
    });
  }

  /**
   * @see {@link Promise.then}
   */
  then<R1>(
    onFullfill?: Nullable<(value: T) => PromiseLike<R1> | R1>,
  ): SyncPromise<R1>;

  /**
   * @see {@link Promise.then}
   */
  then<R1, R2>(
    onFullfill: Nullable<(value: T) => PromiseLike<R1> | R1>,
    onReject?: Nullable<(err: any) => PromiseLike<R2> | R2>,
  ): SyncPromise<R1 | R2>;

  then<R1, R2>(
    onFullfill?: Nullable<(value: T) => PromiseLike<R1> | R1>,
    onReject?: Nullable<(err: any) => PromiseLike<R2> | R2>,
  ): SyncPromise<R1 | R2> {
    return new SyncPromise((resolve, reject) => {
      this.#resolvers.push((val: T): void => {
        try {
          if (onFullfill == null) {
            resolve(cast(val));
          } else {
            resolve(onFullfill(val));
          }
        } catch (e) {
          reject(e);
        }
      });

      this.#rejecters.push((err) => {
        try {
          if (onReject == null) {
            reject(err);
          } else {
            resolve(onReject(err));
          }
        } catch (e) {
          reject(e);
        }
      });

      this.#next();
    });
  }

  /**
   * @see {@link Promise.catch}
   */
  catch<R>(
    onReject?: Nullable<(err: any) => PromiseLike<R> | R>,
  ): SyncPromise<R> {
    return new SyncPromise((resolve, reject) => {
      this.#resolvers.push(cast(resolve));

      this.#rejecters.push((err) => {
        try {
          if (onReject == null) {
            reject(err);
          } else {
            resolve(onReject(err));
          }
        } catch (e) {
          reject(e);
        }
      });

      this.#next();
    });
  }

  /**
   * @see {@link Promise.finally}
   */
  finally(cb: VoidFunction): SyncPromise<T> {
    return new SyncPromise((resolve, reject) => {
      this.#resolvers.push(resolve);
      this.#rejecters.push(reject);
      this.#finallizers.push(cb);
      this.#next();
    });
  }

  /**
   * returns current value if "status" is not "pending"
   * and throws an error otherwise
   */
  unwrap(): T | never {
    // TODO: replace with Result
    assert(this.#isFullfilled, 'cannot unwrap pending SyncPromise');
    return this.#value!;
  }

  /**
   * will be passed to the "executor" function in the `SyncPromise` constructor
   * does the same thing that it does in the native `Promise`
   *
   * @example
   *         that's it  \
                         \
   * new SyncPromise((resolve) => {});
   */
  #execResolve: ExecResolve<T> = (value) => {
    if (!this.#isPending) return;

    if (isPromiseLike(value)) {
      value.then(resolve.bind(this), this.#execReject.bind(this));
    } else {
      resolve.call(this, value);
    }

    function resolve(this: SyncPromise<T>, value: T): void {
      this.#value = value;
      this.#status = 'fullfilled';
      this.#resolve();
    }
  };

  /**
   * will be passed to the "executor" function in the `SyncPromise` constructor
   * does the same thing that it does in the native `Promise`
   *
   * @example
   *                 that's it  \
   *                             \
   * new SyncPromise((resolve, reject) => {});
   */
  #execReject: ExecReject = (e) => {
    if (!this.#isPending) return;

    this.#err = e;
    this.#status = 'rejected';
    this.#reject();
  };

  /**
   * will be called in then/catch/finally methods
   *
   * determines if handlers should be called immediately
   * if so that means `SyncPromise` is resolved/rejected already
   */
  #next(): void {
    switch (this.#status) {
    case 'fullfilled': {
      this.#resolve();
      break;
    }

    case 'rejected': {
      this.#reject();
      break;
    }
    }
  }

  /**
   * executes "then" handlers then "finally" handlers
   */
  #resolve(): void {
    this.#resolvers.forEach(cb => cb(this.#value!));
    this.#finally();
  }

  /**
   * executes "catch" handlers then "finally" handlers
   */
  #reject(): void {
    this.#rejecters.forEach(cb => cb(this.#err));
    this.#finally();
  }

  /**
   * executes "finally" handlers
   */
  #finally(): void {
    this.#finallizers.forEach(cb => cb());
  }
}
