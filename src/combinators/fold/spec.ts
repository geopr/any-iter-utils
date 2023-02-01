import { fold } from './index';

describe('fold: transforms any iterable into another specified value', () => {
  it('sync', () => {
    const
      sum = fold([1, 2, 3], 0, (acc, val) => acc + val),
      str = fold([1, 2, 3], '', (acc, val) => `${acc}${val}`);

    expect(sum).toEqual(6);
    expect(str).toEqual('123');
  });

  it('async', async () => {
    async function* gen(): AsyncGenerator<number> {
      yield 1; yield 2; yield 3;
    }

    const
      sum = fold(gen(), 0, (acc, val) => acc + val),
      str = fold(gen(), '', (acc, val) => `${acc}${val}`);

    expect(await sum).toEqual(6);
    expect(await str).toEqual('123');
  });
});
