import { factory } from '../../collectors/factory';
export function intoCustom(iterable, init) {
    class C {
        constructor() {
            this.store = init;
            this.add = init.add.bind(init);
        }
    }
    return factory(C, iterable);
}
