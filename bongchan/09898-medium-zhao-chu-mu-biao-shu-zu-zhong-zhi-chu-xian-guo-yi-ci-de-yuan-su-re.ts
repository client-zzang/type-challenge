/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，output: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

// 🚀 시작: 2026-09-25 23:28
// ✅ 종료: 2026-09-25 23:58
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. infer 를 활용하여 앞에서부터 요소를 하나씩 꺼내어 중복 검사
      
      type FindEles<T extends any[]> = T extends [infer First, ...infer Rest]
        ? true
        : false;
    
    2. 중복 요소를 담는 제네릭 Duplicates 추가

      type FindEles<T extends any[], Duplicates = never> = T extends [
        infer First,
        ...infer Rest,
      ]
        ? true
        : false;

    3. 배열에서 유니크한 요소인지 확인하는 IsUniqueItem 타입

      type IsUniqueItem<Array extends unknown[], Item> = Array extends [
        infer First,
        ...infer Rest,
      ]
        ? [Item] extends [First]
          ? [First] extends [Item]
            ? false
            : IsUniqueItem<Rest, Item>
          : IsUniqueItem<Rest, Item>
        : true;

      type FindEles<
        T extends unknown[],
        Duplicates extends unknown[] = [],
      > = T extends [infer First, ...infer Rest]
        ? IsUniqueItem<Rest, First> extends true
          ? IsUniqueItem<Duplicates, First> extends true
            ? [First, ...FindEles<Rest, Duplicates>]
            : FindEles<Rest, [...Duplicates, First]>
          : FindEles<Rest, [...Duplicates, First]>
        : T;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type IsUniqueItem<Array extends unknown[], Item> = Array extends [
  infer First,
  ...infer Rest,
]
  ? [Item] extends [First]
    ? [First] extends [Item]
      ? false
      : IsUniqueItem<Rest, Item>
    : IsUniqueItem<Rest, Item>
  : true;

type FindEles<
  T extends unknown[],
  Duplicates extends unknown[] = [],
> = T extends [infer First, ...infer Rest]
  ? IsUniqueItem<Rest, First> extends true
    ? IsUniqueItem<Duplicates, First> extends true
      ? [First, ...FindEles<Rest, Duplicates>]
      : FindEles<Rest, [...Duplicates, First]>
    : FindEles<Rest, [...Duplicates, First]>
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/
