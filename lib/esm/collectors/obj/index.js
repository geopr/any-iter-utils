import { factory } from 'collectors/factory';
export function intoObj(iterable, init = {}) {
    class C {
        constructor() {
            this.store = Object.assign({}, init);
        }
        add([key, val]) {
            this.store[key] = val;
        }
    }
    return factory(C, iterable);
}
