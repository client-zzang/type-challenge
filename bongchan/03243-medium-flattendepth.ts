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

// 🚀 시작: 2026-07-25 22:39
// ✅ 종료: 2026-07-25 23:02
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 1 depth 평탄화 하는 Flatten 타입 구현
      - 실제 평탄화를 진행하는 함수(타입) 역할

        type Flatten<T extends Array<unknown>> = T extends [infer F, ...infer Rest]
          ? F extends Array<unknown>
            ? [...F, ...Flatten<Rest>]
            : [F, ...Flatten<Rest>]
          : [];

    2. 두 번째 제네릭 L 에 들어온 depth 만큼 평탄화를 하기 위해서 평탄화 단계를 확인하는 옵셔널 제네릭 F 추가

      type FlattenDepth<
        T extends Array<unknown>,
        L extends number = 1,
        F extends Array<unknown> = [],
      > = F['length'] extends L ? T : FlattenDepth<Flatten<T>, L, [...F, true]>;

    3. 이미 배열의 모든 요소가 평탄화가 되었는지 확인하는 IsAllFlatten 함수(타입) 구현
      - 이미 배열의 모든 요소가 평탄화 되었다면 굳이 두 번째 제네릭만큼 계속 평탄화를 할 이유가 없음

        type IsAllFlatten<T extends Array<unknown>> = T extends [infer F, ...infer Rest]
          ? F extends Array<unknown>
            ? false
            : IsAllFlatten<Rest>
          : true;

    4. 최종

      type FlattenDepth<
        T extends Array<unknown>,
        L extends number = 1,
        F extends Array<unknown> = [],
      > =
        IsAllFlatten<T> extends true
          ? T
          : F['length'] extends L
            ? T
            : FlattenDepth<Flatten<T>, L, [...F, true]>;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type IsAllFlatten<T extends Array<unknown>> = T extends [infer F, ...infer Rest]
  ? F extends Array<unknown>
    ? false
    : IsAllFlatten<Rest>
  : true;

type Flatten<T extends Array<unknown>> = T extends [infer F, ...infer Rest]
  ? F extends Array<unknown>
    ? [...F, ...Flatten<Rest>]
    : [F, ...Flatten<Rest>]
  : [];

type FlattenDepth<
  T extends Array<unknown>,
  L extends number = 1,
  F extends Array<unknown> = [],
> =
  IsAllFlatten<T> extends true
    ? T
    : F['length'] extends L
      ? T
      : FlattenDepth<Flatten<T>, L, [...F, true]>;

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
