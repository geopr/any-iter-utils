import type { Matchable, IntoIter, Unwrapable, PartialUnwrappable, Monad, PartialMonad, PartialInto, Filterable, Xorable, Andable, Orable, Result } from '../../containers';
import type { Option } from './index';
type States = 'Some' | 'None';
export interface MatchObject<T, R> {
    Some(val: T): R;
    None(): R;
}
export interface Traits<T> extends Matchable<States>, IntoIter<Option>, Unwrapable<T>, PartialUnwrappable<T>, Monad<T, Option>, PartialMonad<T>, PartialInto<Result>, Filterable<T, Option>, Xorable<Option>, Andable<Option>, Orable<Option> {
}
export {};
