/**
 * standart assert function
 *
 * @param condition - condition to be asserted
 * @param msg - additional error message in case assertion's failed
 */
export function assert(condition, msg) {
    if (!condition)
        throw new Error(msg);
}
