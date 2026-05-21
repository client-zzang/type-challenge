/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

declare function PromiseAll<V extends readonly any[]>(
  values: V
): Promise<{readonly [K in keyof V]: V[K] extends PromiseLike<infer U> ? U : V[K]
}>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([1, 2, Promise.resolve('3')])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/

/*
배운 점
- Promise.resolve(3) 타입은 Promise<number>

infer가 왜 필요한가?
- 내부 타입에 접근하기 위함
- ex. Promise<???> -> Promise<infer R> (R은 Promise의 내부 타입이라는 의미로 사용)
- Promise.resolve(3) => 3 혹은 number 타입을 꺼낼 수 있다

접근
1. 내부가 Promise면 안쪽을 꺼내고 아니면 그대로 둬야 한다
declare function PromiseAll<V>(values: V): V extends PromiseLike<infer U> ? Promise<U> : V
- V가 무엇인지 안나옴 -> 오답
- V를 하나씩 꺼내야 한다

2. 하나씩 꺼내기
declare function PromiseAll<V extends readonly any[]>(values: V): {[key in keyof V]: V[key] extends PromiseLike<infer U> ? Promise<U> : V}

- 모르겠다!

*/
