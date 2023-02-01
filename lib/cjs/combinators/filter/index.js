"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
const utils_1 = require("../../utils");
function filter(iterable, predicate) {
    return (0, utils_1.createII)(iterable, function (chunk) {
        return predicate(chunk.value) ? chunk : this.next();
    });
}
exports.filter = filter;
