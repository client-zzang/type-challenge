/*
  3062 - Shift
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.shift```

  For example

  ```typescript
  type Result = Shift<[3, 2, 1]> // [2, 1]
  ```

  > View on GitHub: https://tsch.js.org/3062
*/

// 🚀 시작: 2026-09-20 12:23
// ✅ 종료: 2026-09-20 12:26
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 T를 배열로 타입 좁히기

      type Shift<T extends unknown[]> = any;

    2. spread infer를 활용한 Shift 구현

      type Shift<T extends unknown[]> = T extends [unknown, ...infer Rest]
        ? Rest
        : [];

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Shift<T extends unknown[]> = T extends [unknown, ...infer Rest]
  ? Rest
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3062/answer
  > View solutions: https://tsch.js.org/3062/solutions
  > More Challenges: https://tsch.js.org
*/
