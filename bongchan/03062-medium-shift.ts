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

// 🚀 시작: 2026-07-14 22:25
// ✅ 종료: 2026-07-14 22:27
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭을 unknown 배열로 타입 좁히기
      - 첫 번째 케이스에서 error를 발생시키기 위함

        type Shift<T extends Array<unknown>> = any;

    2. infer 활용
      - 첫 번째 요소를 unknown 으로 두고 나머지를 ...infer R 로 나누기

        type Shift<T extends Array<unknown>> = T extends [unknown, ...infer R] ? R : T;

  😆 배움
    -
*/

/* _____________ Your Code Here _____________ */

type Shift<T extends Array<unknown>> = T extends [unknown, ...infer R] ? R : T;

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
