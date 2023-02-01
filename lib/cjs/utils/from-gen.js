"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromGen = void 0;
const utils_1 = require("../utils");
function fromGen(gen) {
    return (0, utils_1.createII)(gen());
}
exports.fromGen = fromGen;
