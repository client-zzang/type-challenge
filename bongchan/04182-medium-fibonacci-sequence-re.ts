/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

// 🚀 시작: 2026-10-09 22:24
// ✅ 종료: 2026-10-09 22:48
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 튜플 활용
      - 튜플의 length 속성으로 길이(값) 반환

      type Fibonacci<
        T extends number,
        CurrentIndex extends number[] = [1],
        Pre extends number[] = [],
        Current extends number[] = [1],
      > = CurrentIndex['length'] extends T
        ? Current['length']
        : Fibonacci<T, [...CurrentIndex, 1], Current, [...Pre, ...Current]>;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Fibonacci<
  T extends number,
  CurrentIndex extends number[] = [1],
  Pre extends number[] = [],
  Current extends number[] = [1],
> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Pre, ...Current]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
