import { some } from './index';

describe('some: Checks that at least one value in the specified AnyIterable object matches the predicate', () => {
  it('sync', () => {
    const
      isPositive = (val: number) => val > 0;

    expect(some([1, 2, 3], isPositive)).toBe(true);
    expect(some([1, -2, 3], isPositive)).toBe(true);
    expect(some([-1, -2, -3], isPositive)).toBe(false);
  });

  it('async', async () => {
    const
      isPositive = (val: number) => val > 0;

    expect(await some(gen(), isPositive)).toBe(true);
    expect(await some(gen2(), isPositive)).toBe(false);
    expect(await some(gen3(), isPositive)).toBe(true);

    async function* gen(): AsyncGenerator<number> {
      yield 1; yield 2; yield 3;
    }

    async function* gen2(): AsyncGenerator<number> {
      yield -1;
    }

    async function* gen3(): AsyncGenerator<number> {
      yield* gen2();
      yield* gen();
    }
  });
});
