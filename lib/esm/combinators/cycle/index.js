var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { fromGen, isAsyncIterable } from '../../utils';
export function cycle(iterable) {
    return isAsyncIterable(iterable) ? acycle(iterable) : scycle(iterable);
}
function scycle(iterable) {
    return fromGen(function* () {
        const buffer = [];
        while (true) {
            for (const value of iterable) {
                buffer.push(value);
                yield value;
            }
            yield* buffer;
        }
    });
}
function acycle(iterable) {
    return fromGen(function () {
        return __asyncGenerator(this, arguments, function* () {
            var _a, e_1, _b, _c;
            const buffer = [];
            while (true) {
                try {
                    for (var _d = true, iterable_1 = (e_1 = void 0, __asyncValues(iterable)), iterable_1_1; iterable_1_1 = yield __await(iterable_1.next()), _a = iterable_1_1.done, !_a;) {
                        _c = iterable_1_1.value;
                        _d = false;
                        try {
                            const value = _c;
                            buffer.push(value);
                            yield yield __await(value);
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = iterable_1.return)) yield __await(_b.call(iterable_1));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                yield __await(yield* __asyncDelegator(__asyncValues(buffer)));
            }
        });
    });
}
