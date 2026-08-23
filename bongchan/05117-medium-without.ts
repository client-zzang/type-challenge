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

// 🚀 시작: 2026-08-23 14:48
// ✅ 종료: 2026-08-23 15:04
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 U가 number 일 때
      
      type Without<T, U> = T extends [infer F, ...infer R]
        ? U extends number
          ? F extends U
            ? [...Without<R, U>]
            : [F, ...Without<R, U>]
          : false // ➡️ 배열 extends 조건 검사 필요
        : [];

    2. 제네릭 U가 Array 일 때

      type Without<T, U> = T extends [infer F, ...infer R]
        ? U extends number
          ? F extends U
            ? [...Without<R, U>]
            : [F, ...Without<R, U>]
          : U extends unknown[]
            ? true // ➡️ F가 U에 포함되면 제거 조건 검사 필요
            : []
        : [];

    3. IndexOf type을 만들어서 배열에 포함되는 요소인지 검사

      type IndexOf<
        Arr extends unknown[],
        Element,
        Index extends unknown[] = [],
      > = Arr extends [infer F, ...infer R]
        ? Element extends F
          ? Index['length']
          : IndexOf<R, Element, [...Index, 1]>
        : -1;

      type Without<T, U> = T extends [infer F, ...infer R]
        ? U extends number
          ? F extends U
            ? [...Without<R, U>]
            : [F, ...Without<R, U>]
          : U extends unknown[]
            ? IndexOf<U, F> extends -1
              ? [F, ...Without<R, U>]
              : [...Without<R, U>]
            : []
        : [];

  😆 배움
    1. 유니온으로 변경하여 타입 검사

      type ToUnion<T> = T extends any[] ? T[number] : T;
      type Without<T, U> = T extends [infer R, ...infer F]
        ? R extends ToUnion<U>
          ? Without<F, U>
          : [R, ...Without<F, U>]
        : T;

*/

/* _____________ Your Code Here _____________ */

type IndexOf<
  Arr extends unknown[],
  Element,
  Index extends unknown[] = [],
> = Arr extends [infer F, ...infer R]
  ? Element extends F
    ? Index['length']
    : IndexOf<R, Element, [...Index, 1]>
  : -1;

type Without<T, U> = T extends [infer F, ...infer R]
  ? U extends number
    ? F extends U
      ? [...Without<R, U>]
      : [F, ...Without<R, U>]
    : U extends unknown[]
      ? IndexOf<U, F> extends -1
        ? [F, ...Without<R, U>]
        : [...Without<R, U>]
      : []
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
