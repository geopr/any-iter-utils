import { fromGen } from 'utils';
/**
 * converts object into `IterableIterator` with entries `[key, value]`
 *
 * @param obj - the object to convert
 *
 * @returns new `IterableIterator` instance with the entries
 *
 * @example
 * objectEntries({ foo: '1', bar: '2' }); // IterableIterator<['foo', 1], ['bar', 2]>
 */
export function objectEntries(obj) {
    return fromGen(function* () {
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                yield [key, obj[key]];
            }
        }
    });
}
