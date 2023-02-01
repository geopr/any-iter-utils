import { enumerate } from 'combinators';
import { createII } from 'utils';
export function take(iterable, amount) {
    return createII(enumerate(iterable), ({ value: entry }) => {
        const [idx, value] = entry;
        return idx >= amount ? { done: true, value: undefined } : { done: false, value };
    });
}
