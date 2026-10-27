/*
  5117 - Without
  -------
  by Pineapple (@Pineapple0919) #medium #union #array

  ### Question

  Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```

  > View on GitHub: https://tsch.js.org/5117
*/

// 🚀 시작: 2026-10-27 20:32
// ✅ 종료: 2026-10-27 20:35
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.

      🔵 1-1. 튜플[number]을 활용하여 제네릭 U를 유니온으로 만들기

        type Without<T, U, K = U extends unknown[] ? U[number] : U> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? Head extends K
            ? Without<Tail, U>
            : [Head, ...Without<Tail, U>]
          : [];

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type Without<T, U, K = U extends unknown[] ? U[number] : U> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends K
    ? Without<Tail, U>
    : [Head, ...Without<Tail, U>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5117/answer
  > View solutions: https://tsch.js.org/5117/solutions
  > More Challenges: https://tsch.js.org
*/
