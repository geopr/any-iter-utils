"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = exports.intoSet = exports.intoMap = exports.intoArr = exports.intoObj = void 0;
const utils_1 = require("./utils");
var obj_1 = require("./obj");
Object.defineProperty(exports, "intoObj", { enumerable: true, get: function () { return obj_1.intoObj; } });
var arr_1 = require("./arr");
Object.defineProperty(exports, "intoArr", { enumerable: true, get: function () { return arr_1.intoArr; } });
var map_1 = require("./map");
Object.defineProperty(exports, "intoMap", { enumerable: true, get: function () { return map_1.intoMap; } });
var set_1 = require("./set");
Object.defineProperty(exports, "intoSet", { enumerable: true, get: function () { return set_1.intoSet; } });
function collect(iterable, to) {
    return (0, utils_1.resolver)(to)(iterable, to);
}
exports.collect = collect;
