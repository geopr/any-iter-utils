
import { collect } from 'collectors';

import { sleep } from 'utils';

import { flat } from './index';

describe('flat: if value of any iterable is any iterable its values will be yielded, otherwise the value itself is yielded', () => {
  it('sync', () => {
    function* gen(): Generator<number | Iterable<number>> {
      yield 1;
      yield [2, 3];
    }

    expect(collect(flat(gen()), [])).toEqual([1, 2, 3]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number | AnyIterable<number>> {
      yield 1;
      yield sleep(200).then(() => [2, 3]);
      yield (async function* () { yield 4; })();
    }

    expect(await collect(flat(gen()), [])).toEqual([1, 2, 3, 4]);
  });
});
