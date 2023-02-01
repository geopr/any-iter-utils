import { sleep } from 'utils';

import { collect } from 'collectors';

import { map } from './index';

describe('map: transforms values from inital to specified', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 2;
      yield 3;
    }

    const iter = map(gen(), (val) => val * 2);
    expect(collect(iter, [])).toEqual([2, 4, 6]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1;
      yield sleep(200).then(() => 2);
      yield 3;
    }

    const iter = map(gen(), (val) => val * 2);
    expect(await collect(iter, [])).toEqual([2, 4, 6]);
  });
});
