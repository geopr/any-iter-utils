"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoObj = void 0;
const factory_1 = require("../../collectors/factory");
function intoObj(iterable, init = {}) {
    class C {
        constructor() {
            this.store = Object.assign({}, init);
        }
        add([key, val]) {
            this.store[key] = val;
        }
    }
    return (0, factory_1.factory)(C, iterable);
}
exports.intoObj = intoObj;
