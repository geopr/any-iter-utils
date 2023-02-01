var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { isAsyncIterable } from 'utils';
export function some(iterable, predicate) {
    return isAsyncIterable(iterable) ? asome(iterable, predicate) : ssome(iterable, predicate);
}
function ssome(iterable, predicate) {
    for (const value of iterable) {
        if (predicate(value))
            return true;
    }
    return false;
}
function asome(iterable, predicate) {
    var _a, iterable_1, iterable_1_1;
    var _b, e_1, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (_a = true, iterable_1 = __asyncValues(iterable); iterable_1_1 = yield iterable_1.next(), _b = iterable_1_1.done, !_b;) {
                _d = iterable_1_1.value;
                _a = false;
                try {
                    const value = _d;
                    if (predicate(value))
                        return true;
                }
                finally {
                    _a = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = iterable_1.return)) yield _c.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    });
}
