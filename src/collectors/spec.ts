import { collect } from 'collectors';

import type { Collectable } from './interface';

describe('collect: collects values from any iterable to specified data structure', () => {
  describe('sync', () => {
    it('Array', () => {
      expect(collect(numberGen(), [])).toEqual([1, 2]);
    });

    it('Set', () => {
      expect(collect(numberGen(), new Set<number>())).toEqual(new Set([1, 2]));
    });

    it('Map', () => {
      const 
        entries = collect(entryGen(), new Map()).entries(),
        result = collect(entries, []);

      expect(result).toEqual([['foo', 1], ['bar', 2]]);
    });

    it('Object', () => {
      const result = collect(entryGen(), {});
      expect(result).toEqual({ foo: 1, bar: 2 });
    });

    it('Collectable', () => {
      const { store } = collect(numberGen(), customCollectable<number>());
      expect(store).toEqual([1, 2]);
    });
  });

  describe('async', () => {
    it('Array', async () => {
      expect(await collect(asyncNumberGen(), [])).toEqual([1, 2]);
    });

    it('Set', async () => {
      expect(await collect(asyncNumberGen(), new Set<number>())).toEqual(new Set([1, 2]));
    });

    it('Map', async () => {
      const
        map = await collect(asyncEntryGen(), new Map()),
        result = collect(map.entries(), []);

      expect(result).toEqual([['foo', 1], ['bar', 2]]);
    });

    it('Object', async () => {
      const result = await collect(asyncEntryGen(), {});
      expect(result).toEqual({ foo: 1, bar: 2 });
    });

    it('Collectable', async () => {
      const { store } = await collect(asyncNumberGen(), customCollectable<number>());
      expect(store).toEqual([1, 2]);
    });
  });
});

class CustomCollectable<T> implements Collectable<T> {
  readonly store: T[] = [];
  
  add(value: T): void {
    this.store.push(value);
  }
}

function customCollectable<T>(): CustomCollectable<T> {
  return new CustomCollectable();
}

function* numberGen(): Generator<number> {
  yield 1; yield 2;
}

async function* asyncNumberGen(): AsyncGenerator<number> {
  yield 1; yield 2;
}

function* entryGen(): Generator<Entry<'foo' | 'bar', number>> {
  yield ['foo', 1];
  yield ['bar', 2];
}

async function* asyncEntryGen(): AsyncGenerator<Entry<'foo' | 'bar', number>> {
  yield ['foo', 1];
  yield ['bar', 2];
}

