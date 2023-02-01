import type { Unwrapable } from '../../containers';
import type { Executor, IterValue } from './interface';
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
export declare class SyncPromise<T = unknown> implements Omit<Unwrapable<T>, 'unwrapOr'> {
    #private;
    [Symbol.toStringTag]: string;
    constructor(executor: Executor<T>);
    /**
     * determines if current status is 'rejected'
     */
    get isRejected(): boolean;
    /**
     * @see {@link Promise.resolve}
     */
    static resolve<R>(value: PromiseLike<R> | R): SyncPromise<R>;
    /**
     * @see {@link Promise.reject}
     */
    static reject(err: any): SyncPromise;
    /**
     * @see {@link Promise.all}
     */
    static all<I extends Iterable<any>>(iterable: I): SyncPromise<IterValue<I>[]>;
    /**
     * @see {@link Promise.any}
     */
    static any<I extends Iterable<any>>(iterable: I): SyncPromise<IterValue<I>>;
    /**
     * @see {@link Promise.allSettled}
     */
    static allSettled<I extends Iterable<any>>(iterable: I): SyncPromise<PromiseSettledResult<IterValue<I>>[]>;
    /**
     * @see {@link Promise.race}
     */
    static race<I extends Iterable<any>>(iterable: I): SyncPromise<IterValue<I>>;
    /**
     * @see {@link Promise.then}
     */
    then<R1>(onFullfill?: Nullable<(value: T) => PromiseLike<R1> | R1>): SyncPromise<R1>;
    /**
     * @see {@link Promise.then}
     */
    then<R1, R2>(onFullfill: Nullable<(value: T) => PromiseLike<R1> | R1>, onReject?: Nullable<(err: any) => PromiseLike<R2> | R2>): SyncPromise<R1 | R2>;
    /**
     * @see {@link Promise.catch}
     */
    catch<R>(onReject?: Nullable<(err: any) => PromiseLike<R> | R>): SyncPromise<R>;
    /**
     * @see {@link Promise.finally}
     */
    finally(cb: VoidFunction): SyncPromise<T>;
    /**
     * returns current value if "status" is not "pending"
     * and throws an error otherwise
     */
    unwrap(): T | never;
}
