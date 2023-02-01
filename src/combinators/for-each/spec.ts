import { sleep } from 'utils';

import { forEach } from './index';

describe('forEach: loops through any iterable and returns SyncPromise that will be resolved when loop is finished', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 2;
      yield 3;
    }

    const
      passed: number[] = [],
      onFinish = jest.fn();

    forEach(gen(), (val) => passed.push(val)).then(onFinish);

    expect(passed).toEqual([1, 2, 3]);
    expect(onFinish).toBeCalled();
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1;
      yield sleep(200).then(() => 2);
      yield 3;
    }

    const
      passed: number[] = [],
      onFinish = jest.fn();

    await forEach(gen(), (val) => passed.push(val)).then(onFinish);

    expect(passed).toEqual([1, 2, 3]);
    expect(onFinish).toBeCalled();
  });
});
