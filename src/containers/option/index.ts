import { fromGen, isFunction } from 'utils';

import { Result, SyncIter } from 'containers';

import type { MatchObject, Traits } from './interface';

/**
 * This class represents two states: a value either exists or not
 *
 * The inexistance of a value is determined by checking it like that: `val == null`
 *
 * If the value exists `Option` contains `Some` state, otherwise `None`
 */
export class Option<T = unknown> implements Traits<T>
{
  protected constructor(
    /**
     * Current value
     */
    protected value?: T,
  ) {}

  /**
   * Represents existance of a value
   *
   * @returns new `Option` with the specified value
   */
  static Some<T>(val: T): Option<T> {
    return new Option(val);
  }

  /**
   * Represents inexistance of a value
   *
   * @returns new empty `Option`
   */
  static None<T>(): Option<T> {
    return new Option();
  }

  /**
   * Determines if the current state is `None`
   *
   * @example
   * Option.Some(21).isNone(); // false
   * Option.None().isNone(); // true
   */
  isNone(): boolean {
    return this.value == null;
  }

  /**
   * Determines if the current state is `Some`
   *
   * @example
   * Option.Some(21).isSome(); // true
   * Option.None().isSome(); // false
   */
  isSome(): boolean {
    return !this.isNone();
  }

  /**
   * Determines if the current state is `Some` and the predicate returns `true`
   *
   * @param predicate - Callback that will be invoked if the current state is `None`
   * It accepts the current value and should return `boolean` 
   *
   * @example
   * Option.Some(21).isSomeAnd((val) => val > 0); // true
   * Option.Some(21).isSomeAnd((val) => val < 0); // false
   * Option.None().isSomeAnd((val) => val < 0); // false
   */
  isSomeAnd(predicate: (val: T) => boolean): boolean {
    return this.match({
      Some: predicate,
      None: () => false,
    });
  }

  /**
   * Returns the current value if the state is `Some`, otherwise throws and exception
   *
   * @param msg - Custom error message in case of exception
   *
   * @example
   * Option.Some(21).unwrap(); // 21
   * Option.None().unwrap(); // Error('Cannot unwrap Option.None')
   * Option.None('custom message').unwrap(); // Error('custom message')
   */
  unwrap(msg = 'Cannot unwrap Option.None'): T | never {
    return this.match({
      Some: (val) => val,
      None: () => { throw new Error(msg); },
    });
  }

  /**
   * Returns the current value if the state is `Some`, otherwise returns the specified value
   *
   * @param val - The value that will be returned in case of current state is `None`
   *
   * @example
   * Option.Some(21).unwrapOr(0); // 21
   * Option.None().unwrapOr(0); // 0
   */
  unwrapOr(val: T): T;

  /**
   * Returns current value if the state is `Some`, otherwise returns the result of the callback
   *
   * @param cb - The callback that returns a value in case of current state is `None`
   *
   * @example
   * Option.Some(21).unwrapOr(() => 0); // 21
   * Option.None().unwrapOr(() => 0); // 0
   */
  unwrapOr(cb: () => T): T;

  unwrapOr(val: (() => T) | T): T {
    return this.match({
      Some: v => v,
      None: () => this.#unwrapF(val),
    });
  }

  /**
   * The main way to determine the current state and manage the code flow
   *
   * @param obj - The object of handlers for every state inside the `Option`
   * Each handler can return a value that can be used after matching
   *
   * @example
   * Option.Some(21).match({
   *   Some: (val) => console.log(`value ${value} exists`),
   *   None: () => console.log('value does not exist'),
   * });
   *
   * @example
   * const num = Option.None().match({
   *   Some: (val) => val,
   *   None: () => 0,
   * }); // 0
   */
  match<R>(obj: MatchObject<T, R>): R {
    return this.isSome() ? obj.Some(this.value!) : obj.None();
  }

  /**
   * If the current state is `None`, returns `None`
   * If the current state is `Some` and the predicate returns `true`, returns `Some` with the current value,
   * otherwise returns `None`
   *
   * @param predicate - The predicate function that accepts current value if exists
   *
   * @example
   * Option.Some(21).filter(val => val > 0); // Some(21)
   * Option.Some(21).filter(val => val < 0); // None
   * Option.None().filter(() => true); // None
   */
  filter(predicate: (value: T) => boolean): Option<T> {
    return this.match({
      Some: (val) => predicate(val) ? Some(val) : None(),
      None: None<T>,
    });
  }

