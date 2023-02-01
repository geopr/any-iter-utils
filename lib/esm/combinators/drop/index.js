import { enumerate } from '../../combinators/enumerate';
import { createII } from '../../utils';
export function drop(iterable, amount) {
    return createII(enumerate(iterable), function ({ value: entry }) {
        const [idx, value] = entry;
        return idx < amount ? this.next() : { done: false, value };
    });
}
