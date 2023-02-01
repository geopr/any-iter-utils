import { factory, type CollectableProxy } from 'collectors/factory';
import { cast } from 'utils';

/**
 * transforms `Iterable` into `Map` and returns the result
 *
 * @param iterable - the `Iterable` object
 * it should yield entries like `[key: any, value: any]`
 * 
 * @param init - initial `Map` to add values to
 * if not specified empty `Map` is taken
 * 
 * @returns the `Map` of entries from the specified `Iterable` object
 *
 * @example
 * function* gen(): Generator<Entry<{ key: string }, number>> {
 *   yield [{ key: 'foo' }, 1];
 *   yield [{ key: 'bar' }, 2];
 * }
 *
 * // Map<[[{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>
 * intoMap(gen());
 *
 * // Map<[[{ key: 'zero' }, 0], [{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>
 * intoMap(gen(), new Map([[{ key: 'zero' }, 0]]));
 */
export function intoMap<K, V>(iterable: Iterable<Entry<K, V>>, init?: Map<K, V>): Map<K, V>;

/**
 * transforms `AsyncIterable` into `Map` and returns `Promise` with the result
 *
 * @param iterable - the `AsyncIterable` object
 * it should yield entries like `[key: any, value: any]`
 * 
 * @param init - initial `Map` to add values to
 * if not specified empty `Map` is taken
 * 
 * @returns `Promise` with the `Map` of entries from the specified `AsyncIterable` object
 * 
 * @example
 * function* gen(): AsyncGenerator<Entry<{ key: string }, number>> {
 *   yield [{ key: 'foo' }, 1];
 *   yield [{ key: 'bar' }, 2];
 * }
 *
 * // Promise<Map<[[{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>>
 * intoMap(gen());
 *
 * // Promise<Map<[[{ key: 'zero' }, 0], [{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>>
 * intoMap(gen(), new Map([[{ key: 'zero' }, 0]]));
 */
export function intoMap<K, V>(iterable: AsyncIterable<Entry<K, V>>, init?: Map<K, V>): Promise<Map<K, V>>;

/**
 * service overload
 */
export function intoMap<K, V>(iterable: AnyIterable<Entry<K, V>>, init?: Map<K, V>): Promisify<Map<K, V>>;

export function intoMap<K, V>(iterable: AnyIterable<Entry<K, V>>, init: Map<K, V> = new Map()): Promisify<Map<K, V>> {
  class C implements CollectableProxy<Entry<K, V>, Map<K, V>> {
    readonly store: Map<K, V> = cast(new Map(init));

    add([key, value]: Entry<K, V>): void {
      this.store.set(key, value);
    }
  }

  return factory(C, iterable);
}
