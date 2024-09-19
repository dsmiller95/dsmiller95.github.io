---
title: Emulating multi-threading in javascript using generators
tags: [typescript, rxjs, javascript]
date: 2020-05-31T05:25:44.226Z
path: blog/javascript-multi-threading
cover: ./preview.png
excerpt: Learn a handy hack to run expensive code on the UI thread.
author: Dan Miller
---

While working on a long-running algorithm I came across a handy way to utilize javascript generator functions to keep it from blocking the UI thread.

# Making some work

To test our utility, we first need something expensive to do. We'll be using a naive prime number generator for this purpose. This isn't a very efficient algorithm, and if given a very large number and it would at best block all UI interaction, at worst crash the page:

```typescript
function getPrimes(number: number): number[] {
  const result = [];
  let lastPrime = 1;
  for (var i = 0; i < number; i++) {
    lastPrime = nextPrime(lastPrime);
    result.push(lastPrime);
  }
  return result;
}
function nextPrime(n: number): number {
  for (; !isPrime(n); n++) {}
  return n;
}
function isPrime(n: number): boolean {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
```

To give the UI thread some breathing room, the prime search algorithm has to have some mechanism to yield execution back to something else. Generator functions are ideal for this, so we can convert the getPrimes function to a generator function. A handy side effect is that we no longer need to keep track of a results array:

```typescript
function* getPrimes(number: number): Generator<number> {
  let lastPrime = 1;
  for (var i = 0; i < number; i++) {
    lastPrime = nextPrime(lastPrime);
    console.log(`Generated: ${lastPrime}`);
    yield lastPrime;
  }
}
```

We can see that this only generates values as we need them by pulling values from the generator with a loop:

```typescript
for (let prime of getPrimes(5)) {
  console.log(`Received: ${prime}`);
}
```

```none
Generated: 2
Received: 2
Generated: 3
Received: 3
Generated: 5
Received: 5
Generated: 7
Received: 7
Generated: 11
Received: 11
```

# Breaking it up

The next piece we need is something that will control when this function should yield back to the main thread. To let all of the JS task queues clear, we have to put our execution onto the bottom of the macro-task queue. We can do that with a setTimeout of a delay of 0: our callback will be called only once everything that was already on the macro-task queue is cleared. We'll use a callback to push the data out to what needs it:

```typescript
function pullFromGenerator<T>(
  generator: Generator<T>,
  onValue: (value: T)
): void {
  const getNext = () => {
        var nextObj = generator.next();
        if(!nextObj.done){
            onValue(nextObj.value);
            setTimeout(getNext, 0);
        }
    };
    getNext();
}
```

One drawback to yielding on every value is that we end up yielding much more often than we need to! We only need to yield every 100ms or so, any more is wasting time getting back to the generator function. We can keep track of when we last yielded, and only yield when it's been long enough:

```typescript
function pullFromGenerator<T>(
  generator: Generator<T>,
  onValue: (value: T),
  yieldFrequency: number
): void {
  let lastYieldMillisecond = Date.now();
  const getNext = () => {
    var nextObj = generator.next();
    while (!nextObj.done
      && lastYieldMillisecond + yieldFrequency > Date.now()
    ) {
      onValue(nextObj.value);
      nextObj = generator.next();
    }
    if(!nextObj.done){
      onValue(nextObj.value);
      lastYieldMillisecond = Date.now();
      setTimeout(getNext, 0);
    }
  };
  getNext();
}
```

This will give us a robust way to execute an expensive generator without blocking any of the smaller ui updates required to keep the page responding.

# Converting to an Observable

But what if it's running _really_ long, and we want to be able to stop the flow of new primes? When creating a new rxjs Observable we have access to information about what's happening downstream, such as if the subscriber is no longer interested in new values. We can convert our callback-oriented method to return an Observable to take advantage of this:

```typescript
import { Observable } from 'rxjs';

function pullFromGenerator<T>(
  generator: Generator<T>,
  yieldFrequency: number
): Observable<T> {
  return new Observable((subscriber) => {
    let lastYieldMillisecond = Date.now();
    const getNext = () => {
      var nextObj = generator.next();
      while (
        !nextObj.done &&
        lastYieldMillisecond + yieldFrequency > Date.now() &&
        !subscriber.closed
      ) {
        subscriber.next(nextObj.value);
        nextObj = generator.next();
      }
      if (subscriber.closed) {
        return;
      }
      if (!nextObj.done) {
        subscriber.next(nextObj.value);
        lastYieldMillisecond = Date.now();
        setTimeout(getNext, 0);
      } else {
        subscriber.complete();
      }
    };
    getNext();
  });
}
```

# Testing it out

Let's make sure this all still works together:

