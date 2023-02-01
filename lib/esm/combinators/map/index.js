import { createII } from '../../utils';
export function map(iterable, cb) {
    return createII(iterable, ({ done, value }) => ({ done, value: cb(value) }));
}
