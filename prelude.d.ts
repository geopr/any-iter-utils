declare global {
  export type Nullable<T> = T | null | undefined;

  export type AnyIterable<T = any> = Iterable<T> | AsyncIterable<T>;

  export type AnyIterableIterator<T = any> = IterableIterator<T> | AsyncIterableIterator<T>;

  export type AnyIterator<T = any> = Iterator<T> | AsyncIterator<T>;

  export type Promisify<T = any> = Promise<T> | T;

  export type Entry<K = any, V = any> = readonly [K, V];

  export type AnyFunction<P extends any[] = any[], R = any, T = any> = (this: T, ...params: P) => R;

  export type AnyObject = Record<PropertyKey, any>;
}

export {};
