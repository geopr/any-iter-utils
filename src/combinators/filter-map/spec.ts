import { sleep } from 'utils';

import { Option } from 'containers';

import { collect } from 'collectors';

import { filterMap } from './index';

describe('filterMap: excludes and transforms values from any iterable if retured Option is not None', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 2;
      yield 3;
    }

    const
      iter = filterMap(gen(), (val) => Option.Some(val * 2).filter(val => val > 2));

    expect(collect(iter, [])).toEqual([4, 6]);
  });

  it('async', async () => {

    async function* gen(): AsyncGenerator<number> {
      yield 1;
      yield sleep(200).then(() => 2);
      yield 3;
    }

    const
      iter = filterMap(gen(), (val) => Option.Some(val * 2).filter(val => val > 2));

    expect(await collect(iter, [])).toEqual([4, 6]);
  });
});
