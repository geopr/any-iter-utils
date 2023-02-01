import { factory } from '../../collectors/factory';
export function intoSet(iterable, init = new Set()) {
    class C {
        constructor() {
            this.store = new Set(init);
        }
        add(val) {
            this.store.add(val);
        }
    }
    return factory(C, iterable);
}
