import { collect } from 'collectors';

import { sleep } from 'utils';

import { flatMap } from './index';

describe('flatMap: if returned value is any iterable its values will be yielded, otherwise the returned value is yielded', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1; yield 2;
    }

    const 
      res1 = flatMap(gen(), (val) => val),
      res2 = flatMap(gen(), (val) => [val, val]);

    expect(collect(res1, [])).toEqual([1, 2]);
    expect(collect(res2, [])).toEqual([1, 1, 2, 2]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1; 
      yield sleep(200).then(() => 2);
    }

    const 
      res1 = flatMap(gen(), (val) => val),
      res2 = flatMap(gen(), (val) => [val, val]);

    expect(await collect(res1, [])).toEqual([1, 2]);
    expect(await collect(res2, [])).toEqual([1, 1, 2, 2]);
  });
});
