import { sleep } from 'utils';

import { intoArr } from './index';

describe('intoArr: collects values from any iterable to array', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 2;
    }

    const result = intoArr(gen());
    expect(result).toEqual([1, 2]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield sleep(200).then(() => 1);
      yield 2;
    }

    const result = await intoArr(gen());
    expect(result).toEqual([1, 2]);
  });
});
