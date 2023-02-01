# Factory for [Iter classes](/src/containers/iter/README.md)

This function is more powerful and preferable way to create [Iter classes](/src/containers/iter/README.md)

It accepts both `Iterable` and `AsyncIterable`. In this case it will simply return the corresponding Iter class

```ts
const 
  iterable: Iterable<number> = [];
  asyncIterable: AsyncIterable<number> = (async function* () {})();

intoIter(iterable); // SyncIter<number>
intoIter(asyncIterable); // AsyncIter<number>
```

If you pass it an object `{}`, it will return the `SyncIter` with entries `[key, value]`

```ts
intoIter({ foo: 1, bar: 2 }); // SyncIter<['foo', 1], ['bar', 2]>
```

It can also create `SyncIter` with number ranges

The first parameter is the number to start range from and the second one is where the range should end

If the end is not specified it will take either positive or negative `Infinity` depending on the sign of the start number

```ts
intoIter(1, 3); // SyncIter<1, 2, 3>
intoIter(-1, -3); // SyncIter<-1, -2, -3>
intoIter(-1, 1); // SyncIter<-1, 0, 1>
intoIter(1); // SyncIter<from 1 to Inifinity>
intoIter(-1); // SyncIter<from -1 to -Infinity>
```
