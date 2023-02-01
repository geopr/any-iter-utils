import { sleep } from 'utils';

import { collect } from 'collectors';

import { filter } from './index';

describe('filter: excludes values from any iterable', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 2;
      yield 3;
    }

    const iter = filter(gen(), (val) => val > 1);
    expect(collect(iter, [])).toEqual([2, 3]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1;
      yield sleep(200).then(() => 2);
      yield 3;
    }

    const iter = filter(gen(), (val) => val > 1);
    expect(await collect(iter, [])).toEqual([2, 3]);
  });
});
