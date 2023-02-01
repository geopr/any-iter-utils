import { isFunction, isMap, isSet } from 'utils';

import type { Collector, Collectables, Collectable } from './interface';

import { intoMap } from './map';
import { intoSet } from './set';
import { intoObj } from './obj';
import { intoArr } from './arr';
import { intoCustom } from './custom';

export function resolver(to: Collectables): Collector {
  if (Array.isArray(to)) return intoArr;

  if (isSet(to)) return intoSet;

  if (isMap(to)) return intoMap;

  if (isCollectable(to)) return intoCustom;

  return intoObj;
}

function isCollectable(value: any): value is Collectable<any> {
  return isFunction(value?.add);
}
