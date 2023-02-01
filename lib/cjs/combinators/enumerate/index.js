"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerate = void 0;
const combinators_1 = require("../../combinators");
function enumerate(iterable) {
    let i = 0;
    return (0, combinators_1.map)(iterable, (value) => [i++, value]);
}
exports.enumerate = enumerate;
