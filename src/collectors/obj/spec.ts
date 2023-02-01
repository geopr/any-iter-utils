
import { sleep } from 'utils';

import { intoObj } from './index';

describe('intoObj: collects entries from any iterable to object', () => {
  it('sync', () => {
    function* gen(): Generator<Entry<string, number>> {
      yield ['foo', 1];
      yield ['bar', 2];
    }

    const result = intoObj(gen());
    expect(result).toEqual({ foo: 1, bar: 2 });
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<Entry<string, number>> {
      yield sleep(200).then(() => ['foo', 1] as const);
      yield ['bar', 2];
    }

    const result = await intoObj(gen());
    expect(result).toEqual({ foo: 1, bar: 2 });
  });
});

