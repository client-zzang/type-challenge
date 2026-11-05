/*
  27932 - MergeAll
  -------
  by scarf (@scarf005) #medium #object #array #union

  ### Question

  Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

  For example:

  ```ts
  type Foo = { a: 1; b: 2 }
  type Bar = { a: 2 }
  type Baz = { c: 3 }

  type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
  ```

  > View on GitHub: https://tsch.js.org/27932
*/

// 🚀 시작: 2026-11-06 00:21
// ✅ 종료: 2026-11-06 10:07
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. intersection type을 하나로 묶는 Merge 유틸 타입

        type Merge<T> = {
          [P in keyof T]: T[P];
        };

        type MergeAll<XS extends object[], R extends {} = {}> = XS extends [
          infer Head,
          ...infer Tail extends object[],
        ]
          ? MergeAll<Tail, R & Head>
          : Merge<R>;

      // ❌ Equal<MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>, { a: 1 | 2; b: 2; c: 3 }>
      // 위 케이스 결과가 never로 케이스 실패

      🔵 1-2. 하나의 Mapped Type으로 객체 합치기

        type Merge<T, K> = {
          [P in keyof T | keyof K]:
            | (P extends keyof T ? T[P] : never)
            | (P extends keyof K ? K[P] : never);
        };

        type MergeAll<XS extends object[], R extends {} = {}> = XS extends [
          infer Head,
          ...infer Tail extends object[],
        ]
          ? MergeAll<Tail, Merge<R, Head>>
          : R;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type Merge<T, K> = {
  [P in keyof T | keyof K]:
    | (P extends keyof T ? T[P] : never)
    | (P extends keyof K ? K[P] : never);
};

type MergeAll<XS extends object[], R extends {} = {}> = XS extends [
  infer Head,
  ...infer Tail extends object[],
]
  ? MergeAll<Tail, Merge<R, Head>>
  : R;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<
    Equal<
      MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
      { a: 1 | 2; b: 2; c: 3 }
    >
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27932/answer
  > View solutions: https://tsch.js.org/27932/solutions
  > More Challenges: https://tsch.js.org
*/
