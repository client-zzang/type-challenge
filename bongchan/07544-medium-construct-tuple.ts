/*
  7544 - Construct Tuple
  -------
  by Lo (@LoTwT) #medium #tuple

  ### Question

  Construct a tuple with a given length.

  For example

  ```ts
  type result = ConstructTuple<2> // expect to be [unknown, unknown]
  ```

  > View on GitHub: https://tsch.js.org/7544
*/

// 🚀 시작: 2026-09-06 10:29
// ✅ 종료: 2026-09-06 10:31
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 튜플의 length 프로퍼티를 활용하자

      type ConstructTuple<
        L extends number,
        R extends unknown[] = [],
      > = R['length'] extends L ? R : ConstructTuple<L, [...R, unknown]>;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type ConstructTuple<
  L extends number,
  R extends unknown[] = [],
> = R['length'] extends L ? R : ConstructTuple<L, [...R, unknown]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7544/answer
  > View solutions: https://tsch.js.org/7544/solutions
  > More Challenges: https://tsch.js.org
*/
