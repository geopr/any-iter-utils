"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
const utils_1 = require("../../utils");
function map(iterable, cb) {
    return (0, utils_1.createII)(iterable, ({ done, value }) => ({ done, value: cb(value) }));
}
exports.map = map;
