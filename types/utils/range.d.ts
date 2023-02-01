/**
 * creates `IterableIterator` with a range of numbers
 *
 * @param from - the range starts from this number
 *
 * @param to - the range ends at this number
 * if not specified either negative or positive `Inifinity` will be taken
 * depending on the sign of "from"
 *
 * @returns new `IterableIterator` with the range
 *
 * @example
 * range(1, 3); // IterableIterator<1, 2, 3>
 * range(-1, -3); // IterableIterator<-1, -2, -3>
 * range(-1, 1); // IterableIterator<-1, 0, 1>
 * range(1); // IterableIterator<from 1 to Inifinity>
 * range(-1); // IterableIterator<from -1 to -Infinity>
 */
export declare function range(from: number, to?: number): IterableIterator<number>;