  /**
   * If the current state is `None`, returns `None`
   * If the current state is `Some`, applies the specified function to the current value and returns `Some` with the new value
   *
   * @param cb - The callback that accepts current value and transforms it to a new one
   *
   * @example
   * Option.Some(21).map(val => val * 2); // Some(42)
   * Option.Some(21).map(() => null); // Some(null) -> None
   * Option.None().map(val => val * 2); // None
   */
  map<R>(cb: (value: T) => R): Option<R> {
    return this.match({
      Some: (val) => Some(cb(val)),
      None: None<R>,
    });
  }

  /**
   * If the current state is `None`, returns the specified value
   * If the current state is `Some`, applies the specified function to the current value and returns the new value
   *
   * @param init - The value that will be returned in case of current state is `None`
   * @param cb - The callback that accepts curent value and transforms it to a new one
   *
   * @example
   * Option.Some(21).mapOr(0, (val) => val * 2); // 42
   * Option.None().mapOr(0, (val) => val * 2); // 0
   */
  mapOr<R>(init: R, cb: (val: T) => R): R;

  /**
   * If the current state is `None`, returns the result of the specified function
   * If the current state is `Some`, applies the specified function to the current value and returns the new value
   *
   * @param getInit - The function that returns a value in case of current state is `None`
   *
   * @param cb - The callback that accepts curent value and transforms it to a new one
   *
   * @example
   * Option.Some(21).mapOr(() => 0, (val) => val * 2); // 42
   * Option.None().mapOr(()=> 0, (val) => val * 2); // 0
   */
  mapOr<R>(getInit: () => R, cb: (val: T) => R): R;

  mapOr<R>(init: R | (() => R), cb: (val: T) => R): R {
    return this.match({
      Some: cb,
      None: () => this.#unwrapF(init),
    });
  }

  /**
   * Converts `Option` into `Result`
   *
   * If the current state is `Some` returns `Result.Ok` with current value passed
   * If the current state is `None` returns `Result.Err` with the specified err
   *
   * @param err - Value for Result.Err in case of current state is `None`
   *
   * @example
   * Option.Some(21).okOr(0); // Result.Ok(21)
   * Option.None().okOr(0); // Result.Err(0)
   */
  okOr<E>(err: E): Result<T, E>;

  /**
   * Converts `Option` into `Result`
   *
   * If the current state is `Some` returns `Result.Ok` with current value passed
   * If the current state is `None` returns `Result.Err` with the value returned from the callback
   *
   * @param getErr - the function that returns a value for `Result.Err` in case of current state is `None`
   *
   * @example
   * Option.Some(21).ok_or(() => 0); // Result.Ok(21)
   * Option.None().ok_or(() => 0); // Result.Err(0)
   */
  okOr<E>(getErr: () => E): Result<T, E>;
  
