"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const combinators_1 = require("../../combinators");
const utils_1 = require("../../utils");
function product(...iterables) {
    const [firstIterable, ...restIterables] = iterables;
    return (0, utils_1.cast)((0, combinators_1.flatMap)(firstIterable, (firstVal) => (0, combinators_1.map)((0, combinators_1.seq)(...restIterables), (val) => [firstVal, val])));
}
exports.product = product;
