import { sleep } from 'utils';

import { collect } from 'collectors';

import { take } from './index';

describe('take: iterates until the index of current value is less than specified amount', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 2;
      yield 3;
    }

    const iter = take(gen(), 2);
    expect(collect(iter, [])).toEqual([1, 2]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1;
      yield sleep(200).then(() => 2);
      yield 3;
    }

    const iter = take(gen(), 2);
    expect(await collect(iter, [])).toEqual([1, 2]);
  });
});
