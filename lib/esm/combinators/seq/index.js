import { flat } from 'combinators';
import { forceAsyncII, isAsyncIterable } from 'utils';
export function seq(...iterables) {
    const isAsync = iterables.some(isAsyncIterable);
    return flat(isAsync ? forceAsyncII(iterables) : iterables);
}
