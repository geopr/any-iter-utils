import { createII } from '../../utils';
export function filter(iterable, predicate) {
    return createII(iterable, function (chunk) {
        return predicate(chunk.value) ? chunk : this.next();
    });
}
