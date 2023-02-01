import { isAsyncIterable, isIterable } from 'utils';

import { SyncIter, AsyncIter } from 'containers';

import { intoIter } from './index';

describe('intoIter: creates new instance of SyncIter or AsyncIter from different data types', () => {
  describe('sync', () => {
    it('creates SyncIter with the range of numbers', () => {
      const range = intoIter(1, 3);

      expect(range).toBeInstanceOf(SyncIter);
      expect(isIterable(range)).toBe(true);
      expect(isAsyncIterable(range)).toBe(false);

      expect(intoIter(1, 3).collect([])).toEqual([1, 2, 3]);
      expect(intoIter(-1, -3).collect([])).toEqual([-1, -2, -3]);
      expect(intoIter(-1, 2).collect([])).toEqual([-1, 0, 1, 2]);
    });

    it('creates SyncIter of entries from an object', () => {
      const 
        obj = { foo: 'bar', baz: 'bla' },
        iter = intoIter(obj);

      expect(iter).toBeInstanceOf(SyncIter);
      expect(isIterable(iter)).toEqual(true);
      expect(isAsyncIterable(iter)).toEqual(false);

      expect(iter.collect([])).toEqual([['foo', 'bar'], ['baz', 'bla']]);
    });

    it('create SyncIter from Iterable object', () => {
      function* gen(): Generator<number> {
        yield 1; yield 2;
      }

      const iter = intoIter(gen());

      expect(iter).toBeInstanceOf(SyncIter);
      expect(isIterable(iter)).toEqual(true);
      expect(isAsyncIterable(iter)).toEqual(false);

      expect(iter.collect([])).toEqual([1, 2]);
    });
  });

  describe('async', () => {
    it('creates AsyncIter from AsyncIterable object', async () => {
      async function* gen(): AsyncGenerator<number> {
        yield 1; yield 2;
      }

      const iter = intoIter(gen());

      expect(iter).toBeInstanceOf(AsyncIter);
      expect(isIterable(iter)).toEqual(false);
      expect(isAsyncIterable(iter)).toEqual(true);

      expect(await iter.collect([])).toEqual([1, 2]);
    });
  });
});
