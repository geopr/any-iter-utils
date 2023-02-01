import { createII } from '../../utils';
export function dropWhile(iterable, predicate) {
    return createII(iterable, function (chunk) {
        return predicate(chunk.value) ? this.next() : chunk;
    });
}
