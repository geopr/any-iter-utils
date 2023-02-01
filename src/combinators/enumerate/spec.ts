import { sleep } from 'utils';

import { collect } from 'collectors';

import { enumerate } from './index';

describe('enumerate: transforms value from any iterable to entries', () => {
  it('sync', () => {
    function* gen(): Generator<string> {
      yield 'foo';
      yield 'bar';
    }

    const iter = enumerate(gen());
    expect(collect(iter, [])).toEqual([[0, 'foo'], [1, 'bar']]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<string> {
      yield 'foo';
      yield sleep(200).then(() => 'bar');
    }

    const iter = enumerate(gen());
    expect(await collect(iter, [])).toEqual([[0, 'foo'], [1, 'bar']]);

  });
});
