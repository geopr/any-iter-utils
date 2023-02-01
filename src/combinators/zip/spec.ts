import { intoArr } from 'collectors';

import { zip } from './index';

describe('zip: Takes one element from every AnyIterable object and creates a tuple from them', () => {
  it('sync', () => {
    const iterables = [
      [1, 2, 3],
      [4, 5, 6],
      'foo',
    ];

    expect(intoArr(zip(...iterables))).toEqual([
      [1, 4, 'f'],
      [2, 5, 'o'],
      [3, 6, 'o'],
    ]);
    expect(intoArr(zip([1, 2], [3]))).toEqual([[1, 3]]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1; yield 2; yield 3;
    }

    const iterables = [
      gen(),
      [4, 5, 6],
      'foo',
    ];

    expect(await intoArr(zip(...iterables))).toEqual([
      [1, 4, 'f'],
      [2, 5, 'o'],
      [3, 6, 'o'],
    ]);
    expect(await intoArr(zip(gen(), [3]))).toEqual([[1, 3]]);
  });
});
