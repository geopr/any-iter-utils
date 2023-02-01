import { Ok, Err } from 'containers/result';

import { None, Some } from './index';

describe('Option container', () => {
  it('isNone: determines if current state of container is None', () => {
    expect(Some(21).isNone()).toBe(false);
    expect(None().isNone()).toBe(true);
  });

  it('isSome: determines if current state of container is Some', () => {
    expect(Some(21).isSome()).toBe(true);
    expect(None().isSome()).toBe(false);
  });

  it('isSomeAnd: determines if current state of container is Some and the predicate returns true', () => {
    expect(Some(21).isSomeAnd((val) => val > 0)).toBe(true);
    expect(Some(21).isSomeAnd((val) => val < 0)).toBe(false);
    expect(None().isSomeAnd(() => true)).toBe(false);
  });

  it('unwrap: returns value if current state is Some, otherwise throws an exception', () => {
    expect(Some(21).unwrap()).toBe(21);
    expect(None().unwrap).toThrowError();
    expect(() => None().unwrap('custom message')).toThrow('custom message');
  });

  it('unwrapOr: returns value if current state is Some otherwise, returns the specified value', () => {
    expect(Some(21).unwrapOr(1)).toBe(21);
    expect(None().unwrapOr(1)).toBe(1);
    expect(None().unwrapOr(() => 1)).toBe(1);
  });

  it('match: does "pattern matching" with possible container states', () => {
    const
      someFn = jest.fn(),
      noneFn = jest.fn();

    Some(1).match({
      Some: someFn,
      None: () => {},
    });

    None().match({
      Some: () => {},
      None: noneFn,
    });

    expect(someFn).toBeCalled();
    expect(noneFn).toBeCalled();

    const a = Some(1).match({
      Some: val => val + 1,
      None: () => 0,
    });
    expect(a).toBe(2);
  });

  it('filter: if predicate returns true the container\'s state stays as it is, otherwise it becomes None', () => {
    const
      someFn = jest.fn(),
      noneFn = jest.fn();

    Some(1)
      .filter((val) => val === 1)
      .match({ 
        Some: someFn,
        None: () => {},
      });

    Some(1)
      .filter((val) => val !== 1)
      .match({ 
        Some: () => {},
        None: noneFn,
      });

    expect(someFn).toBeCalled();
    expect(noneFn).toBeCalled();
  });

  it('map: changes value in container', () => {
    const result = Some(1)
      .map((val) => val + 9)
      .map(String)
      .map(Array.from)
      .match({ 
        Some: val => val,
        None: () => [],
      });

    expect(result).toEqual(['1', '0']);
  });

  it('mapOr: returns the specified value if current state is None, otherwise applies a function to the contained value and returns the result', () => {
    expect(Some(21).mapOr(0, (val) => val * 2)).toBe(42);
    expect(None().mapOr(() => 0, () => 21)).toBe(0);
  });

  it('okOr: converts current instance to Result', () => {
    expect(Some(21).okOr('err')).toEqual(Ok(21));
    expect(None().okOr('foo')).toEqual(Err('foo'));
  });

  it('iter: returns the SyncIter that yields the current instance of Option once', () => {
    check(Some(21));
    check(None());

    function check(opt: any): void {
      const 
        iterable = opt.iter(),
        iter = iterable[Symbol.iterator]();
     
      expect(iter.next()).toEqual({ done: false, value: opt });
      expect(iter.next()).toEqual({ done: true, value: undefined });
    }
  });

  it('and: returns None if the state is None, otherwise calls function with the wrapped value and returns the result', () => {
    expect(Some(1).and((val) => Some(val + 2))).toEqual(Some(3));
    expect(Some(1).and(() => None())).toEqual(None());
    expect(None().and(() => Some(1))).toEqual(None());
    expect(None().and(() => None())).toEqual(None());
  });

  it('and: if current state is None returns None, otherwise returns the specified Option', () => {
    expect(Some(1).and(Some(2))).toEqual(Some(2));
    expect(Some(1).and(None())).toEqual(None());
    expect(None().and(Some(1))).toEqual(None());
    expect(None().and(None())).toEqual(None());
  });

  it('or: returns Some with the current value if exists, otherwise returns the specified Option', () => {
    expect(Some(1).or(Some(2))).toEqual(Some(1));
    expect(Some(1).or(None())).toEqual(Some(1));
    expect(None().or(Some(1))).toEqual(Some(1));
    expect(None().or(None())).toEqual(None());
  });

  it('xor: returns Some if the current state and the state of the specified Option are different, otherwise returns None', () => {
    expect(Some(1).xor(Some(2))).toEqual(None());
    expect(Some(1).xor(None())).toEqual(Some(1));
    expect(None().xor(Some(1))).toEqual(Some(1));
    expect(None().xor(None())).toEqual(None());
  });
});
