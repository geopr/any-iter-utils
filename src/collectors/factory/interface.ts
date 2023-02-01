import type { Collectable } from 'collectors/custom';

export interface CollectableProxy<T, R> extends Collectable<T> {
  readonly store: R;
}

export interface CollectableProxyCtr<T, R> {
  new(): CollectableProxy<T, R>;
}
