/*
  5153 - IndexOf
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```

  > View on GitHub: https://tsch.js.org/5153
*/

// 🚀 시작: 2026-11-01 17:56
// ✅ 종료: 2026-11-01 18:00
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 현재 인덱스를 담당하는 제네릭 추가

        type IsEqual<X, Y> =
          (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
            ? true
            : false;

        type IndexOf<T, U, I extends number[] = []> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? IsEqual<Head, U> extends true
            ? I['length']
            : IndexOf<Tail, U, [...I, 1]>
          : -1;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

type IndexOf<T, U, I extends number[] = []> = T extends [
  infer Head,
  ...infer Tail,
]
  ? IsEqual<Head, U> extends true
    ? I['length']
    : IndexOf<Tail, U, [...I, 1]>
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5153/answer
  > View solutions: https://tsch.js.org/5153/solutions
  > More Challenges: https://tsch.js.org
*/
