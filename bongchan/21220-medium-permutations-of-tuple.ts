/*
  21220 - Permutations of Tuple
  -------
  by null (@gaac510) #medium #union #tuple #conditional type #recursion

  ### Question

  Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.

  For example:

  ```ts
  PermutationsOfTuple<[1, number, unknown]>
  // Should return:
  // | [1, number, unknown]
  // | [1, unknown, number]
  // | [number, 1, unknown]
  // | [unknown, 1, number]
  // | [number, unknown, 1]
  // | [unknown, number ,1]
  ```

  > View on GitHub: https://tsch.js.org/21220
*/

// 🚀 시작: 2026-10-18 18:36
// ✅ 종료: 2026-10-18 19:07
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 제네릭 T의 복사본 K를 만들어서 분배시킬 것과 원본 분리

        type PermutationsOfTuple<T extends unknown[], K extends unknown[] = T> = any;

      🔵 1-2. 배열에서 같은 요소 제거하는 타입 Filter

        type IsEqual<X, Y> =
          (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
            ? true
            : false;

        type Filter<
          T extends unknown[],
          K extends unknown,
        > = T extends [infer Head, ...infer Tail]
          ? IsEqual<Head, K> extends true
            ? [...Filter<Tail, K>]
            : [ Head, ...Filter<Tail, K>]
          : [];

      🔵 1-3. AI에게 힌트 받아서 푼 풀이

        type IsEqual<X, Y> =
          (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
            ? true
            : false;

        type Filter<T extends unknown[], K extends unknown> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? IsEqual<Head, K> extends true
            ? [...Filter<Tail, K>]
            : [Head, ...Filter<Tail, K>]
          : [];

        type PermutationsOfTuple<
          T extends unknown[],
          K extends unknown[] = T,
        > = T extends []
          ? []
          : K extends [infer Head, ...infer Tail]
            ?
                | [Head, ...PermutationsOfTuple<Filter<T, Head>>]
                | PermutationsOfTuple<T, Filter<Tail, Head>>
            : never;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

type Filter<T extends unknown[], K extends unknown> = T extends [
  infer Head,
  ...infer Tail,
]
  ? IsEqual<Head, K> extends true
    ? [...Filter<Tail, K>]
    : [Head, ...Filter<Tail, K>]
  : [];

type PermutationsOfTuple<
  T extends unknown[],
  K extends unknown[] = T,
> = T extends []
  ? []
  : K extends [infer Head, ...infer Tail]
    ?
        | [Head, ...PermutationsOfTuple<Filter<T, Head>>]
        | PermutationsOfTuple<T, Filter<Tail, Head>>
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectFalse } from '@type-challenges/utils';

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<
    Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[any, unknown, never]>,
      | [any, unknown, never]
      | [unknown, any, never]
      | [unknown, never, any]
      | [any, never, unknown]
      | [never, any, unknown]
      | [never, unknown, any]
    >
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[1, number, unknown]>,
      | [1, number, unknown]
      | [1, unknown, number]
      | [number, 1, unknown]
      | [unknown, 1, number]
      | [number, unknown, 1]
      | [unknown, number, 1]
    >
  >,
  ExpectFalse<Equal<PermutationsOfTuple<[1, number, unknown]>, [unknown]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21220/answer
  > View solutions: https://tsch.js.org/21220/solutions
  > More Challenges: https://tsch.js.org
*/
