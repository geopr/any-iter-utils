# Result

This module provides the `Result` container type that represents two states: everything is either `Ok` and there's an `Err`

The main idea of this class is to provide declarative and reliable way to work with possible errors

### API

- [`Ok<T, E>(val: T): Result<T, E>`](#okt-eval-t-resultt-e-)
- [`Err<E, T>(err: E): Result<T, E>`](#erre-terr-e-resultt-e-)
- [`isOk(): boolean`](#isok-boolean-)
- [`isOkAnd(predicate: (val: T) => boolean): boolean`](#isokandpredicate-val-t--boolean-boolean-)
- [`isErr(): boolean`](#iserr-boolean-)
- [`isErrAnd(predicate: (err: E) => boolean): boolean`](#iserrandpredicate-err-e--boolean-boolean-)
- [`match<R>(obj: MatchObject<T, E, R>): R`](#matchrobj-matchobjectt-e-r-r-)
- [`iter(): SyncIter<Option<T>>`](#iter-synciteroptiont-)
- [`unwrap(): T | never`](#unwrap-t--never-)
- [`unwrapErr(msg = 'Cannot apply "unwrapErr" to Ok'): E | never`](#unwraperrmsg--cannot-apply-unwraperr-to-ok-e--never-)
- [`unwrapOr(val: T | ((err: E) => T)): T`](#unwraporval-t--err-e--t-t-)
- [`map<R>(cb: (value: T) => R): Result<R, E>`](#maprcb-value-t--r-resultr-e-)
- [`mapOr<R>(val: R | ((err: E) => R), cb: (val: T) => R): R`](#maporrval-r--err-e--r-cb-val-t--r-r-)
- [`mapErr<R>(cb: (value: E) => R): Result<T, R>`](#maperrrcb-value-e--r-resultt-r-)
- [`ok(): Option<T>`](#ok-optiont-)
- [`err(): Option<E>`](#err-optione-)
- [`and<R>(res: Result<R, E> | ((val: T) => Result<R, E>)): Result<R, E>`](#andrres-resultr-e--val-t--resultr-e-resultr-e-)
- [`or(res: Result<T, E> | ((err: E) => Result<T, E>)): Result<T, E>`](#orres-resultt-e--err-e--resultt-e-resultt-e-)
- [`ResultError<E>`](#resulterrore-)

### `Ok<T, E>(val: T): Result<T, E>` [⬆](#api)

Returns the `Result` with the `Ok` state and the specified value

You can use either static method `Ok` or the function that does the same thing

```ts
Ok(21);
Ok(21);
```

### `Err<E, T>(err: E): Result<T, E>` [⬆](#api)

Returns the `Result` with the `Err` state and the specified error

You can use either static method `Err` or the function that does the same thing

```ts
Err(21);
Err(21);
```

### `isOk(): boolean` [⬆](#api)

Determines if the current state is `Ok`

```ts
Ok(21).isOk(); // true
Err(21).isOk(); // false
```

### `isOkAnd(predicate: (val: T) => boolean): boolean` [⬆](#api)

Determines if the current state is `Ok` and the predicate returns `true`

The predicate callback accepts the current value if exists

```ts
Ok(21).isSomeAnd((val) => val > 0); // true
Ok(21).isSomeAnd((val) => val < 0); // false
Resutl.Err(21).isSomeAnd((val) => val < 0); // false
```

### `isErr(): boolean` [⬆](#api)

Determines if the current state is `Err`

```ts
Ok(21).isErr(); // false
Err(21).isErr(); // true
```

### `isErrAnd(predicate: (err: E) => boolean): boolean` [⬆](#api)

Determines if the current state is `Err` and the predicate returns `true`

The predicate callback accepts the current error if exists

```ts
Err(21).isErrAnd((val) => val > 0); // true
Err(21).isErrAnd((val) => val < 0); // false
Resutl.Ok(21).isErrAnd((val) => val < 0); // false
```

### `match<R>(obj: MatchObject<T, E, R>): R` [⬆](#api)

The main way to determine the current state and manage the code flow

The idea is that you have to match every state. 
It's much less error prone than the default approach with `try/catch`

`obj` - The object of handlers for every state inside the `Result`

```ts
Ok(21).match({
  Ok: (val) => console.log('we are good'),
  Err: (err) => console.log('error'),
});
```

Each handler can return a value that can be used after matching

```ts
const num = Err(21).match({
  Ok: (val) => val,
  Err: (err) => err * 2,
}); // 42
```

### `iter(): SyncIter<Option<T>>` [⬆](#api)

Converts `Result` to [`Option`](/src/containers/option/README.md) 
then calls [`Option.iter`](/src/containers/option/README.md#iter-syncitert-) method

Example with `Ok`:

```ts
const 
  iterable = Ok(21).iter(),
  iter = iterable[Symbol.iterator]();

iter.next(); // { done: false, value: Some<21> }
iter.next(); // { done: true, value: undefined }
```

Example with `Err`:

```ts
const 
  iterable = Err(21).iter(),
  iter = iterable[Symbol.iterator]();

iter.next(); // { done: false, value: None }
iter.next(); // { done: true, value: undefined }
```

### `unwrap(): T | never` [⬆](#api)

Returns the current value if the state is `Ok`, otherwise throws the [`ResultError`](#resulterrore) with the current error

```ts
Ok(21).unwrap(); // 21
Err('foo').unwrap(); // ResultError('foo')
```

### `unwrapErr(msg = 'Cannot apply "unwrapErr" to Ok'): E | never` [⬆](#api)

Returns the current error if the state is `Err`, otherwise throws the an exception

```ts
Ok(21).unwrapErr(); // Error('Cannot apply "unwrapErr" to Ok')
Err('foo').unwrapErr(); // 'foo'
```

You can specify a custom expection message by passing it as an argument

```ts
Ok(21).unwrapErr('custom message'); // Error('custom message')
```

### `unwrapOr(val: T | ((err: E) => T)): T` [⬆](#api)

Returns the current value if the state is `Ok`, otherwise returns the specified value or the value returned from the callback

The callback accepts the current error if exists

```ts
Ok(21).unwrapOr(0); // 21
Err(21).unwrapOr((err) => err * 2); // 42
```

### `map<R>(cb: (value: T) => R): Result<R, E>` [⬆](#api)

If the current state is `Err`, returns `Err` with the current error

If the current state is `Ok`, applies the specified function to the current value and returns `Ok` with the new value

```ts
Ok(21).map((val) => val * 2); // Ok(42)
Err(21).map((val) => val * 2); // Err(21)
```

### `mapOr<R>(val: R | ((err: E) => R), cb: (val: T) => R): R` [⬆](#api)

If the current state is `Err`, returns the specified value or the value returned from the callback

If the current state is `Ok`, applies the specified function to the current value and returns the new value

```ts
Ok(21).mapOr(0, (val) => val * 2); // 42
Err(21).mapOr(String, (val) => val * 2); // "21"
```

### `mapErr<R>(cb: (value: E) => R): Result<T, R>` [⬆](#api)

If the current state is `Ok`, returns `Ok` with the current value

If the current state is `Err`, applies the specified function to the current error and returns `Err` with the new error

```ts
Ok(21).mapErr((val) => val * 2); // Ok(21)
Err(21).mapErr((val) => val * 2); // Err(42)
```

### `ok(): Option<T>` [⬆](#api)

If the current state is `Ok` retuns `Option.Ok` with the current value

If the current state is `Err` retuns `Option.None`

```ts
Ok(21).ok(); // Some(21)
Ok(null).ok(); // None
Err(21).ok(); // None
```

### `err(): Option<E>` [⬆](#api)

If the current state is `Ok` retuns `Option.None`

If the current state is `Err` retuns `Option.Some` with the current error

```ts
Err(21).err(); // Some(21)
Err(null).err(); // None
Ok(21).err(); // None
```

### `and<R>(res: Result<R, E> | ((val: T) => Result<R, E>)): Result<R, E>` [⬆](#api)

If the current state is `Err` returns `Err`, otherwise returns the specified or returned from the callback `Result`

The callback accepts the current value if exists

```ts
Ok(1).and((val) => Ok(val + 2)); // Ok(3)
Ok(1).and((val) => Err(2)); // Err(2)
Err(1).and((val) => Ok(1)); // Err(1)
Err(1).and((val) => Err(2)); // Err(1)
```

### `or(res: Result<T, E> | ((err: E) => Result<T, E>)): Result<T, E>` [⬆](#api)

Returns `Ok` with the current value if exists, otherwise returns the specified or returned from the callback `Result`

The callback accepts the current error if exists

```ts
Ok(1).or(() => Ok(2)); // Ok(1)
Ok(1).or(() => Reslt.Err(2)); // Ok(1)
Err(1).or((err) => Ok(err + 1)); // Ok(2)
Err(1).or((err) => Err(err + 2)); // Err(3)
```

### `ResultError<E>` [⬆](#api)

The custom error for `Result`. It extends the native `Error` classs adding one field called `err` (the current error inside the `Result`)

You can throw it using the statis `throw` method

```ts
try {
  ResultError.throw({ foo: 'bar' });
} catch (e) {
  e.err; // { foo: 'bar' }
  e.message; //  'Cannot unwrap Err'
}
```

To specify a custom message pass it as the second argument

```ts
ResultError.throw(21, 'custom msg');
new ResultError(21, 'custom msg');
```
