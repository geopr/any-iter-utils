import { factory, type CollectableProxy } from 'collectors/factory';

/**
 * transforms `Iterable` into object and returns the result
 *
 * @param iterable - the `Iterable` object
 * it should yield entries like `[key: PropertyKey, value: any]`
 * 
 * @param init - initial object to add values to
 * if not specified empty object is taken
 * 
 * @returns the object of entries from the specified `Iterable` object
 * 
 * @example
 * function* gen(): Generator<Entry<PropertyKey, number>> {
 *   yield ['foo', 1];
 *   yield ['bar', 2];
 * }
 *
 * intoObj(gen()); // { foo: 1, bar: 2 };
 * intoObj(gen(), { zero: 0 }); // { zero: 0, foo: 1, bar: 2 }
 */
export function intoObj<K extends PropertyKey, V>(iterable: Iterable<Entry<K, V>>, init?: AnyObject): Record<K, V>;

/**
 * transforms `AsyncIterable` into object and returns `Promise` with the result
 *
 * @param iterable - the `AsyncIterable` object
 * it should yield entries like `[key: PropertyKey, value: any]`
 * 
 * @param init - initial object to add values to
 * if not specified empty object is taken
 * 
 * @returns `Promise` with the object of entries from the specified `AsyncIterable` object
 * 
 * @example
 * async function* gen(): AsyncGenerator<Entry<PropertyKey, number>> {
 *   yield ['foo', 1];
 *   yield ['bar', 2];
 * }
 *
 * intoObj(gen()); // Promise<{ foo: 1, bar: 2 };>
 * intoObj(gen(), { zero: 0 }); // Promise<{ zero: 0, foo: 1, bar: 2 }>
 */
export function intoObj<K extends PropertyKey, V>(iterable: AsyncIterable<Entry<K, V>>, init?: AnyObject): Promise<Record<K, V>>;

/**
 * service overload
 */
export function intoObj<K extends PropertyKey, V>(iterable: AnyIterable<Entry<K, V>>, init?: AnyObject): Promisify<Record<K, V>>;

export function intoObj<K extends PropertyKey, V>(iterable: AnyIterable<Entry<K, V>>, init: AnyObject = {}): Promisify<Record<K, V>> {
  class C implements CollectableProxy<Entry<K, V>, AnyObject> {
    readonly store: Record<PropertyKey, any> = {...init};

    add([key, val]: Entry<K, V>): void {
      this.store[key] = val;
    }
  }

  return factory(C, iterable);
}

