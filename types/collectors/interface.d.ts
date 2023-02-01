import type { Collectable } from './custom';
export type { Collectable };
export type { CollectableProxy, CollectableProxyCtr } from './factory';
export interface Collector {
    (iterable: Iterable<any>, to?: any): any;
    (iterable: AsyncIterable<any>, to?: any): Promise<any>;
    (iterable: AnyIterable<any>, to?: any): Promisify<any>;
}
export type Collectables = Array<any> | Set<any> | Map<any, any> | Record<PropertyKey, any> | Collectable<any>;
