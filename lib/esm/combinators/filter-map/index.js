import { map, filter } from 'combinators';
export function filterMap(iterable, cb) {
    const options = map(iterable, cb), onlySomes = filter(options, (opt) => opt.isSome());
    return map(onlySomes, (some) => some.unwrap());
}
