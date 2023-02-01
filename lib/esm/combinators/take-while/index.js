import { createII } from 'utils';
export function takeWhile(iterable, predicate) {
    return createII(iterable, (chunk) => {
        return predicate(chunk.value) ? chunk : { done: true, value: undefined };
    });
}
