/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > View on GitHub: https://tsch.js.org/4499
*/

// 🚀 시작: 2026-08-15 12:41
// ✅ 종료: 2026-08-15 13:18
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 튜플의 첫 번째 요소를 꺼내어 배열의 길이가 N이 될 때까지 반복하여 담기
      
      type Chunk<
        T extends unknown[],
        N extends number,
        Group extends unknown[] = [],
        Return extends unknown[] = [],
      > = T extends [infer F, ...infer R]
        ? Group['length'] extends N
          ? Chunk<R, N, [F], [...Return, Group]>
          : Chunk<R, N, [...Group, F], Return>
        : Group extends []
          ? Return
          : [...Return, Group];

  😆 배움
    - 다른 풀이

      type Chunk<
        T extends any[],
        N extends number,
        Swap extends any[] = [],
      > = Swap['length'] extends N
        ? [Swap, ...Chunk<T, N>]
        : T extends [infer K, ...infer L]
          ? Chunk<L, N, [...Swap, K]>
          : Swap extends []
            ? Swap
            : [Swap];

*/

/* _____________ Your Code Here _____________ */

type Chunk<
  T extends unknown[],
  N extends number,
  Group extends unknown[] = [],
  Return extends unknown[] = [],
> = T extends [infer F, ...infer R]
  ? Group['length'] extends N
    ? Chunk<R, N, [F], [...Return, Group]>
    : Chunk<R, N, [...Group, F], Return>
  : Group extends []
    ? Return
    : [...Return, Group];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4499/answer
  > View solutions: https://tsch.js.org/4499/solutions
  > More Challenges: https://tsch.js.org
*/
