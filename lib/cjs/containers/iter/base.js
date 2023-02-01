"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseIter = void 0;
const utils_1 = require("../../utils");
const collectors_1 = require("../../collectors");
const combinators_1 = require("../../combinators");
/**
 * The base class for further inheritance for `SyncIter` and `AsyncIter`
 */
class BaseIter {
    constructor(iterable) {
        this.iterable = iterable;
        this.self = this;
    }
    collect(to) {
        return (0, collectors_1.collect)(this.self, to);
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#mapt-riterable-anyiterablet-cb-value-t--r-anyiterableiteratorr map}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    map(cb) {
        return this.new((0, combinators_1.map)(this.self, cb));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#filtertiterable-anyiterablet-cb-value-t--boolean-anyiterableiteratort filter}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    filter(cb) {
        return this.new((0, combinators_1.filter)(this.self, cb));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#enumeratetiterable-anyiterablet-anyiterableiteratorentrynumber-t enumerate}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    enumerate() {
        return this.new((0, combinators_1.enumerate)(this.self));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#taketiterable-asynciterablet-amount-number-asynciterableiteratort take}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    take(amount) {
        return this.new((0, combinators_1.take)(this.self, amount));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#droptiterable-anyiterablet-amount-number-anyiterableiteratort drop}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    drop(amount) {
        return this.new((0, combinators_1.drop)(this.self, amount));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#takewhiletiterable-anyiterablet-predicate-val-t--boolean-anyiterableiteratort takeWhile}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    takeWhile(cb) {
        return this.new((0, combinators_1.takeWhile)(this.self, cb));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#dropwhiletiterable-anyiterablet-predicate-val-t--boolean-anyiterableiteratort dropWhile}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    dropWhile(cb) {
        return this.new((0, combinators_1.dropWhile)(this.self, cb));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#flattiterable-asynciterablet--anyiterablet-asynciterableiteratort flat}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    flat() {
        return this.new((0, combinators_1.flat)(this.self));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#flatmapt-riterable-asynciterablet-cb-val-t--anyiterabler--r-asynciterableiteratorr flatMap}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    flatMap(cb) {
        return this.new((0, combinators_1.flatMap)(this.self, cb));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#filtermapt-riterable-asynciterablet-cb-value-t--optionr-asynciterableiteratorr filterMap}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    filterMap(cb) {
        return this.new((0, combinators_1.filterMap)(this.self, cb));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#foreachtiterable-anyiterablet-cb-value-t--void-syncpromisevoid forEach}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    forEach(cb) {
        return (0, combinators_1.forEach)(this.self, cb);
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#productiters-extends-anyiterableanyiterables-iters-anyiterableiteratortuplesfromitersiters product}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    product(...iterables) {
        return this.new((0, combinators_1.product)(this.self, ...iterables));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#seqiters-extends-anyiterableanyiterables-iters-anyiterableiteratoriters seq}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    seq(...iterables) {
        return this.new((0, combinators_1.seq)(this.self, ...iterables));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#cycletiterable-anyiterablet-anyiterableiteratort cycle}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    cycle() {
        return this.new((0, combinators_1.cycle)(this.self));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#foldt-riterable-anyiterablet-init-r-cb-acc-r-val-t--r-promisifyr fold}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    fold(init, cb) {
        return (0, utils_1.cast)((0, combinators_1.fold)(this.self, init, cb));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#everytiterable-anyiterablet-predicate-val-t--boolean-promisifyboolean every}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    every(predicate) {
        return (0, utils_1.cast)((0, combinators_1.every)(this.self, predicate));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#sometiterable-anyiterablet-predicate-val-t--boolean-promisifyboolean some}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    some(predicate) {
        return (0, utils_1.cast)((0, combinators_1.some)(this.self, predicate));
    }
    /**
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md#zipiters-extends-anyiterableanyiterables-iters-anyiterableiteratortuplesfromitersiters product}
     * @see {@link https://github.com/geopr/any-iter-utils/blob/main/src/iter/README.md#iter-classes Iter class}
     */
    zip(...iterables) {
        return this.new((0, combinators_1.zip)(this.self, ...iterables));
    }
    /**
     * creates a new instance of current class
     * it will be either `SyncIter` or `AsyncIter`
     */
    new(ii) {
        return new this.constructor(ii);
    }
}
exports.BaseIter = BaseIter;
