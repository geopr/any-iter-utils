# Collectors

This module provides independent collectors for working with any type of iterables

Each collector accepts any iterable as the first parameter and returns a new corresponding data structure

When you see `AnyIterable`, or `Promisify` it means that for `Iterable` a function
returns `R` and for `AsyncIterable` it returns `Promise<R>`

Note that each collector except [`intoCustom`](#intocustomt-r-extends-collectablet--collectabletiterable-anyiterablet-init-r-promisifyr-) 
makes a **shallow copy** of the passed data structure

### API

- [`intoArr<T>(iterable: AnyIterable<T>, init?: T[]): Promisify<T[]>;`](#intoarrtiterable-anyiterablet-init-t-promisifyt-)
- [`intoSet<T>(iterable: AnyIterable<T>, init?: Set<T>): Promisify<Set<T>>;`](#intosettiterable-anyiterablet-init-sett-promisifysett-)
- [`intoMap<K, V>(iterable: AnyIterable<Entry<K, V>>, init?: Map<K, V>): Promisify<Map<K, V>>;`](#intomapk-viterable-anyiterableentryk-v-init-mapk-v-promisifymapk-v-)
- [`intoObj<K extends PropertyKey, V>(iterable: AsyncIterable<Entry<K, V>>, init?: AnyObject): Promise<Record<K, V>>;`](#intoobjk-extends-propertykey-viterable-asynciterableentryk-v-init-anyobject-promiserecordk-v-)
- [`intoCustom<T, R extends Collectable<T> = Collectable<T>>(iterable: AnyIterable<T>, init: R): Promisify<R>;`](#intocustomt-r-extends-collectablet--collectabletiterable-anyiterablet-init-r-promisifyr-)
- [`collect(iterable: AnyIterable<any>, to: Collectables): Promisify<Collectables>;`](#collectiterable-anyiterableany-to-collectables-promisifycollectables-)
- [`factory<T, R>(ProxyCtr: CollectableProxyCtr<T, R>, iterable: AnyIterable<T>): Promisify<R>;`](#factoryt-rproxyctr-collectableproxyctrt-r-iterable-anyiterablet-promisifyr-)

### `intoArr<T>(iterable: AnyIterable<T>, init?: T[]): Promisify<T[]>;` [⬆](#api)

Transforms `AnyIterable` into array and returns the result

Values will be merged with the values in `init` array. If it's not specified the empty array is taken

```ts
function* gen(): Generator<number> {
  yield 1; yield 2;
}

async function* agen(): AsyncGenerator<number> {
  yield 1; yield 2;
}

intoArr(gen()); // [1, 2]
intoArr(agen()]); // Promise<[1, 2]>

intoArr(gen(), [0]); // [0, 1, 2]
intoArr(agen()], [0]); // Promise<[0, 1, 2]>
```

### `intoSet<T>(iterable: AnyIterable<T>, init?: Set<T>): Promisify<Set<T>>;` [⬆](#api)

Transforms `AnyIterable` into `Set` and returns the result

Values will be merged with the values in `init` `Set`. If it's not specified the empty `Set` is taken

```ts
function* gen(): Generator<number> {
  yield 1; yield 2; yield 1;
}

async function* agen(): AsyncGenerator<number> {
  yield 1; yield 2; yield 1;
}

intoSet(gen()); // Set<1, 2>
intoSet(agen()]); // Promise<Set<1, 2>>

intoSet(gen(), new Set([0])); // Set<0, 1, 2>
intoSet(agen()], new Set([0])); // Promise<Set<0, 1, 2>>
```

### `intoMap<K, V>(iterable: AnyIterable<Entry<K, V>>, init?: Map<K, V>): Promisify<Map<K, V>>;` [⬆](#api)

Transforms `AnyIterable` into `Map` and returns the result. The iterable should yield entries like `[key, value]` to use this collector

Entries will be merged with the entries in `init` `Map`. If it's not specified the empty `Map` is taken

```ts
function* gen(): Generator<Entry<{ key: string }, number>> {
  yield [{ key: 'foo' }, 1];
  yield [{ key: 'bar' }, 2];
}

async function* agen(): AsyncGenerator<Entry<{ key: string }, number>> {
  yield [{ key: 'foo' }, 1];
  yield [{ key: 'bar' }, 2];
}

intoMap(gen()); // Map<[[{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>
intoMap(agen()]); // Promise<Map<[[{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>>

// Map<[[{ key: 'zero' }, 0], [{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>
intoMap(gen(), new Map([[{ key: 'zero' }, 0]]));

// Promise<Map<[[{ key: 'zero' }, 0], [{ key: 'foo' }, 1], [{ key: 'bar' }, 2]]>>
intoMap(agen(), new Map([[{ key: 'zero' }, 0]]));
```

### `intoObj<K extends PropertyKey, V>(iterable: AsyncIterable<Entry<K, V>>, init?: AnyObject): Promise<Record<K, V>>;` [⬆](#api)

Transforms `AnyIterable` into object `{}` and returns the result. The iterable should yield entries like `[key: PropertyKey, value]` to use this collector

Entries will be merged with the entries in `init` object. If it's not specified the empty object is taken

```ts
function* gen(): Generator<Entry<PropertyKey, number>> {
  yield ['foo', 1];
  yield ['bar', 2];
}

async function* agen(): AsyncGenerator<Entry<PropertyKey, number>> {
  yield ['foo', 1];
  yield ['bar', 2];
}

intoSet(gen()); // { foo: 1, bar: 2 }
intoSet(agen()]); // Promise<{ foo: 1, bar: 2 }>

intoSet(gen(), { zero: 0 }); // { zero: 0, foo: 1, bar: 2 } 
intoSet(agen()], { zero: 0 }); // Promise<{ zero: 0, foo: 1, bar: 2 }>
```

### `intoCustom<T, R extends Collectable<T> = Collectable<T>>(iterable: AnyIterable<T>, init: R): Promisify<R>;` [⬆](#api)

Transforms `AnyIterable` into data structure that implements `Collectable` interface
and returns the data structure itself

The `Collectable` interface looks as following

```ts
interface Collectable<T> {
  add(value: T): any;
}
```

Example of using the interface

```ts
class Impl<T> implements Collectable<T> {
  readonly store: T[] = [];

  add(val: T): void {
    this.store.push(val);
  }
}

function* gen(): Generator<number> {
  yield 1; yield 2;
}

async function* agen(): AsyncGenerator<number> {
  yield 1; yield 2;
}

intoCustom(gen(), new Impl()).store; // [1, 2]
(await intoCustom(agen(), new Impl())).store; // [1, 2]
```

Note that this collector **does not** copy the data structure

```ts
const collectable = new Collectable();

intoCustom(gen(), collectable);
intoCustom(gen(), collectable);

collectable.store // [1, 2, 1, 2]
```

### `collect(iterable: AnyIterable<any>, to: Collectables): Promisify<Collectables>;` [⬆](#api)

That's a function that combines all of the above collectors

It accepts the target data structure to collect values into and call the corresponding collector

```ts
collect(anyIterable, []);
collect(anyIterable, new Set());
collect(anyIterable, new Map());
collect(anyIterable, {});
collect(anyIterable, new Collectable());
```

### `factory<T, R>(ProxyCtr: CollectableProxyCtr<T, R>, iterable: AnyIterable<T>): Promisify<R>;` [⬆](#api)

That's a function for creating collectors

It accepts a proxy constructor over the target data structure and `AnyIterable` object

If the object is `Iterable` the result of collecting will be returned,
otherwise (if it's `AsyncIterable`) the return will be wrapped in `Promise`

The `CollectableProxy` and `CollectableProxyCtr` interfaces look as following

```ts
interface CollectableProxy<T, R> extends Collectable<T> {
  readonly store: R;
}

interface CollectableProxyCtr<T, R> {
  new(): CollectableProxy<T, R>;
}
```

The function will collect values into `store` using `add` method from `Collectable` and then return it (or Promise over it)

The example of how it's used to create [`intoArr`](#intoarrtiterable-anyiterablet-init-t-promisifyt) collector

```ts
export function intoArr<T>(iterable: AnyIterable<T>, init: T[] = []): Promisify<T[]> {
  class C implements CollectableProxy<T, T[]> {
    readonly store: T[] = [...init];

    add(val: T): void {
      this.store.push(val);
    }
  }

  return factory(C, iterable);
}
```
