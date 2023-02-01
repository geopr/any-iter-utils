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
export declare function objectEntries<O extends Record<PropertyKey, any>>(obj: O): IterableIterator<Entry<keyof O, O[keyof O]>>;
