import type { SyncIter } from '../containers';
export interface Matchable<Matches extends string> {
    match<R>(obj: Record<Matches, AnyFunction>): R;
}
export interface IntoIter<T> {
    iter(): SyncIter<T>;
}
export interface Unwrapable<T> {
    unwrap(msg?: string): T | never;
}
export interface PartialUnwrappable<T> {
    unwrapOr(val: (() => T) | T): T;
}
export interface Monad<T, C> {
    map<R>(cb: (value: T) => R): C;
}
export interface PartialMonad<T> {
    mapOr<R>(init: R | (() => R), cb: (val: T) => R): R;
}
export interface Filterable<T, C> {
    filter(predicate: (value: T) => boolean): C;
}
export interface Into<R> {
    ok(): R;
}
export interface PartialInto<R> {
    okOr(val: any): R;
}
export interface Xorable<C> {
    xor(val: C | ((val?: any) => C)): C;
}
export interface Andable<C> {
    and(val: C | ((val?: any) => C)): C;
}
export interface Orable<C> {
    or(val: C | ((val?: any) => C)): C;
}
