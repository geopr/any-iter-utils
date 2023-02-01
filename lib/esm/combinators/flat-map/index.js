import { flat, map } from '../../combinators';
export function flatMap(iterable, cb) {
    return flat(map(iterable, cb));
}
