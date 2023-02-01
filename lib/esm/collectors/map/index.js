import { factory } from 'collectors/factory';
import { cast } from 'utils';
export function intoMap(iterable, init = new Map()) {
    class C {
        constructor() {
            this.store = cast(new Map(init));
        }
        add([key, value]) {
            this.store.set(key, value);
        }
    }
    return factory(C, iterable);
}
