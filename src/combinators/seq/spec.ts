import { intoArr } from 'collectors';

import { seq } from './index';

describe('seq: yields values of all passed iterables', () => {
  it('sync', () => {
    expect(intoArr(seq('foo', [1, 2], [true]))).toEqual(['f', 'o', 'o', 1, 2, true]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1; yield 2;
    }

    expect(await intoArr(seq('foo', gen(), [true]))).toEqual(['f', 'o', 'o', 1, 2, true]);
  });
});
