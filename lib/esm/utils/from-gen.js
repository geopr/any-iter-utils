import { createII } from '../utils';
export function fromGen(gen) {
    return createII(gen());
}
