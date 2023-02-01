# Option

This module provides the `Option` container type that represents two states: a value either exists (`Some`) or not (`None`)

The `None` state considers `null` and `undefined` as the same thing

The main idea of this class is to provide declarative way to work with values that can possibly be nullable

### API

- [`Some<T>(val: T): Option<T>`](#sometval-t-optiont-)
- [`None<T>(): Option<T>`](#nonet-optiont-)
- [`isNone(): boolean`](#isnone-boolean-)
- [`isSome(): boolean`](#issome-boolean-)
- [`isSomeAnd(cb: (val: T) => boolean): boolean`](#issomeandcb-val-t--boolean-boolean-)
- [`unwrap(msg = 'Cannot unwrap Option.None'): T | never`](#unwrapmsg--cannot-unwrap-none-t--never-)
- [`unwrapOr(val: (() => T) | T): T`](#unwraporval---t--t-t-)
- [`match<R>(obj: MatchObject<T, R>): R`](#matchrobj-matchobjectt-r-r-)
- [`filter(predicate: (value: T) => boolean): Option<T>`](#filterpredicate-value-t--boolean-t-)
- [`map<R>(cb: (value: T) => R): Option<R>`](#maprcb-value-t--r-r-)
- [`mapOr<R>(init: R | (() => R), cb: (val: T) => R): R`](#maporrinit-r----r-cb-val-t--r-r-)
- [`okOr<E>(val: E | (() => E)): Result<T, E>`](#okoreval-e----e-resultt-e-)
- [`iter(): SyncIter<Option<T>>`](#iter-syncitert-)
- [`and<R>(val: Option<R> | ((val: T) => Option<R>)): Option<R>`](#andrval-r--val-t--r-r-)
- [`or(val: Option<T> | (() => Option<T>)): Option<T>`](#orval-t----t-t-)
- [`xor(val: Option<T> | (() => Option<T>)): Option<T>`](#xorval-t----t-t-)

### `Some<T>(val: T): Option<T>` [⬆](#api)

Represents existance of a value. It creates an `Option` with the specified value

You can either use a static method `Option.Some` or a function that does the same thing

```ts
Option.Some(21);
Some(21);
```

### `None<T>(): Option<T>` [⬆](#api)

Represents inexistance of a value. It creates an `Option` with the specified value

You can either use a static method `Option.None` or a function that does the same thing

```ts
Option.None();
None();
```

### `isNone(): boolean` [⬆](#api)

Determines if the current state is `None`

```ts
Some(21).isNone(); // false
None().isNone(); // true
```

### `isSome(): boolean` [⬆](#api)

Determines if the current state is `Some`

```ts
Some(21).isSome(); // true
None().isSome(); // false
```

### `isSomeAnd(cb: (val: T) => boolean): boolean` [⬆](#api)

Determines if the current state is `Some` and the predicate returns `true`

The predicate callback will be invoked If the current state is `None`. 
It accepts the current value and should return `boolean` 

```ts
Some(21).isSomeAnd((val) => val > 0); // true
Some(21).isSomeAnd((val) => val < 0); // false
None().isSomeAnd((val) => val < 0); // false
```

### `unwrap(msg = 'Cannot unwrap None'): T | never` [⬆](#api)

Returns the current value if the state is `Some`, otherwise throws and exception


```ts
Some(21).unwrap(); // 21
None().unwrap(); // Error('Cannot unwrap None')
```

You can specify a custom expection message by passing it as an argument

```ts
None('custom message').unwrap(); // Error('custom message')
```

### `unwrapOr(val: (() => T) | T): T` [⬆](#api)

Returns the current value if the state is `Some`, otherwise returns the specified value 
or the value returned from the callback

```ts
Some(21).unwrapOr(0); // 21
None().unwrapOr(() => 0); // 0
```

### `match<R>(obj: MatchObject<T, R>): R` [⬆](#api)

The main way to determine the current state and manage the code flow

The idea is that you have to match every state. 
It's much less error prone than the default approach with checking `null` or `undefined` with `if`

`obj` - The object of handlers for every state inside the `Option`

To control the code flow without `if`'s, matching can be used this way:

```ts
Some(21).match({
  Some: (val) => console.log(`value ${value} exists`),
  None: () => console.log('value does not exist'),
});
```

Each handler can return a value that can be used after matching

```ts
const num = None().match({
  Some: (val) => val,
  None: () => 0,
}); // 0
```

### `filter(predicate: (value: T) => boolean): T>` [⬆](#api)

If the current state is `None`, returns `None`

If the current state is `Some` and the predicate returns `true`, returns `Some` with the current value, otherwise returns `None`

```ts
Some(21).filter(val => val > 0); // Some(21)
Some(21).filter(val => val < 0); // None
None().filter(() => true); // None
```

### `map<R>(cb: (value: T) => R): R>` [⬆](#api)

If the current state is `None`, returns `None`

If the current state is `Some`, applies the specified function to the current value and returns `Some` with the new value

```ts
Some(21).map(val => val * 2); // Some(42)
Some(21).map(() => null); // Some(null) -> None
None().map(val => val * 2); // None
```

### `mapOr<R>(init: R | (() => R), cb: (val: T) => R): R` [⬆](#api)

If the current state is `None`, returns the specified value
or the value returned from the callback

If the current state is `Some`, applies the specified function to the current value and returns the new value

```ts
Some(21).mapOr(0, (val) => val * 2); // 42
None().mapOr(() => 0, (val) => val * 2); // 0
```

### `okOr<E>(val: E | (() => E)): Result<T, E>` [⬆](#api)

Converts `Option` into [`Result`](/src/containers/result/README.md)

If the current state is `Some` returns [`Result.Ok`](/src/containers/result/README.md#okt-eval-t-resultt-e-) with current value passed

If the current state is `None` returns [`Result.Err`](/src/containers/result/README.md#erre-terr-e-resultt-e-) with the specified value
or the value returned from the callback

```ts
Some(21).okOr(0); // Result.Ok(21)
None().okOr(() => 0); // Result.Err(0)
```

### `iter(): SyncIter<T>>` [⬆](#api)

Converts `Option` to [`SyncIter`](/src/containers/iter/README.md) that yields the current instance of `Option` once

Example with `Some`;

```ts
const 
 iterable = Some(21).iter(),
 iter = iterable[Symbol.iterator]();

iter.next(); // { done: false, value: Some<21> }
iter.next(); // { done: true, value: undefined }
```

Example with `None`:

```ts
const 
 iterable = None().iter(),
 iter = iterable[Symbol.iterator]();

iter.next(); // { done: false, value: None } 
iter.next(); // { done: true, value: undefined }
```

### `and<R>(val: R> | ((val: T) => R>)): R>` [⬆](#api)

If the current state is `None` returns `None`, otherwise returns the specified value
or the the value returned from the callback

It's basically a `flatMap` operation

```ts
Some(1).and((val) => Some(val + 1)); // Some(2)
Some(1).and(None()); // None
None().and(Some(1)); // None
None().and(None()); // None
```

### `or(val: T> | (() => T>)): T>` [⬆](#api)

Returns `Some` with the current value the state is `Some`, otherwise returns the specified value
or the value returned from the callback

```ts
Some(1).or(() => Some(2)); // Some(1)
Some(1).or(None()); // Some(1)
None().or(Some(1)); // Some(1)
None().or(None()); // None
```

### `xor(val: T> | (() => T>)): T>` [⬆](#api)

Returns `Some` if the current state and the state of the specified `Option` or the `Optoin` returned from the callback
are different, otherwise returns `None`

```ts
Some(1).xor(() => Some(2)); // None
Some(1).xor(None()); // Some(1)
None().xor(Some(1)); // Some(1)
None().xor(None()); // None
```
