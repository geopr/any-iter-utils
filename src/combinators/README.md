# Combinators

This module provides independent combinators for working with any type of iterables

When you see `AnyIterable`, `AnyIterableIterator` or `AnyIterator` it means that for `Iterable` a function
returns `IterableIterator` and for `AsyncIterable` it returns `AsyncIterableIterator`

### API

- [`map<T, R>(iterable: AnyIterable<T>, cb: (value: T) => R): AnyIterableIterator<R>;`](#mapt-riterable-anyiterablet-cb-value-t--r-anyiterableiteratorr-)
- [`filter<T>(iterable: AnyIterable<T>, cb: (value: T) => boolean): AnyIterableIterator<T>;`](#filtertiterable-anyiterablet-cb-value-t--boolean-anyiterableiteratort-)
- [`enumerate<T>(iterable: AnyIterable<T>): AnyIterableIterator<Entry<number, T>>;`](#enumeratetiterable-anyiterablet-anyiterableiteratorentrynumber-t-)
- [`take<T>(iterable: AsyncIterable<T>, amount: number): AsyncIterableIterator<T>;`](#taketiterable-asynciterablet-amount-number-asynciterableiteratort-)
- [`drop<T>(iterable: AnyIterable<T>, amount: number): AnyIterableIterator<T>;`](#droptiterable-anyiterablet-amount-number-anyiterableiteratort-)
- [`takeWhile<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): AnyIterableIterator<T>;`](#takewhiletiterable-anyiterablet-predicate-val-t--boolean-anyiterableiteratort-)
- [`dropWhile<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): AnyIterableIterator<T>;`](#dropwhiletiterable-anyiterablet-predicate-val-t--boolean-anyiterableiteratort-)
- [`flat<T>(iterable: AsyncIterable<T | AnyIterable<T>>): AsyncIterableIterator<T>;`](#flattiterable-asynciterablet--anyiterablet-asynciterableiteratort-)
- [`flatMap<T, R>(iterable: AsyncIterable<T>, cb: (val: T) => AnyIterable<R> | R): AsyncIterableIterator<R>;`](#flatmapt-riterable-asynciterablet-cb-val-t--anyiterabler--r-asynciterableiteratorr-)
- [`filterMap<T, R>(iterable: AsyncIterable<T>, cb: (value: T) => Option<R>): AsyncIterableIterator<R>;`](#filtermapt-riterable-asynciterablet-cb-value-t--optionr-asynciterableiteratorr-)
- [`forEach<T>(iterable: AnyIterable<T>, cb: (value: T) => void): SyncPromise<void>;`](#foreachtiterable-anyiterablet-cb-value-t--void-syncpromisevoid-)
- [`product<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<TuplesFromIters<Iters>>`](#productiters-extends-anyiterableanyiterables-iters-anyiterableiteratortuplesfromitersiters-)
- [`seq<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<Iters>`](#seqiters-extends-anyiterableanyiterables-iters-anyiterableiteratoriters-)
- [`cycle<T>(iterable: AnyIterable<T>): AnyIterableIterator<T>`](#cycletiterable-anyiterablet-anyiterableiteratort-)
- [`fold<T, R>(iterable: AnyIterable<T>, init: R, cb: (acc: R, val: T) => R): Promisify<R>`](#foldt-riterable-anyiterablet-init-r-cb-acc-r-val-t--r-promisifyr-)
- [`every<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): Promisify<boolean>`](#everytiterable-anyiterablet-predicate-val-t--boolean-promisifyboolean-)
- [`some<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): Promisify<boolean>`](#sometiterable-anyiterablet-predicate-val-t--boolean-promisifyboolean-)
- [`zip<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<TuplesFromIters<Iters>>`](#zipiters-extends-anyiterableanyiterables-iters-anyiterableiteratortuplesfromitersiters-)

### `map<T, R>(iterable: AnyIterable<T>, cb: (value: T) => R): AnyIterableIterator<R>;` [⬆](#api)

Transforms each value to the value returned from the callback function

The callback function will be called on each `AnyIterator.next` call and recieve the value

The returned value of the callback will be in the returnable `AnyIterableIterator`

```ts
const
  iterable: number[] = [1, 2, 3],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })(),

  f = (val: number) => val * 2;

map(iterable, f); // IterableIterator<2, 4, 6>
map(asyncIterable, f); // AsyncIterableIterator<2, 4, 6>

map(iterable, String); // IterableIterator<'1', '2', '3'>
map(asyncIterable, String); // AsyncIterableIterator<'1', '2', '3'>

map(map(iterable, f), String); // IterableIterator<'2', '4', '6'>
map(map(asyncIterable, f), String); // AsyncIterableIterator<'2', '4', '6'>
```

### `filter<T>(iterable: AnyIterable<T>, cb: (value: T) => boolean): AnyIterableIterator<T>;` [⬆](#api)

Excludes values from `AnyIterable` object if predicate returns `false`

The predicate function will be called on each `AnyIterator.next` call and recieve the value

If it returns `true` the value will stay in the returnable `AnyIterableIterator` otherwise it will be excluded

```ts
const
  iterable: number[] = [1, 2, 3],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })(),

  f = (val: number) => val > 1;

filter(iterable, f); // IterableIterator<2, 3>
filter(asyncIterable, f); // AsyncIterableIterator<2, 3>
```
 

### `enumerate<T>(iterable: AnyIterable<T>): AnyIterableIterator<Entry<number, T>>;` [⬆](#api)

Transforms values of `AnyIterable` into entries `[index, value]`

it basically does `map(anyIterable, (value) => [index, value])`

```ts
const
  iterable: string[] = ['foo', 'bar'],
  asyncIterable: AsyncGenerator<string> = (async function* () {
    yield* iterable;
  )();

enumerate(iterable); // IterableIterator<[0, 'foo'], [1, 'bar']>
enumerate(asyncIterable); // AsyncIterableIterator<[0, 'foo'], [1, 'bar']>
```

### `take<T>(iterable: AsyncIterable<T>, amount: number): AsyncIterableIterator<T>;` [⬆](#api)

Takes specified amount of values from `AnyIterable`

In other words, it yields values before the specified index, including the value on index

```ts
const
  iterable: number[] = [1, 2, 3],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })();

take(iterable, 2); // IterableIterator<1, 2>
take(asyncIterable, 2); // AsyncIterableIterator<1, 2>

take(iterable, 10); // IterableIterator<1, 2, 3>
take(asyncIterable, 10); // AsyncIterableIterator<1, 2, 3>

take(iterable, 0); // IterableIterator<> (done=true)
take(asyncIterable, 0); // AsyncIterableIterator<> (done=true)
```

### `drop<T>(iterable: AnyIterable<T>, amount: number): AnyIterableIterator<T>;` [⬆](#api)

Drops specified amount of values from `AnyIterable`

In other words, it starts yielding values from the specified index

```ts
const
  iterable: number[] = [1, 2, 3],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })();

drop(iterable, 2); // IterableIterator<3>
drop(asyncIterable, 2); // AsyncIterableIterator<3>

drop(iterable, 10); // IterableIterator<> (done=true)
drop(asyncIterable, 10); // AsyncIterableIterator<> (done=true)

drop(iterable, 0); // IterableIterator<1, 2, 3>
drop(asyncIterable, 0); // AsyncIterableIterator<1, 2, 3>
```

### `takeWhile<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): AnyIterableIterator<T>;` [⬆](#api)

Takes values from `AnyIterable` while the predicate function returns `true`
 
The predicate function will be called on each `AnyIterator.next` call and recieve the value

If it returns `true` the value will stay, otherwise the taking process stops

```ts
const
  iterable: number[] = [3, 2, 5, 1, 4],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })();

  f = (val: number) => val <= 3;

takeWhile(iterable, f); // IterableIterator<3, 2>
takeWhile(asyncIterable, f); // AsyncIterableIterator<3, 2>

takeWhile(iterable, () => false); // IterableIterator<> (done=true)
takeWhile(asyncIterable, () => false); // AsyncIterableIterator<> (done=true)

takeWhile(iterable, () => true); // IterableIterator<3, 2, 5, 1, 4>
takeWhile(asyncIterable, () => true); // AsyncIterableIterator<3, 2, 5, 1, 4>
```

### `dropWhile<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): AnyIterableIterator<T>;` [⬆](#api)

Drops values from `AnyIterable` while the predicate function returns `true`
 
The predicate function will be called on each `AnyIterator.next` call and recieve the value

If it returns `true` the value will be dropped, otherwise the dropping process stops

```ts
const
  iterable: number[] = [3, 2, 5, 1, 4],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })();

  f = (val: number) => val <= 5;

dropWhile(iterable, f); // IterableIterator<1, 4>
dropWhile(asyncIterable, f); // AsyncIterableIterator<1, 4>

dropWhile(iterable, () => false); // IterableIterator<3, 2, 5, 1, 4>
dropWhile(asyncIterable, () => false); // AsyncIterableIterator<3, 2, 5, 1, 4>

dropWhile(iterable, () => true); // IterableIterator<> (done=true)
dropWhile(asyncIterable, () => true); // AsyncIterableIterator<> (done=true)
```

### `flat<T>(iterable: AsyncIterable<T | AnyIterable<T>>): AsyncIterableIterator<T>;` [⬆](#api)

Checks each value of the specified `AnyIterable`. If the value is `AnyIterable` yields its
values otherwise yields the value itself

```ts
const
  iterable: Array<number | Iterable<number>> = [1, [2], [], [3]],
  asyncIterable: AsyncGenerator<number | Iterable<number>> = (async function* () {
    yield* iterable;
  })();

flat(iterable); // IterableIterator<1, 2, 3>
flat(asyncIterable); // IterableIterator<1, 2, 3>
```

Note that if you have `AsyncIterable` `flat` can yield values of `AnyIterable` inside it


```ts
async function* nested(): AsyncGenerator<number> {
  yield 2;
}

async function* gen(): AsyncGenerator<number | AsyncIterable<number> | Iterable<number>> {
  yield 1;
  yield nested();
  yield [3];
}

flat(gen()); // AsyncIterableIterator<1, 2, 3>;
```

But if you have `Iterable` it yields only values from `Iterable` as well

```ts
async function* nested(): AsyncGenerator<number> {
  yield 2;
}

function* gen(): Generator<number | AsyncIterable<number> | Iterable<number>> {
  yield 1;
  yield nested();
  yield [2];
}

flat(gen()); // IterableIterator<1, AsyncIterable<2>, 3>;
```

### `flatMap<T, R>(iterable: AsyncIterable<T>, cb: (val: T) => AnyIterable<R> | R): AsyncIterableIterator<R>;` [⬆](#api)

Transforms each value to the value returned from the callback function and calls `flat` if the returned value is `AnyIterable`

The callback will be called on each `AnyIterator.next` call and recieve the value

If the returned value of the callback is `AnyIterable` `flat` will be called on that,
otherwise the transformed value will be yielded

Note specific types of iterables that `flat` can work with (see [`flat`](#flat%3Ct%3E(iterable%3A-asynciterable%3Ct-%7C-anyiterable%3Ct%3E%3E)%3A-asynciterableiterator%3Ct%3E%3B))

```ts
const
  iterable: Array<number> = [1, 2, 3],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })(),

  f = (val: number) => [val, val];

flatMap(iterable, f); // IterableIterator<1, 1, 2, 2, 3, 3>
flatMap(asyncIterable, f); // IterableIterator<1, 1, 2, 2, 3, 3>

```

### `filterMap<T, R>(iterable: AsyncIterable<T>, cb: (value: T) => Option<R>): AsyncIterableIterator<R>;` [⬆](#api)

The callback function should return [`Option`](/src/conainers/option/README.md) container type

If the returned from callback value is `Option.Some` the value inside `Option` it will stay,
otherwise it will be excluded (if the value is `Option.None`)

Let's say we have some container type that's pretty domain specific
and contains a bunch of methods to do some task

For example `Entry` can have methods like `val` (returns value), `key` (returns key), etc...

It also can have a method called `valAnd` which returns `Option.Some` with the value from the entry
if the passed predicate callback returns true, otherwise it returns `Option.None`

```ts
const entry = ['foo', 1];

Entry(entry).valAnd(([, val]) => val > 0); // Option.Some(1)
Entry(entry).valAnd(([, val]) => val > 2); // Option.None()
```

Then you can write pretty declarative code with this

```ts
const
  iterable = new Map<string, number>([
    ['foo', 21], 
    ['_bar', 42],
  ]),
  asyncIterable: AsyncGenerator<Entry<string, number>> = (async function* () {
    yield* iterable;
  })(),

  f = (entry: Entry<string, number>) => Entry(entry).valAnd(([key]) => !key.startsWith('_'));

filterMap(iterable, f); // IterableIterator<['foo', 21]>
filterMap(asyncIterable, fn); // AsyncIterableIterator<['foo', 21]>

filterMap([1, 2, 3], () => Option.None()); // IterableIterator<> (done=true)
filterMap([1, 2, 3], (val) => Option.Some(val * 2)); // IterableIterator<2, 4, 6> (done=true)
```

### `forEach<T>(iterable: AnyIterable<T>, cb: (value: T) => void): SyncPromise<void>;` [⬆](#api)

Iterates over passed `AnyIterable` object and calls the callback function

The callback will be called on each `AnyIterator.next` call and recieve value

It returns [`SyncPromise`](/src/containers/sync-promise/README.md) that will be resolved when
`AnyIterator` is done

```ts
const
  iterable: Array<number> = [1, 2, 3],
  asyncIterable: AsyncGenerator<number> = (async function* () {
    yield* iterable;
  })();
  
forEach(iterable, console.log).then(() => console.log('finished')); // 1 2 3 "finished"
forEach(asyncIterable, console.log).then(() => console.log('finished')); // 1 2 3 "finished"
```

### `product<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<TuplesFromIters<Iters>>` [⬆](#api)

Does cartesian product for the specified `AnyIterable` objects

Note that if any of the objects is `AsyncIterable` the combinator returns `AsyncIterableIterator`, otherwise it returns `IterableIterator`

```ts
product([1, 2], 'ab', [true]); // AsyncIterableIterator<[1, 'a'], [1, 'b'], [1, true], [2, 'a'], [2, 'b'], [2, true]>

async function* gen(): AsyncGenerator<number> {
  yield 1; yield 2;
}
product(gen(), 'ab', [true]); // AsyncIterableIterator<[1, 'a'], [1, 'b'], [1, true], [2, 'a'], [2, 'b'], [2, true]>
```

### `seq<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<Iters>` [⬆](#api)

Yields values of all passed `AnyIterable` objects

All it does is calling the [`flat`](#flattiterable-asynciterablet--anyiterablet-asynciterableiteratort) combinator on the iterables
and some extra checks to determine which iterable iterator to return

Note that if any of the objects is `AsyncIterable` the combinator returns `AsyncIterableIterator`, otherwise it returns `IterableIterator`

```ts
seq('foo', [1, 2], [true]); // IterableIterator<'f', 'o', 'o', 1, 2, true>

async function* gen(): AsyncGenerator<string> {
  yield 'f'; yield 'o'; yield 'o'
}
seq(gen(), [1, 2], [true]); // AsyncIterableIterator<'f', 'o', 'o', 1, 2, true>
```

### `cycle<T>(iterable: AnyIterable<T>): AnyIterableIterator<T>` [⬆](#api)

Loops through the specified `AnyIterable` and stores each value. Once the iterable is
done infinitely yields stored values

```ts
cycle('ab'); // IterableIterator<'a', 'b', 'a', 'b', 'a', 'b', ...>

async function* gen(): AsyncGenerator<number> {
  yield 'a'; yield 'b';
} 
cycle(gen()); // AsyncIterableIterator<'a', 'b', 'a', 'b', 'a', 'b', ...>

take(cycle([1]), 3); // IterableIterator<1, 1, 1>
```

### `fold<T, R>(iterable: AnyIterable<T>, init: R, cb: (acc: R, val: T) => R): Promisify<R>` [⬆](#api)

Transforms `AnyIterable` object into another specified value

If the passed iterable is `AsyncIterable` the function returns `Promise` with the transformed value,
otherwise it returns the value itself
 
The `init` argument specifies initial value that will be accepted on the first iteration

`cb` is the callback that will be called on each iteration and accept 2 arguments:
 
The first one is the current accumulator value (`init`)

The second one is the current value of iteration

It should return the new accumulator value for the next iteration
 
```ts
const
  iterable = [1, 2, 3],
  asyncIterable = (async function* (): AsyncGenerator<number> {
    yield 1; yield 2; yield 3;
  })();

fold(iterable, 0, (acc, val) => acc + val); // 6
fold(asyncIterable, '', (acc, val) => `${acc}${val}`); // Promise<'123'>
```

### `every<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): Promisify<boolean>` [⬆](#api)

Checks that every value in the specified `AnyIterable` matches the predicate

```ts
const
  isPositive = (val: number) => val > 0;

every([1, 2, 3], isPositive); // true
every([1, -2, 3], isPositive); // false

async function* gen(): AsyncGenerator<number> {
  yield 1; yield 2; yield 3;
}
every(gen(), isPositive); // Promise<true>

async function* gen2(): AsyncGenerator<number> {
  yield -1;
  yield* gen();
}
every(gen2(), isPositive); // Promise<false>
```

### `some<T>(iterable: AnyIterable<T>, predicate: (val: T) => boolean): Promisify<boolean>` [⬆](#api)

Checks that at least one value in the specified `AnyIterable` matches the predicate

```ts
const
  isPositive = (val: number) => val > 0;

some([1, 2, 3], isPositive); // true
some([1, -2, 3], isPositive); // true
some([-1, -2, -3], isPositive); // false

async function* gen(): AsyncGenerator<number> {
  yield 1; yield 2; yield 3;
}
every(gen(), isPositive); // Promise<true>

async function* gen2(): AsyncGenerator<number> {
  yield -1;
}
every(gen2(), isPositive); // Promise<false>

async function* gen3(): AsyncGenerator<number> {
  yield* gen2();
  yield* gen();
}
every(gen3(), isPositive); // Promise<true>
```

### `zip<Iters extends AnyIterable<any>[]>(...iterables: Iters): AnyIterableIterator<TuplesFromIters<Iters>>` [⬆](#api)

Zips the specified `AnyIterable` objects together

It takes one element from every `AnyIterable` object and creates a tuple from them

If any `AnyIterable` returns `{ done: true }` the returable `AnyIterableIterator` also returns `{ done: true }`

Note that if any of the objects is `AsyncIterable` the combinator returns `AsyncIterableIterator`, otherwise it returns `IterableIterator`

```ts
zip([1, 2, 3], [4, 5, 6], [7, 8, 9]); // IterableIterator<[1, 4, 7], [2, 5, 8], [3, 6, 9]>
zip([1, 2, 3], [4, 5], [7, 8, 9]); // IterableIterator<[1, 4, 7], [2, 5, 8]>

async function* gen(): AsyncGenerator<number> {
  yield 4; yield 5;
}

zip([1, 2, 3], gen()); // AsyncIterableIterator<[1, 4], [2, 5]>
```
