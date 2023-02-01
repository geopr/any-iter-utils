import type { Matchable, IntoIter, Unwrapable, PartialUnwrappable, Monad, PartialMonad, Into, Andable, Orable, Option } from '../../containers';
import type { Result } from './index';
export type State = 'Ok' | 'Err';
export interface MatchObject<T, E, R> {
    Ok(val: T): R;
    Err(err: E): R;
}
export interface Traits<T> extends Matchable<State>, IntoIter<Option>, Unwrapable<T>, PartialUnwrappable<T>, Monad<T, Result>, PartialMonad<T>, Into<Option>, Andable<Result>, Orable<Result> {
}
