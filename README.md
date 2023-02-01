# Utils for any iterable objects

![build](https://img.shields.io/github/actions/workflow/status/geopr/any-iter-utils/build.yml?label=build)
![unit tests](https://img.shields.io/github/actions/workflow/status/geopr/any-iter-utils/tests.yml?label=unit%20tests)

Helpers for working with any iterable objects and some useful container types

Highly inspired by python [itertools](https://docs.python.org/3/library/itertools.html),
rust [std::iter](https://doc.rust-lang.org/std/iter/trait.Iterator.html) and tc39 [any-iter-utils](https://github.com/tc39/proposal-iterator-helpers)

### Getting started

Before start using the library use can additionally include prelude file which currenly contains **only global types**:

```ts
import 'any-iter-utils/prelude';
```

These types are used by the library and can be helpful if you decide to write your own helpers or something

See [prelude.d.ts](https://github.com/geopr/any-iter-utils/blob/main/prelude.d.ts)

### Combinators

The basic usage of any helper would look like this:

```ts
import { map } from 'any-iter-utils/combinators';

const
  iterable = [1, 2, 3],
  mapper = (v: number) => v * 2;

map(iterable, mapper); // IterableIterator<2, 4, 6>

const asyncIterable = (async function* () {
  yield 1; yield 2; yield 3;
})();

map(asyncIterable, mapper); // AsyncIterableIterator<2, 4, 6>
```

See [combinators](https://github.com/geopr/any-iter-utils/blob/main/src/combinators/README.md) for all available helpers

### Collectors

If you want to collect your iterable into some data structure you can use [collectors](https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md):

```ts
import { intoArr, intoSet } from 'any-iter-utils/collectors';

function* gen(): Generator<number> {
  yield 1; yield 2; yield 1;
}

intoArr(gen()); // [1, 2, 1]

async function* agen(): AsyncGenerator<number> {
  yield 1; yield 2; yield 1
}

intoSet(agen()); // Promise<Set<1, 2>>
```

Or a universal function [collect](https://github.com/geopr/any-iter-utils/blob/main/src/collectors/README.md#collectiterable-anyiterableany-to-collectables-promisifycollectables-). 
The example above is equivalent to:

```ts
import { collect } from 'any-iter-utils/collectors';

collect(gen(), []); // [1, 2, 1]
collect(agen(), new Set()); // Promise<Set<1, 2>>
```

### Containers

Using only combinators sometimes can be more accurate but often it leads to something like this:

```ts
map(filter(map(filter(iterable, f1), f2), f3), f4);
```

To get rid of this problem you can use `SyncIter` and `AsyncIter` containers.
The example above is equivalent to:

```ts
import { SyncIter } from 'any-iter-utils/containers';

SyncIter.from(iterable)
  .filter(f1)
  .map(f2)
  .filter(f3)
  .map(f4)
```

See [containers](https://github.com/geopr/any-iter-utils/blob/main/src/containers/README.md) for all available container types

### Building

Install dependencies with `npm ci`, then run `npm run build`

The `build` command will generate esm bundle `lib/esm`, cjs bundle `lib/cjs` and declaration files in `types` folder
