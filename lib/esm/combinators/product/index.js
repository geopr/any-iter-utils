import { flatMap, map, seq } from 'combinators';
import { cast } from 'utils';
export function product(...iterables) {
    const [firstIterable, ...restIterables] = iterables;
    return cast(flatMap(firstIterable, (firstVal) => map(seq(...restIterables), (val) => [firstVal, val])));
}
