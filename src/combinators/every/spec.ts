import { every } from './index';

describe('every: Checks that every value in the specified AnyIterable object matches the predicate', () => {
  it('sync', () => {
    const
      isPositive = (val: number) => val > 0;

    expect(every([1, 2, 3], isPositive)).toBe(true);
    expect(every([1, -2, 3], isPositive)).toBe(false);
  });

  it('async', async () => {
    const
      isPositive = (val: number) => val > 0;

    async function* gen(): AsyncGenerator<number> {
      yield 1; yield 2; yield 3;
    }

    async function* gen2(): AsyncGenerator<number> {
      yield -1;
      yield* gen();
    }

    expect(await every(gen(), isPositive)).toBe(true);
    expect(await every(gen2(), isPositive)).toBe(false);
  });
});
