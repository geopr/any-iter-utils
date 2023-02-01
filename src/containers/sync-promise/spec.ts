import { isPromise, sleep  } from 'utils';

import { SyncPromise } from './index';

describe('sync promise', () => {
  it('resolves synchronously if possibles otherwise behaves as the native promise', async () => {
    const
      fn1 = jest.fn(),
      fn2 = jest.fn();

    SyncPromise.resolve(1).then(val => {
      fn1();
      expect(val).toBe(1);
    });

    expect(fn1).toBeCalled();

    SyncPromise.resolve(Promise.resolve(2)).then(val => {
      expect(val).toBe(2);

      expect(fn1).toBeCalled();
      expect(fn2).toBeCalled();
    });

    SyncPromise.resolve(SyncPromise.resolve(3)).then(val => {
      fn2();
      expect(val).toBe(3);
    });

    expect(fn2).toBeCalled();
  });

  it('rejects synchronously if possibles otherwise behaves as the native promise', () => {
    const
      thenHandler = jest.fn(),
      catchHandler = jest.fn();

    SyncPromise.reject(1)
      .then(thenHandler)
      .catch(e => {
        catchHandler();
        expect(e).toBe(1);
      });

    expect(thenHandler).not.toBeCalled();
    expect(catchHandler).toBeCalled();

    SyncPromise.reject(Promise.resolve(2)).catch(e => {
      expect(isPromise(e)).toBe(true);

      expect(thenHandler).not.toBeCalled();
      expect(catchHandler).toBeCalled();
    });

    const errHandler = jest.fn();

    SyncPromise.resolve(SyncPromise.reject(21)).then(null, (err) => {
      errHandler();
      expect(err).toBe(21);
    });

    expect(errHandler).toBeCalled();
  });

  it('executes finally callback no matter what', () => {
    const
      finallyCb = jest.fn();

    SyncPromise.resolve(21)
      .finally(finallyCb)
      .then(v => {
        throw v;
      })
      .catch()
      .finally(finallyCb);

    expect(finallyCb).toBeCalledTimes(2);
  });

  it('unwrap: returns current value if the SyncPromise is fulfilled, otherwise throws an exception', () => {
    expect(SyncPromise.resolve(1).unwrap()).toBe(1);

    expect(SyncPromise.reject(1).unwrap).toThrowError();
    expect(SyncPromise.resolve(Promise.resolve(1)).unwrap).toThrowError();
  });

  describe('SyncPromise.all', () => {
    it('works synchronously if possible otherwise works as Promise.all', async () => {
      const res1 = await SyncPromise.all([Promise.resolve(1), SyncPromise.resolve(2), 3]);
      expect(res1).toEqual([1, 2, 3]);

      const res2 = SyncPromise.all([1, SyncPromise.resolve(2), 3]).unwrap();
      expect(res2).toEqual([1, 2, 3]);
    });

    it('rejects SyncPromise if any of passed promises got rejected', () => {
      const
        thenHandler = jest.fn(),
        catchHandler = jest.fn();

      SyncPromise.all([1, SyncPromise.reject(2)])
        .then(thenHandler)
        .catch(e => {
          catchHandler();
          expect(e).toBe(2);
        });

      expect(thenHandler).not.toBeCalled();
      expect(catchHandler).toBeCalled();
    });
  });

  describe('SyncPromise.race', () => {
    it('works synchronously if possible otherwise works as Promise.race', async () => {
      const res1 = await SyncPromise.race([Promise.resolve(2), SyncPromise.resolve(1)]);
      expect(res1).toBe(1);

      const res2 = SyncPromise.race([SyncPromise.resolve(2), Promise.resolve(1)]).unwrap();
      expect(res2).toBe(2);
    });

    it('rejects SyncPromise if any of passed promises got rejected', () => {
      const
        thenHandler = jest.fn(),
        catchHandler = jest.fn();

      SyncPromise.all([SyncPromise.resolve(1), SyncPromise.reject(2)])
        .then(thenHandler)
        .catch(e => {
          catchHandler();
          expect(e).toBe(2);
        });

      expect(thenHandler).not.toBeCalled();
      expect(catchHandler).toBeCalled();
    });
  });

  describe('SyncPromise.any', () => {
    it('works synchronously if possible otherwise works as Promise.any', async () => {
      const res1 = await SyncPromise.any([sleep(200), Promise.resolve(21)]);
      expect(res1).toBe(21);

      const res2 = SyncPromise.any([SyncPromise.resolve(1), 2]).unwrap();
      expect(res2).toBe(1);
    });

    it('rejects SyncPromise if all of passed promises got rejected', async () => {
      try {
        await SyncPromise.any([Promise.reject(1), SyncPromise.reject(2)]);
      } catch (e: any) {
        expect(e.errors).toEqual([1, 2]);
      }

      try {
        await SyncPromise.any(new Set());
      } catch (e: any) {
        expect(e).toBeInstanceOf(AggregateError);
        expect(e.message).toEqual('No Promise in SyncPromise.any was resolved');
      }
    });
  });

  it('SyncPromise.allSettled: works as the native promise.allSettled', async () => {
    const result = await SyncPromise.allSettled([
      SyncPromise.reject(1),
      sleep(200).then(() => 2),
      Promise.reject(3),
    ]);

    expect(result).toEqual([
      { status: 'rejected', reason: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'rejected', reason: 3 },
    ]);
  });
});
