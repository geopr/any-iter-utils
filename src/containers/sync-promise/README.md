# SyncPromise

This module provides a single class that implements the native `Promise` interface but
works synchoronsly if possible

It will work synchronously if it doesn't deal with any `PromiseLike` objects that can cause delays

```ts
console.log(1);
SyncPromise.resolve(2);
SyncPromise.resolve(SyncPromise.resolve(3));
console.log(4);

// the output: 1, 2, 3, 4
```

The following example demonstratets asynchronous behavior. It starts acting as the native `Promise`

```ts
console.log(1);
SyncPromise.resolve(Promise.resolve(2));
console.log(3);

// the output: 1, 3, 2
```

## Additonal API

### unwrap

This methods returns current value of the `SyncPromise` if the promise is fulfilled, otherwise throws an exception

```ts
SyncPromise.resolve(1).unwrap(); // 1

SyncPromise.reject(1).unwrap(); // Exception
SyncPromise.resolve(Promise.resolve(1)).unwrap(); // Exception
```
