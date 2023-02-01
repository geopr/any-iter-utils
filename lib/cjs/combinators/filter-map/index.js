"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMap = void 0;
const combinators_1 = require("../../combinators");
function filterMap(iterable, cb) {
    const options = (0, combinators_1.map)(iterable, cb), onlySomes = (0, combinators_1.filter)(options, (opt) => opt.isSome());
    return (0, combinators_1.map)(onlySomes, (some) => some.unwrap());
}
exports.filterMap = filterMap;
