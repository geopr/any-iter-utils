"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatMap = void 0;
const combinators_1 = require("../../combinators");
function flatMap(iterable, cb) {
    return (0, combinators_1.flat)((0, combinators_1.map)(iterable, cb));
}
exports.flatMap = flatMap;
