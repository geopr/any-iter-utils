export type TuplesFromIters<Iters extends AnyIterable[]> =
  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>, AnyIterable<infer V3>, AnyIterable<infer V4>, AnyIterable<infer V5>, AnyIterable<infer V6>, AnyIterable<infer V7>, AnyIterable<infer V8>, AnyIterable<infer V9>]
    ? [V0, V1, V2, V3, V4, V5, V6, V7, V8, V9] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>, AnyIterable<infer V3>, AnyIterable<infer V4>, AnyIterable<infer V5>, AnyIterable<infer V6>, AnyIterable<infer V7>, AnyIterable<infer V8>]
    ? [V0, V1, V2, V3, V4, V5, V6, V7, V8] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>, AnyIterable<infer V3>, AnyIterable<infer V4>, AnyIterable<infer V5>, AnyIterable<infer V6>, AnyIterable<infer V7>]
    ? [V0, V1, V2, V3, V4, V5, V6, V7] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>, AnyIterable<infer V3>, AnyIterable<infer V4>, AnyIterable<infer V5>, AnyIterable<infer V6>]
    ? [V0, V1, V2, V3, V4, V5, V6] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>, AnyIterable<infer V3>, AnyIterable<infer V4>, AnyIterable<infer V5>]
    ? [V0, V1, V2, V3, V4, V5] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>, AnyIterable<infer V3>, AnyIterable<infer V4>]
    ? [V0, V1, V2, V3, V4] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>, AnyIterable<infer V3>]
    ? [V0, V1, V2, V3] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>, AnyIterable<infer V2>]
    ? [V0, V1, V2] :

  Iters extends [AnyIterable<infer V0>, AnyIterable<infer V1>]
    ? [V0, V1] :

  Iters extends [AnyIterable<infer V0>]
    ? [V0] :

  never;

export type ItersValues<I extends AnyIterable[]> = I extends AnyIterable<infer U>[] ? U : never;
