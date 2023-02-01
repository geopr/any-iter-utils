"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoArr = void 0;
const factory_1 = require("../../collectors/factory");
function intoArr(iterable, init = []) {
    class C {
        constructor() {
            this.store = [...init];
        }
        add(val) {
            this.store.push(val);
        }
    }
    return (0, factory_1.factory)(C, iterable);
}
exports.intoArr = intoArr;
