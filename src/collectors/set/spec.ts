import { sleep } from 'utils';

import { intoSet } from './index';

describe('intoSet: collects values from any iterable to Set', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 1;
      yield 2;
    }

    const result = intoSet(gen());
    expect(result).toEqual(new Set([1, 2]));
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1;
      yield sleep(200).then(() => 1);
      yield 2;
    }

    const result = await intoSet(gen());
    expect(result).toEqual(new Set([1, 2]));
  });
});
