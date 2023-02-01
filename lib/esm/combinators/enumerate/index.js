import { map } from '../../combinators';
export function enumerate(iterable) {
    let i = 0;
    return map(iterable, (value) => [i++, value]);
}
