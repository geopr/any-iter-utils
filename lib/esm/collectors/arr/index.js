import { factory } from '../../collectors/factory';
export function intoArr(iterable, init = []) {
    class C {
        constructor() {
            this.store = [...init];
        }
        add(val) {
            this.store.push(val);
        }
    }
    return factory(C, iterable);
}
