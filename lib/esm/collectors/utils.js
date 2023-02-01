import { isFunction, isMap, isSet } from 'utils';
import { intoMap } from './map';
import { intoSet } from './set';
import { intoObj } from './obj';
import { intoArr } from './arr';
import { intoCustom } from './custom';
export function resolver(to) {
    if (Array.isArray(to))
        return intoArr;
    if (isSet(to))
        return intoSet;
    if (isMap(to))
        return intoMap;
    if (isCollectable(to))
        return intoCustom;
    return intoObj;
}
function isCollectable(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.add);
}
