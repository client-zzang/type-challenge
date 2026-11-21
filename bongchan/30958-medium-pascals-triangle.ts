/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

// 🚀 시작: 2026-11-21 18:47
// ✅ 종료: 2026-11-21 23:45
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    🔴 접근 1. 🤖 (AI 힌트 받음)
      🔵 1-1. Add 유틸 타입 (튜플의 length 프로퍼티 활용)

        type GetTuple<T extends number, R extends 1[] = []> = R['length'] extends T
          ? R
          : GetTuple<T, [...R, 1]>;

        type Add<A extends number, B extends number> = [
          ...GetTuple<A>,
          ...GetTuple<B>,
        ]['length'];

      🔵 1-2. NextRow 유틸 타입 (한 행으로 다음 행을 만듦)

        type NextRow<Row extends number[], Prev extends number = 0> = Row extends [
          infer F extends number,
          ...infer R extends number[],
        ]
          ? [Add<Prev, F>, ...NextRow<R, F>]
          : [1];

      🔵 1-3. 마지막 행을 꺼내어 다음 행 만들기

        type Pascal<
          N extends number,
          Acc extends number[][] = [[1]],
        > = Acc['length'] extends N
          ? Acc
          : Acc extends [...any, infer Last extends number[]]
            ? Pascal<N, [...Acc, NextRow<Last>]>
            : never;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type GetTuple<T extends number, R extends 1[] = []> = R['length'] extends T
  ? R
  : GetTuple<T, [...R, 1]>;

type Add<A extends number, B extends number> = [
  ...GetTuple<A>,
  ...GetTuple<B>,
]['length'];

type NextRow<Row extends number[], Prev extends number = 0> = Row extends [
  infer F extends number,
  ...infer R extends number[],
]
  ? [Add<Prev, F>, ...NextRow<R, F>]
  : [1];

type Pascal<
  N extends number,
  Acc extends number[][] = [[1]],
> = Acc['length'] extends N
  ? Acc
  : Acc extends [...any, infer Last extends number[]]
    ? Pascal<N, [...Acc, NextRow<Last>]>
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pascal<1>, [[1]]>>,
  Expect<Equal<Pascal<3>, [[1], [1, 1], [1, 2, 1]]>>,
  Expect<
    Equal<Pascal<5>, [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]>
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/
