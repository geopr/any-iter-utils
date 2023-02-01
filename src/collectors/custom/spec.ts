import { sleep } from 'utils';

import { Collectable, intoCustom } from './index';

class CustomCollectable<T> implements Collectable<T> {
  readonly store: T[] = [];

  add(value: T): void {
    this.store.push(value);
  }
}

describe('intoCustom: collects entries from any iterable to data structure that implements Collectable interface', () => {
  it('sync', () => {
    function* gen(): Generator<number> {
      yield 1;
      yield 2;
    }

    const { store } = intoCustom(gen(), new CustomCollectable());
    expect(store).toEqual([1, 2]);
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1;
      yield sleep(200).then(() => 2);
    }

    const { store } = await intoCustom(gen(), new CustomCollectable());
    expect(store).toEqual([1, 2]);
  });
});
