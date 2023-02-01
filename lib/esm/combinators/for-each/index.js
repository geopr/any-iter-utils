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
import { SyncPromise } from 'containers';
import { isAsyncIterable } from 'utils';
/**
 * iterates over passed any iterable object
 *
 * @param iterable - any iterable object
 *
 * @param cb - the callback will be called on each iteration and recieve value of iterable
 *
 * @return - `SyncPromise` that will be resolved when iteraion is done
 *
 * @example
 * forEach([1, 2, 3], console.log).then(() => console.log('finish')); // 1 2 3 "finish"
 *
 * async function* gen(): AsyncGenerator<number> {
 *   yield 1; yield 2; yield 3;
 * }
 * forEach(gen(), console.log).then(() => console.log('finish')); // 1 2 3 "finish"
 */
export function forEach(iterable, cb) {
    return isAsyncIterable(iterable) ? aforEach(iterable, cb) : sforEach(iterable, cb);
}
function sforEach(iterable, cb) {
    return new SyncPromise((resolve) => {
        for (const value of iterable) {
            cb(value);
        }
        resolve();
    });
}
function aforEach(iterable, cb) {
    return new SyncPromise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, iterable_1 = __asyncValues(iterable), iterable_1_1; iterable_1_1 = yield iterable_1.next(), _a = iterable_1_1.done, !_a;) {
                _c = iterable_1_1.value;
                _d = false;
                try {
                    const value = _c;
                    cb(value);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = iterable_1.return)) yield _b.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        resolve();
    }));
}
