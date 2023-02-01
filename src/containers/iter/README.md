# Iter classes

This module provides two classes: `SyncIter` for working with `Iterable` objects and `AsyncIter` for working with `AsyncIterable` objects

These classes use [`combinators`](/src/combinators/README.md) and [`collectors`](/src/collectors/README.md) to do operations

What they actually do is they take the same signature from a collector or combinator, removes the first parameter (`AnyIterble`) and passes current instance
of itself instead

For example, the [`map`](/src/combinators/README.md#mapt-riterable-anyiterablet-cb-value-t--r-anyiterableiteratorr-) combinator method looks as following

```ts
import { map } from 'combinators';

class SyncIter<T> {
  map<R>(cb: (val: T) => R): SyncIter<R> {
    return new SyncIter(map(this, cb));
  }
}
```

The main idea of these classes is to get rid of compositions like this `map(filter(map(i, f1), f2), f3)`
to write them like this `map(f1).filter(f2).map(f3)`

To create an instance of a class static method `from` should be used

```ts
SyncIter.from([1, 2, 3])
  .map(f1);
  .filter(f2);
  .map(f3)
  .collect([]);
```

Note that `SyncIter` accepts only `Iterable` objects when `AsyncIter` accepts both `Iterable` and `AsyncIterable` objects

```ts
const 
  iterable: Iterable<number> = [],
  asyncIterable: AsyncIterable<number> = (async function* () {})();

AsyncIter.from(iterable);
AsyncIter.from(asyncIterable);
```

Each class has corresponding `Iterator` to loop through them

```ts
for (const value of SyncIter.from([])) {
}


for await (const value of AsyncIter.from([])) {
}
```

Most likely, you rarely will create instances of these classes directly. Instead the [`intoIter`](/src/containers/iter/factory/README.md) function will do this
