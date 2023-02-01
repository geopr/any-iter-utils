/**
 * @returns a `Promise` that will be resolved in the specified milliseconds
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
