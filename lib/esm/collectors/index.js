import { resolver } from './utils';
export { intoObj } from './obj';
export { intoArr } from './arr';
export { intoMap } from './map';
export { intoSet } from './set';
export function collect(iterable, to) {
    return resolver(to)(iterable, to);
}
