import { take } from 'combinators';
import { intoArr } from 'collectors';

import { cycle } from './index';

describe('cycle: inifintely repeats the specified iterable', () => {
  it('sync', () => {
    const iter = cycle('ab');

    expect(iter.next().value).toBe('a');
    expect(iter.next().value).toBe('b');
    expect(iter.next().value).toBe('a');
    expect(iter.next().value).toBe('b');
    expect(iter.next().value).toBe('a');
    expect(iter.next().value).toBe('b');
    expect(iter.next().done).toBe(false);
    expect(iter.next().done).toBe(false);

    expect(intoArr(take(iter, 4))).toEqual(['a', 'b', 'a', 'b']);
  });

  it('async', async () => {
    const iter = cycle((async function* () {
      yield 'a'; yield 'b';
    })());

    expect((await iter.next()).value).toBe('a');
    expect((await iter.next()).value).toBe('b');
    expect((await iter.next()).value).toBe('a');
    expect((await iter.next()).value).toBe('b');
    expect((await iter.next()).value).toBe('a');
    expect((await iter.next()).value).toBe('b');

    expect((await iter.next()).done).toBe(false);
    expect((await iter.next()).done).toBe(false);

    expect(await intoArr(take(iter, 4))).toEqual(['a', 'b', 'a', 'b']);
  });
});