```typescript
const primeGenerator = pullFromGenerator(getPrimes(3), 100);
console.log('Created generator');
primeGenerator.subscribe((prime) => console.log(`Received: ${prime}`));
console.log('Created Subscription');
```

```none
Created generator
Generated: 2
Received: 2
Generated: 3
Received: 3
Generated: 5
Received: 5
Created Subscription
```

If we change the delay on our function we can see the execution yield back to the main thread. The execution continues in our script after the first value comes through, and then the generator picks back up after yielding.

```typescript
const primeGenerator = pullFromGenerator(getPrimes(3), 0);
console.log('Created generator');
primeGenerator.subscribe((prime) => console.log(`Received: ${prime}`));
console.log('Created Subscription');
```

```none
Created generator
Generated: 2
Received: 2
Created Subscription
Generated: 3
Received: 3
Generated: 5
Received: 5
```

Another handy side effect of converting to use an Observable is that we no longer need to specify how many primes we want, we can instead only pull a specific number using rxjs operators. Or if we kept track of our subscription, we could decide to cancel it later on or switch it out for a different generator without forcing both of them to run at the same time.

```typescript
function* getPrimes(): Generator<number> {
  let lastPrime = 1;
  while (true) {
    lastPrime = nextPrime(lastPrime);
    console.log(`Generated: ${lastPrime}`);
    yield lastPrime;
  }
}
```

```typescript
import { take } from 'rxjs/operators';
const primeGenerator = pullFromGenerator(getPrimes(), 100);
console.log('Created generator');
primeGenerator
  .pipe(take(3))
  .subscribe((prime) => console.log(`Received: ${prime}`));
console.log('Created Subscription');
```

```none
Created generator
Generated: 2
Received: 2
Generated: 3
Received: 3
Generated: 5
Received: 5
Generated: 7
Created Subscription
```

It generates only one extra prime, but it never gets to our listener. From here the observable can be treated just like any other stream of events! With the `pullFromGenerator` method, any long-running function that can be turned into a generator can be safely run on the main thread without dealing with a web-worker!

# Limitations

This workaround likely will not work well with any more than just one long-running generator: they would compete with each other for time, and as they piled up the ui thread would get slower and slower. This is built to emulate what the [Web Worker api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) was designed to do. If you need more than just one concurrent worker, or if the work is not cleanly sliced into a generator function, then the web worker api would much better serve your purpose.

# Example Usage

I used this approach when solving nonograms in my [nonogram designer](https://dsmiller95.github.io/nonogram-printer/?width=16&height=16&raw=AAAgHAOHYwDP45zRd%2BYgPG4jBcoOAxHX45DYeA4BAAA). It is used to update the UI with information about how many different solutions there are for the given design. The worst case for a given n\*n square nonogram is `n!` different designs, meaning that the default 16\*16 size could have up to 20 trillion different solutions! Deferring this execution allows the user to change the layout of the nonogram until the execution time goes down to something possible to compute.

## Implementation

To suit the needs of the app, this implementation of the function only emits the very last item in the list. The other items aren't always needed, so to help save time they are not returned. It also adds a second interruptPeriod parameter, which sets the length of time passed into the timeout to allow for a longer period of free time on the UI thread.

```typescript
function getLastItemWithInterrupt<T>(
  iterator: Iterator<any, T, never>,
  interruptInterval: number,
  interruptPeriod: number
): Observable<T> {
  let current: IteratorResult<any, T>;
  if (interruptInterval <= interruptPeriod) {
    throw 'interruptPeriod must be less than the interval, otherwise no work gets done';
  }
  return new Observable((subscriber) => {
    let lastInterrupt = Date.now();
    const computeFunction = () => {
      while (
        lastInterrupt + interruptInterval > Date.now() &&
        !(current = iterator.next()).done
      ) {}
      if (subscriber.closed) {
        return;
      }
      if (current.done) {
        subscriber.next(current.value);
        subscriber.complete();
      } else {
        lastInterrupt = new Date().getTime();
        setTimeout(computeFunction, interruptPeriod);
      }
    };
    computeFunction();
  });
}
```

The function is used to switch out different solution computations when new parameters come through. The `keys` observable is updated every time the nonogram design is changed, and the `switchMap` operator will close the old subscription when a new key comes through. With this setup, the solveNonogram function is _always_ working on solving the most recent version of the nonogram design, and it will immediately cancel attempts to solve old versions.

```typescript
function getGridSolutionSummaryObservable(
  keys: Observable<NonogramKey>
): Observable<SolvedNonogramWithDifficulty> {
  return keys.pipe(
    switchMap((key) => {
      return getLastItemWithInterrupt(solveNonogram(key), 30, 1);
    })
  );
}
```
