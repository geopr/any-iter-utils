
import { intoArr } from 'collectors';

import { 
  filter,
  map,
  flat,
  flatMap,
  filterMap,
  forEach,
  enumerate,
  drop,
  dropWhile,
  take,
  takeWhile,
} from 'combinators';

import { Option } from 'containers';

import { SyncIter, AsyncIter } from './index';

describe('Iter classes: produce the same result as composition of collectors and combinators', () => {
  describe('SyncIter', () => {
    it('map', () => {
      const 
        f = (n: number) => n * 2,

        r1 = SyncIter.from(gen()).map(f).map(String).collect([]),
        r2 = intoArr(map(map(gen(), f), String));

      expect(r1).toEqual(r2);
    });

    it('filter', () => {
      const 
        f = (n: number) => n > 1,

        r1 = SyncIter.from(gen()).filter(f).collect([]),
        r2 = intoArr(filter(gen(), f));

      expect(r1).toEqual(r2);
    });

    it('enumerate', () => {
      const 
        r1 = SyncIter.from(gen()).enumerate().collect([]),
        r2 = intoArr(enumerate(gen()));

      expect(r1).toEqual(r2);
    });

    it('take', () => {
      const 
        amount = 2,

        r1 = SyncIter.from(gen()).take(amount).collect([]),
        r2 = intoArr(take(gen(), amount));

      expect(r1).toEqual(r2);
    });

    it('drop', () => {
      const 
        amount = 2,

        r1 = SyncIter.from(gen()).drop(amount).collect([]),
        r2 = intoArr(drop(gen(), amount));

      expect(r1).toEqual(r2);
    });

    it('takeWhile', () => {
      const 
        f = (n: number) => n <= 2,

        r1 = SyncIter.from(gen()).dropWhile(f).collect([]),
        r2 = intoArr(dropWhile(gen(), f));

      expect(r1).toEqual(r2);
    });

    it('dropWhile', () => {
      const 
        f = (n: number) => n <= 2,

        r1 = SyncIter.from(gen()).takeWhile(f).collect([]),
        r2 = intoArr(takeWhile(gen(), f));

      expect(r1).toEqual(r2);
    });

    it('flat', () => {
      const 
        r1 = SyncIter.from(nestedGen()).flat().collect([]),
        r2 = intoArr(flat(nestedGen()));

      expect(r1).toEqual(r2);
    });

    it('flatMap', () => {
      const 
        f = (n: number) => [String(n), String(n)],

        r1 = SyncIter.from(gen()).flatMap(f).collect([]),
        r2 = intoArr(flatMap(gen(), f));

      expect(r1).toEqual(r2);
    });

    it('filterMap', () => {
      const 
        f = (n: number) => Option.Some(n).filter(n => n > 1).map(String),

        r1 = SyncIter.from(gen()).filterMap(f).collect([]),
        r2 = intoArr(filterMap(gen(), f));

      expect(r1).toEqual(r2);
    });

    it('forEach', () => {
      const
        r1: number[] = [],
        r2: number[] = [],

        f1 = jest.fn(),
        f2 = jest.fn();

      forEach(gen(), (val) => r1.push(val)).then(f1);
      SyncIter.from(gen()).forEach((val) => r2.push(val)).then(f2);

      expect(r1).toEqual(intoArr(gen()));
      expect(r1).toEqual(r2);
      expect(f1).toBeCalled();
      expect(f2).toBeCalled();
    });
  });

  describe('AsyncIter', () => {
    it('map', async () => {
      const 
        f = (n: number) => n * 2,

        r1 = await AsyncIter.from(agen()).map(f).map(String).collect([]),
        r2 = await intoArr(map(map(agen(), f), String));

      expect(r1).toEqual(r2);
    });

    it('filter', async () => {
      const 
        f = (n: number) => n > 1,

        r1 = await AsyncIter.from(agen()).filter(f).collect([]),
        r2 = await intoArr(filter(agen(), f));

      expect(r1).toEqual(r2);
    });

    it('enumerate', async () => {
      const 
        r1 = await AsyncIter.from(agen()).enumerate().collect([]),
        r2 = await intoArr(enumerate(agen()));

      expect(r1).toEqual(r2);
    });

    it('take', async () => {
      const 
        amount = 2,

        r1 = await AsyncIter.from(agen()).take(amount).collect([]),
        r2 = await intoArr(take(agen(), amount));

      expect(r1).toEqual(r2);
    });

    it('drop', async () => {
      const 
        amount = 2,

        r1 = await AsyncIter.from(agen()).drop(amount).collect([]),
        r2 = await intoArr(drop(agen(), amount));

      expect(r1).toEqual(r2);
    });

    it('takeWhile', async () => {
      const 
        f = (n: number) => n <= 2,

        r1 = await AsyncIter.from(agen()).dropWhile(f).collect([]),
        r2 = await intoArr(dropWhile(agen(), f));

      expect(r1).toEqual(r2);
    });

    it('dropWhile', async () => {
      const 
        f = (n: number) => n <= 2,

        r1 = await AsyncIter.from(agen()).takeWhile(f).collect([]),
        r2 = await intoArr(takeWhile(agen(), f));

      expect(r1).toEqual(r2);
    });

    it('flat', async () => {
      const 
        r1 = await AsyncIter.from(nestedAGen()).flat().collect([]),
        r2 = await intoArr(flat(nestedAGen()));

      expect(r1).toEqual(r2);
    });

    it('flatMap', async () => {
      const 
        f = (n: number) => [String(n), String(n)],

        r1 = await AsyncIter.from(agen()).flatMap(f).collect([]),
        r2 = await intoArr(flatMap(agen(), f));

      expect(r1).toEqual(r2);
    });

    it('filterMap', async () => {
      const 
        f = (n: number) => Option.Some(n).filter(n => n > 1).map(String),

        r1 = await AsyncIter.from(agen()).filterMap(f).collect([]),
        r2 = await intoArr(filterMap(agen(), f));

      expect(r1).toEqual(r2);
    });

    it('forEach', async () => {
      const
        r1: number[] = [],
        r2: number[] = [],

        f1 = jest.fn(),
        f2 = jest.fn();

      await Promise.all([
        forEach(agen(), (val) => r1.push(val)).then(f1),
        AsyncIter.from(agen()).forEach((val) => r2.push(val)).then(f2),
      ]);

      expect(r1).toEqual(await intoArr(agen()));
      expect(r1).toEqual(r2);
      expect(f1).toBeCalled();
      expect(f2).toBeCalled();
    });
  });
});

function* gen(): Generator<number> {
  yield 1; yield 2; yield 3;
}

async function* agen(): AsyncGenerator<number> {
  yield 1; yield 2; yield 3;
}

function* nestedGen(): Generator<number | Iterable<number>> {
  yield 0;
  yield gen();
}

async function* nestedAGen(): AsyncGenerator<number | AnyIterable<number>> {
  yield 0;
  yield gen();
  yield agen();
}
