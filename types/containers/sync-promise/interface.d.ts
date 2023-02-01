export type Executor<T> = (resolve: ExecResolve<T>, reject: ExecReject) => void | Promise<void>;
export type ExecResolve<T> = (value: PromiseLike<T> | T) => void;
export type ExecReject = (err: any) => void;
export type Status = 'rejected' | 'fullfilled' | 'pending';
export type IterValue<I extends Iterable<any>> = I extends Iterable<infer V> ? Awaited<V> : never;
