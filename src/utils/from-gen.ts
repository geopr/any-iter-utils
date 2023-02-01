import { createII } from 'utils';

/**
 * converts `Generator` function into `IterableIterator`
 *
 * @param gen - function that returns `Generator` object
 * @returns `IterableIterator` without "throw" and "return" methods
 */
export function fromGen<T>(gen: () => Generator<T>): IterableIterator<T>;

/**
 * converts `AsyncGenerator` function into `AsyncIterableIterator`
 *
 * @param gen - function that returns `AsyncGenerator` object
 * @returns `IterableIterator` without "throw" and "return" methods
 */
export function fromGen<T>(gen: () => AsyncGenerator<T>): AsyncIterableIterator<T>;

export function fromGen<T>(
  gen: () => Generator<T> | AsyncGenerator<T>,
): AnyIterableIterator<T> {
  return createII(gen());
}
