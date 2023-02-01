"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = void 0;
const combinators_1 = require("../../combinators");
const utils_1 = require("../../utils");
function seq(...iterables) {
    const isAsync = iterables.some(utils_1.isAsyncIterable);
    return (0, combinators_1.flat)(isAsync ? (0, utils_1.forceAsyncII)(iterables) : iterables);
}
exports.seq = seq;
