"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoCustom = void 0;
const factory_1 = require("../../collectors/factory");
function intoCustom(iterable, init) {
    class C {
        constructor() {
            this.store = init;
            this.add = init.add.bind(init);
        }
    }
    return (0, factory_1.factory)(C, iterable);
}
exports.intoCustom = intoCustom;
