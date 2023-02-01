"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolver = void 0;
const utils_1 = require("../utils");
const map_1 = require("./map");
const set_1 = require("./set");
const obj_1 = require("./obj");
const arr_1 = require("./arr");
const custom_1 = require("./custom");
function resolver(to) {
    if (Array.isArray(to))
        return arr_1.intoArr;
    if ((0, utils_1.isSet)(to))
        return set_1.intoSet;
    if ((0, utils_1.isMap)(to))
        return map_1.intoMap;
    if (isCollectable(to))
        return custom_1.intoCustom;
    return obj_1.intoObj;
}
exports.resolver = resolver;
function isCollectable(value) {
    return (0, utils_1.isFunction)(value === null || value === void 0 ? void 0 : value.add);
}
