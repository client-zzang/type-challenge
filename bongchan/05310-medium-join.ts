/*
  5310 - Join
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.

  ```ts
  type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
  type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
  type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
  type Res3 = Join<["o"], "u">; // expected to be 'o'
  ```

  > View on GitHub: https://tsch.js.org/5310
*/

// 🚀 시작: 2026-08-30 00:15
// ✅ 종료: 2026-08-30 00:26
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 재귀를 돌면서 첫 번째 요소를 꺼내서 제네릭 U와 조합하기

      type Join<T extends unknown[], U extends number | string = ','> = T extends [
        infer F extends string,
        ...infer R extends string[],
      ]
        ? `${F}${R extends [] ? '' : U}${Join<R, U>}`
        : '';

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Join<T extends unknown[], U extends number | string = ','> = T extends [
  infer F extends string,
  ...infer R extends string[],
]
  ? `${F}${R extends [] ? '' : U}${Join<R, U>}`
  : '';

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
  Expect<Equal<Join<['1', '1', '1']>, '1,1,1'>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5310/answer
  > View solutions: https://tsch.js.org/5310/solutions
  > More Challenges: https://tsch.js.org
*/