  okOr<E>(val: E | (() => E)): Result<T, E> {
    return this.match({
      Some: Result.Ok<T, E>,
      None: () => Result.Err(this.#unwrapF(val)),
    });
  }

  /**
   * Converts `Option` to `SyncIter` that yields the current instance of `Option` once
   *
   * @example
   * const 
   *   iterable = Option.Some(21).iter(),
   *   iter = iterable[Symbol.iterator]();
   *
   * iter.next(); // { done: false, value: Some<21> }
   * iter.next(); // { done: true, value: undefined }
   *
   * @example
   * const 
   *   iterable = Option.None().iter(),
   *   iter = iterable[Symbol.iterator]();
   *
   * iter.next(); // { done: false, value: None }
   * iter.next(); // { done: true, value: undefined }
   */
  iter(): SyncIter<Option<T>> {
    const that = this;
    return SyncIter.from(fromGen(function* () { yield that; }));
  }

  /**
   * If the current state is `None` returns `None`, otherwise returns the specified `Option`
   * It's basically a `flatMap` operation
   *
   * @param opt - The `Option` that will be returned in case of current state is `Some`
   *
   * @example
   * Option.Some(1).and(Option.Some(2)); // Some(2)
   * Option.Some(1).and(Option.None()); // None
   * Option.None().and(Option.Some(1)); // None
   * Option.None().and(Option.None()); // None
   */
  and<R>(opt: Option<R>): Option<R>;

  /**
   * If the current state is `None` returns `None`, otherwise returns the `Option` returned from the callback
   * It's basically a `flatMap` operation
   *
   * @param cb - The callback that returns `Option`
   * It will be invoked with the current value in case of current state is `Some`
   *
   * @example
   * Option.Some(1).and((val) => Option.Some(val + 2)); // Some(3)
   * Option.Some(1).and((val) => Option.None()); // None
   * Option.None().and((val) => Option.Some(1)); // None
   * Option.None().and((val) => Option.None()); // None
   */
  and<R>(cb: (val: T) => Option<R>): Option<R>;

  and<R>(val: Option<R> | ((val: T) => Option<R>)): Option<R> {
    return this.match({
      Some: (curr) => isFunction(val) ? val(curr) : val,
      None: None<R>,
    });
  }

  /**
   * Returns `Some` with the current value if exists, otherwise returns the specified `Option`
   *
   * @param opt - The `Option` that will be returned in case of current state is `None`
   *
   * @example
   * Option.Some(1).or(Option.Some(2)); // Some(1)
   * Option.Some(1).or(Option.None()); // Some(1)
   * Option.None().or(Option.Some(1)); // Some(1)
   * Option.None().or(Option.None()); // None
   */
  or(opt: Option<T>): Option<T>;

  /**
   * Returns `Some` with the current value if exists, otherwise returns the `Option` returned from the callback
   *
   * @param getOpt - The callback that returns `Option`
   * It will be called in case of current state is `None`
   *
   * @example
   * Option.Some(1).or(() => Option.Some(2)); // Some(1)
   * Option.Some(1).or(() => Option.None()); // Some(1)
   * Option.None().or(() => Option.Some(1)); // Some(1)
   * Option.None().or(() => Option.None()); // None
   */
  or(getOpt: () => Option<T>): Option<T>;

  or(val: Option<T> | (() => Option<T>)): Option<T> {
    return this.match({
      Some: Some<T>,
      None: () => this.#unwrapF(val),
    });
  }

  /**
   * Returns `Some` if the current state and the state of the specified `Option` are different,
   * otherwise returns `None`
   *
   * @param opt - The `Option` to compare
   *
   * @example
   * Option.Some(1).xor(Option.Some(2)); // None
   * Option.Some(1).xor(Option.None()); // Some(1)
   * Option.None().xor(Option.Some(1)); // Some(1)
   * Option.None().xor(Option.None()); // None
   */
  xor(opt: Option<T>): Option<T>;

  /**
   * Returns `Some` if the current state and the state of the `Option` returned from the callback are different,
   * otherwise returns `None`
   *
   * @param getOpt - The callback that returns `Option` to compare
   *
   * @example
   * Option.Some(1).xor(() => Option.Some(2)); // None
   * Option.Some(1).xor(() => Option.None()); // Some(1)
   * Option.None().xor(() => Option.Some(1)); // Some(1)
   * Option.None().xor(() => Option.None()); // None
   */
  xor(getOpt: () => Option<T>): Option<T>;

  xor(val: Option<T> | (() => Option<T>)): Option<T> {
    return this.match({
      Some: (curr) => this.#unwrapF(val).isSome() ? None() : Some(curr),
      None: () => {
        const opt = this.#unwrapF(val);
        return opt.isSome() ? opt : None();
      },
    });
  }

  /**
   * Unwraps the value that can be either a plain value of a function without parameters
   * that returns a plain value
   *
   * @param val - A plain value or a function without parameters
   */
  #unwrapF<T>(val: T | (() => T)): T {
    return isFunction(val) ? val() : val;
  }
}

/**
 * Shortland for `Option.Some(val)`
 */
export function Some<T>(value: T): Option<T> {
  return Option.Some(value);
}

/**
 * Shortland for `Option.None`
 */
export function None<T>(): Option<T> {
  return Option.None();
}
