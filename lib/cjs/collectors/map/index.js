"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoMap = void 0;
const factory_1 = require("../../collectors/factory");
const utils_1 = require("../../utils");
function intoMap(iterable, init = new Map()) {
    class C {
        constructor() {
            this.store = (0, utils_1.cast)(new Map(init));
        }
        add([key, value]) {
            this.store.set(key, value);
        }
    }
    return (0, factory_1.factory)(C, iterable);
}
exports.intoMap = intoMap;
