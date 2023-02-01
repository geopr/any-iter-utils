import type { Collectable, CollectableProxy, CollectableProxyCtr } from './interface';
export type { Collectable, CollectableProxy, CollectableProxyCtr };
export { intoObj } from './obj';
export { intoArr } from './arr';
export { intoMap } from './map';
export { intoSet } from './set';
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intomapk-viterable-anyiterableentryk-v-init-mapk-v-promisifymapk-v-- intoMap}
 */
export declare function collect<K, V>(iterable: Iterable<Entry<K, V>>, init: Map<K, V>): Map<K, V>;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intocustomt-r-extends-collectablet--collectabletiterable-anyiterablet-init-r-promisifyr- intoCustom}
 */
export declare function collect<T, R extends Collectable<T> = Collectable<T>>(iterable: Iterable<T>, init: R): R;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intoobjk-extends-propertykey-viterable-asynciterableentryk-v-init-anyobject-promiserecordk-v- intoObj}
 */
export declare function collect<K extends PropertyKey, V>(iterable: Iterable<Entry<K, V>>, init: Record<PropertyKey, any>): Record<K, V>;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intoarrtiterable-anyiterablet-init-t-promisifyt- intoArr}
 */
export declare function collect<T>(iterable: Iterable<T>, init: T[]): T[];
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intosettiterable-anyiterablet-init-sett-promisifysett- intoSet}
 */
export declare function collect<T>(iterable: Iterable<T>, init: Set<T>): Set<T>;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intomapk-viterable-anyiterableentryk-v-init-mapk-v-promisifymapk-v-- intoMap}
 */
export declare function collect<K, V>(iterable: AsyncIterable<Entry<K, V>>, init: Map<K, V>): Promise<Map<K, V>>;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intocustomt-r-extends-collectablet--collectabletiterable-anyiterablet-init-r-promisifyr- intoCustom}
 */
export declare function collect<T, R extends Collectable<T> = Collectable<T>>(iterable: AsyncIterable<T>, init: R): Promise<R>;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intoobjk-extends-propertykey-viterable-asynciterableentryk-v-init-anyobject-promiserecordk-v- intoObj}
 */
export declare function collect<K extends PropertyKey, V>(iterable: AsyncIterable<Entry<K, V>>, init: Record<PropertyKey, any>): Promise<Record<K, V>>;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intoarrtiterable-anyiterablet-init-t-promisifyt- intoArr}
 */
export declare function collect<T>(iterable: AsyncIterable<T>, init: T[]): Promise<T[]>;
/**
 * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#intosettiterable-anyiterablet-init-sett-promisifysett- intoSet}
 */
export declare function collect<T>(iterable: AsyncIterable<T>, init: Set<T>): Promise<Set<T>>;
