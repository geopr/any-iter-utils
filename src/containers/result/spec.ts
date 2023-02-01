import { Some, None } from 'containers/option';

import { Ok, Err, ResultError } from './index';

describe('Result container', () => {
  it('isOk: Determines if the current state is Ok', () => {
    expect(Ok(21).isOk()).toBe(true);
    expect(Err(21).isOk()).toBe(false);
  });

  it('isOkAnd: Determines if the current state is Ok and the predicate returns true', () => {
    expect(Ok(21).isOkAnd(val => val > 0)).toBe(true);
    expect(Ok(21).isOkAnd(val => val < 0)).toBe(false);
    expect(Err(21).isOkAnd(() => true)).toBe(false);
  });

  it('isErr: Determines if the current state is Err', () => {
    expect(Ok(21).isErr()).toBe(false);
    expect(Err(21).isErr()).toBe(true);
  });

  it('isErrAnd: Determines if the current state is Err and the predicate returns true', () => {
    expect(Err(21).isErrAnd(val => val > 0)).toBe(true);
    expect(Err(21).isErrAnd(val => val < 0)).toBe(false);
    expect(Ok(21).isErrAnd(() => true)).toBe(false);
  });

  it('match: Does "pattern matching" with possible container states', () => {
    const
      someFn = jest.fn(),
      noneFn = jest.fn();

    Ok(1).match({
      Ok: someFn,
      Err: () => {},
    });

    Err(1).match({
      Ok: () => {},
      Err: noneFn,
    });

    expect(someFn).toBeCalled();
    expect(noneFn).toBeCalled();

    const a = Ok(1).match({
      Ok: val => val + 1,
      Err: () => 0,
    });
    expect(a).toBe(2);
  });

  it('iter: Converts Result to Option then calls Option.iter method', () => {
    check(Ok, Some);
    check(Err, None);

    function check(f1: any, f2: any): void {
      const
        val = 21,

        optIter = f1(val).iter()[Symbol.iterator](),
        resIter = f2(val).iter()[Symbol.iterator]();

      expect(optIter.next()).toEqual(resIter.next());
      expect(optIter.next()).toEqual(resIter.next());
    }
  });

  it('unwrap: Returns the current value if the state is Ok, otherwise throws the ResultError with the current error', () => {
    expect(Ok(21).unwrap()).toBe(21);

    const err = { foo: 'bar' };
    try {
      Err(err).unwrap();
    } catch (e: any) {
      expect(e).toBeInstanceOf(ResultError);
      expect(e.err).toBe(err);
      expect(e.message).toBe('Cannot unwrap Err');
    }
  });

  it('unwrapErr: Returns the current error if the state is Err, otherwise throws the an exception', () => {
    expect(Ok(21).unwrapErr).toThrowError();
    expect(Err(21).unwrapErr()).toBe(21);
  });

  it('unwrapOr: Returns the current value if the state is Ok, otherwise returns the specified value', () => {
    expect(Ok(21).unwrapOr(0)).toBe(21);
    expect(Err(21).unwrapOr(() => 0)).toBe(0);
  });

  it('map: Applies the specified function to the current value and returns Ok with the new value', () => {
    expect(Ok(21).map((val) => val * 2).unwrap()).toBe(42);
    expect(Err<number, number>(21).map((val) => val * 2).unwrapErr()).toBe(21);
  });

  it('mapOr: If the current state is Err, returns the specified value, otherwise does mapping', () => {
  });

  it('mapErr: Applies the specified function to the current error and returns Err with the new value', () => {
    expect(Ok<number, number>(21).mapErr((val) => val * 2).unwrap()).toBe(21);
    expect(Err(21).mapErr((val) => val * 2).unwrapErr()).toBe(42);
  });

  it('ok: Converts Result to Option.Some with the current value', () => {
    expect(Ok(21).ok()).toEqual(Some(21));
    expect(Ok(undefined).ok()).toEqual(None());
    expect(Err(21).ok()).toEqual(None());
  });

  it('err: Converts Result to Option.Some with the current error', () => {
    expect(Err(21).err()).toEqual(Some(21));
    expect(Err(undefined).err()).toEqual(None());
    expect(Ok(21).err()).toEqual(None());
  });

  it('and: If the current state is Err returns Err, otherwise returns the specified Result', () => {
    expect(Ok(1).and(Ok(3))).toEqual(Ok(3));
    expect(Ok(1).and(Err(2))).toEqual(Err(2));
    expect(Err(1).and(Ok(1))).toEqual(Err(1));
    expect(Err(1).and(Err(2))).toEqual(Err(1));
  });

  it('or: Returns Ok with the current value if exists, otherwise returns the specified Result', () => {
    expect(Ok(1).or(Ok(2))).toEqual(Ok(1));
    expect(Ok(1).or(Err(2))).toEqual(Ok(1));
    expect(Err(1).or(Ok(1))).toEqual(Ok(1));
    expect(Err(1).or(Err(2))).toEqual(Err(2));
  });
});
