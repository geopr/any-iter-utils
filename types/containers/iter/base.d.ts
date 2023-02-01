import type { Collectable } from '../../collectors';
import type { ItersValues, TuplesFromIters } from '../../combinators';
import type { Option, SyncPromise } from '../../containers';
import type { PickIter, PickCollectResult, FlatIterable, GetNativeIterable, PromisifyValue } from './interface';
import type { SyncIter } from './index';
/**
 * The base class for further inheritance for `SyncIter` and `AsyncIter`
 */
export declare abstract class BaseIter<T, Iter> {
    protected readonly iterable: AnyIterable<T>;
    protected self: any;
    protected constructor(iterable: AnyIterable<T>);
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intoarrtiterable-anyiterablet-init-t-promisifyt intoArr}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#collectiterable-anyiterableany-to-collectables-promisifycollectables collect}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    collect(init: T[]): PickCollectResult<T[], Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intosettiterable-anyiterablet-init-sett-promisifysett intoSet}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#collectiterable-anyiterableany-to-collectables-promisifycollectables collect}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    collect(init: Set<T>): PickCollectResult<Set<T>, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intomapk-viterable-anyiterableentryk-v-init-mapk-v-promisifymapk-v intoMap}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#collectiterable-anyiterableany-to-collectables-promisifycollectables collect}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    collect<K, V>(init: Map<K, V>): PickCollectResult<Map<K, V>, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intocustomt-r-extends-collectablet--collectabletiterable-anyiterablet-init-r-promisifyr intoCustom}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#collectiterable-anyiterableany-to-collectables-promisifycollectables collect}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    collect<R extends Collectable<T> = Collectable<T>>(init: R): PickCollectResult<R, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intoobjk-extends-propertykey-viterable-asynciterableentryk-v-init-anyobject-promiserecordk-v intoObj}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#collectiterable-anyiterableany-to-collectables-promisifycollectables collect}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    collect<K extends PropertyKey, V>(init: Record<PropertyKey, any>): PickCollectResult<Record<K, V>, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#mapt-riterable-anyiterablet-cb-value-t--r-anyiterableiteratorr map}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    map<R>(cb: (val: T) => R): PickIter<R, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#filtertiterable-anyiterablet-cb-value-t--boolean-anyiterableiteratort filter}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    filter(cb: (value: T) => boolean): PickIter<T, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#enumeratetiterable-anyiterablet-anyiterableiteratorentrynumber-t enumerate}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    enumerate(): PickIter<Entry<number, T>, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#taketiterable-asynciterablet-amount-number-asynciterableiteratort take}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    take(amount: number): PickIter<T, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#droptiterable-anyiterablet-amount-number-anyiterableiteratort drop}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    drop(amount: number): PickIter<T, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#takewhiletiterable-anyiterablet-predicate-val-t--boolean-anyiterableiteratort takeWhile}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    takeWhile(cb: (val: T) => boolean): PickIter<T, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#dropwhiletiterable-anyiterablet-predicate-val-t--boolean-anyiterableiteratort dropWhile}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    dropWhile(cb: (val: T) => boolean): PickIter<T, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#flattiterable-asynciterablet--anyiterablet-asynciterableiteratort flat}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    flat(): PickIter<FlatIterable<T, Iter>, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#flatmapt-riterable-asynciterablet-cb-val-t--anyiterabler--r-asynciterableiteratorr flatMap}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    flatMap<R>(cb: (val: T) => GetNativeIterable<R, Iter> | R): PickIter<R, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#filtermapt-riterable-asynciterablet-cb-value-t--optionr-asynciterableiteratorr filterMap}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    filterMap<R>(cb: (val: T) => Option<R>): PickIter<R, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#foreachtiterable-anyiterablet-cb-value-t--void-syncpromisevoid forEach}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    forEach(cb: (val: T) => void): SyncPromise<void>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#productiters-extends-anyiterableanyiterables-iters-anyiterableiteratortuplesfromitersiters product}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    product<Iters extends Iter extends SyncIter ? Iterable<any>[] : AnyIterable[]>(...iterables: Iters): PickIter<TuplesFromIters<[PickIter<T, Iter>, ...Iters]>, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#seqiters-extends-anyiterableanyiterables-iters-anyiterableiteratoriters seq}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    seq<Iters extends Iter extends SyncIter ? Iterable<any>[] : AnyIterable[]>(...iterables: Iters): PickIter<ItersValues<[PickIter<T, Iter>, ...Iters]>, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#cycletiterable-anyiterablet-anyiterableiteratort cycle}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    cycle(): PickIter<T, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#foldt-riterable-anyiterablet-init-r-cb-acc-r-val-t--r-promisifyr fold}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    fold<R>(init: R, cb: (acc: R, val: T) => R): PromisifyValue<R, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#everytiterable-anyiterablet-predicate-val-t--boolean-promisifyboolean every}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    every(predicate: (val: T) => boolean): PromisifyValue<boolean, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#sometiterable-anyiterablet-predicate-val-t--boolean-promisifyboolean some}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    some(predicate: (val: T) => boolean): PromisifyValue<boolean, Iter>;
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#zipiters-extends-anyiterableanyiterables-iters-anyiterableiteratortuplesfromitersiters product}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    zip<Iters extends Iter extends SyncIter ? Iterable<any>[] : AnyIterable[]>(...iterables: Iters): PickIter<TuplesFromIters<[PickIter<T, Iter>, ...Iters]>, Iter>;
    /**
     * creates a new instance of current class
     * it will be either `SyncIter` or `AsyncIter`
     */
    protected new<R>(ii: AnyIterableIterator<R>): PickIter<R, Iter>;
}
