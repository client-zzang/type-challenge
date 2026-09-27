/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/

// 🚀 시작: 2026-09-27 23:12
// ✅ 종료: 2026-09-27 23:44
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 평탄화를 수행하는 Flatten 타입

      type Flatten<T extends unknown[]> = T extends [infer First, ...infer Rest]
        ? First extends unknown[]
          ? [...First, ...Flatten<Rest>]
          : [First, ...Flatten<Rest>]
        : [];

    2. 중첩배열이 없는지 확인하는 타입 활용
      - 제네릭 D에 19260817와 같이 재귀의 범위가 1000을 넘는 케이스 때문에 early return

      type IsFlatten<T extends unknown[]> = T extends [infer First, ...infer Rest]
        ? First extends unknown[]
          ? false
          : IsFlatten<Rest>
        : true;

    3. 최종

      type FlattenDepth<
        T extends unknown[],
        D extends number = 1,
        C extends unknown[] = [],
      > =
        IsFlatten<T> extends true
          ? T
          : C['length'] extends D
            ? T
            : FlattenDepth<Flatten<T>, D, [...C, 1]>;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type IsFlatten<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? false
    : IsFlatten<Rest>
  : true;

type Flatten<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? [...First, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : [];

type FlattenDepth<
  T extends unknown[],
  D extends number = 1,
  C extends unknown[] = [],
> =
  IsFlatten<T> extends true
    ? T
    : C['length'] extends D
      ? T
      : FlattenDepth<Flatten<T>, D, [...C, 1]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
