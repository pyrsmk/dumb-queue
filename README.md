dumb-queue
==========

A simple and performant queue that handles async functions in order, with a wait time between each callback. It can be used as a rate limiter or to ensure asynchroneous operations are synchroneous, and not in parallel (which can be a wide source of bugs in many systems and software architectures).

Install
-------

```shell
npm install @pyrsmk/dumb-queue
```

Usage
-----

```js
// Initialize queue with a wait time of 1000ms.
// If you don't need a wait time, you can obviously set it to `0`.
const queue = require('dumb-queue')(1000)

// The callback must return a promise so`the queue know when the task has finished.
queue(() => someAsyncSlowAction1())
// ...
// Further in your code.
queue(() => someAsyncSlowAction2())
// ...
// You can, of course, use non-async functions with the help of `async` which will
// always return a promise.
queue(async () => someSyncSlowAction3())

// Wait until the queue is empty.
await queue.wait()
```

Compatibility
-------------

Node 8+
