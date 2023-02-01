import { intoArr } from 'collectors';
import { product } from './index';

const expected = [
  [1, 'a'], [1, 'b'], [1, true],
  [2, 'a'], [2, 'b'], [2, true],
  [3, 'a'], [3, 'b'], [3, true],
];

describe('product: does cartesian product of input iterables', () => {
  it('sync', () => {
    const result = intoArr(product([1, 2, 3], 'ab', [true]));
    expect(result).toEqual(expected);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1; yield 2; yield 3;
    }

    const result = await intoArr(product(gen(), 'ab', [true]));
    expect(result).toEqual(expected);
  });
});
