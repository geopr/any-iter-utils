"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoSet = void 0;
const factory_1 = require("../../collectors/factory");
function intoSet(iterable, init = new Set()) {
    class C {
        constructor() {
            this.store = new Set(init);
        }
        add(val) {
            this.store.add(val);
        }
    }
    return (0, factory_1.factory)(C, iterable);
}
exports.intoSet = intoSet;
