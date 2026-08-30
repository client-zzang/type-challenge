/*
  5360 - Unique
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Lodash.uniq, Unique<T> takes an Array T, returns the Array T without repeated values.

  ```ts
  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
  ```

  > View on GitHub: https://tsch.js.org/5360
*/

// 🚀 시작: 2026-08-31 00:22
// ✅ 종료: 2026-08-31 00:57
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 배열을 유니온 타입으로 변환하여 타입 검사

      type ToUnion<T extends unknown[]> = T[number];

      type Unique<T extends unknown[], Return extends unknown[] = []> = T extends [
        infer F,
        ...infer R,
      ]
        ? Equal<F, ToUnion<Return>> extends true
          ? Unique<R, Return>
          : Unique<R, [...Return, F]>
        : Return;

      - Union 타입을 분배해서 하나씩 Equal 비교를 해야할 것 같음

  😆 배움
    - 정답

      type Unique<T, U = never> =
        T extends [infer F, ...infer R]
          ? true extends (U extends U ? Equal<U, [F]> : never)
            ? Unique<R, U>
            : [F, ...Unique<R, U | [F]>]
          : []

*/

/* _____________ Your Code Here _____________ */

type Unique<T, U = never> = T extends [infer F, ...infer R]
  ? true extends (U extends U ? Equal<U, [F]> : never)
    ? Unique<R, U>
    : [F, ...Unique<R, U | [F]>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<
    Equal<
      Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>,
      [string, number, 1, 'a', 2, 'b']
    >
  >,
  Expect<
    Equal<
      Unique<[unknown, unknown, any, any, never, never]>,
      [unknown, any, never]
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5360/answer
  > View solutions: https://tsch.js.org/5360/solutions
  > More Challenges: https://tsch.js.org
*/
