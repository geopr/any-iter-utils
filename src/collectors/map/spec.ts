
import { intoArr } from 'collectors';

import { sleep } from 'utils';

import { intoMap } from './index';

describe('intoMap: collects entries from any iterable to Map', () => {
  it('sync', () => {
    function* gen(): Generator<Entry<{ key: string }, number>> {
      yield [{ key: 'foo' }, 1];
      yield [{ key: 'bar' }, 2];
    }

    const result = intoArr(intoMap(gen()).entries());

    expect(result).toEqual([
      [{ key: 'foo' }, 1],
      [{ key: 'bar' }, 2],
    ]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<Entry<{ key: string }, number>> {
      yield sleep(200).then(() => [{ key: 'foo' }, 1] as const);
      yield [{ key: 'bar' }, 2];
    }

    const 
      mapResult = await intoMap(gen()),
      result = intoArr(mapResult.entries());

    expect(result).toEqual([
      [{ key: 'foo' }, 1],
      [{ key: 'bar' }, 2],
    ]);
  });
});
