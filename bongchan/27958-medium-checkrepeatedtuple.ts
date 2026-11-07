/*
  27958 - CheckRepeatedTuple
  -------
  by bowen (@jiaowoxiaobala) #medium

  ### Question

  Implement type `CheckRepeatedChars<T>` which will return whether type `T` contains duplicated member

  For example:

  ```ts
  type CheckRepeatedTuple<[1, 2, 3]>   // false
  type CheckRepeatedTuple<[1, 2, 1]>   // true
  ```

  > View on GitHub: https://tsch.js.org/27958
*/

// 🚀 시작: 2026-11-07 13:03
// ✅ 종료: 2026-11-07 13:21
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 배열을 앞 요소, 나머지 요소로 나누고 나머지 요소에서 앞 요소를 찾기

        type MyEqual<X, Y> =
          (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
            ? true
            : false;

        type Includes<X extends unknown[], Y> = X extends [infer Head, ...infer Tail]
          ? MyEqual<Head, Y> extends true
            ? true
            : Includes<Tail, Y>
          : false;

        type CheckRepeatedTuple<T extends unknown[]> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? Includes<Tail, Head> extends true
            ? true
            : false
          : false;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type MyEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

type Includes<X extends unknown[], Y> = X extends [infer Head, ...infer Tail]
  ? MyEqual<Head, Y> extends true
    ? true
    : Includes<Tail, Y>
  : false;

type CheckRepeatedTuple<T extends unknown[]> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Includes<Tail, Head> extends true
    ? true
    : false
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
  Expect<
    Equal<
      CheckRepeatedTuple<
        [number, 1, string, '1', boolean, true, false, unknown, any]
      >,
      false
    >
  >,
  Expect<Equal<CheckRepeatedTuple<[never, any, never]>, true>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27958/answer
  > View solutions: https://tsch.js.org/27958/solutions
  > More Challenges: https://tsch.js.org
*/
