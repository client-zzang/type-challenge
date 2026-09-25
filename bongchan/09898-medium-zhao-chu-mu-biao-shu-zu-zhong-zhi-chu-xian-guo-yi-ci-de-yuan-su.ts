/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，output: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

// 🚀 시작: 2026-09-25 21:28
// ✅ 종료: 2026-09-25 22:10
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 앞에서부터 요소를 꺼내어서 중복요소 검사

      1) FindEles 타입에서 제네릭 T를 infer로 첫 번째 요소와 나머지 요소 분리

        type FindEles<T extends any[]> = T extends [infer First, ...infer Rest]
          ? true
          : false;

      2) isUniqueItem 타입을 만들어서 첫 번째 요소가 유니크 요소인지 판별

        type IsUniqueItem<T extends any[], I> = T extends [infer F, ...infer R]
          ? I extends F
            ? F extends I
              ? false
              : IsUniqueItem<R, I>
            : true
          : true;

      3) 중복 요소를 담을 제네릭 추가. 중복 요소는 early return으로 순회 X
      

  😆 배움
    - 다른 풀이

      type IncludesInUnion<U, T> = [U] extends [never]
        ? false
        : U extends T
          ? true
          : false;

      type FindEles<
        T extends unknown[],
        Duplicates extends unknown[] = [],
      > = T extends [infer Head, ...infer Tail]
        ? IncludesInUnion<Duplicates[number] | Tail[number], Head> extends false
          ? [Head, ...FindEles<Tail, Duplicates>]
          : FindEles<Tail, [...Duplicates, Head]>
        : T;

*/

/* _____________ Your Code Here _____________ */

type IncludesInUnion<U, T> = [U] extends [never]
  ? false
  : U extends T
    ? true
    : false;

type FindEles<
  T extends unknown[],
  Duplicates extends unknown[] = [],
> = T extends [infer Head, ...infer Tail]
  ? IncludesInUnion<Duplicates[number] | Tail[number], Head> extends false
    ? [Head, ...FindEles<Tail, Duplicates>]
    : FindEles<Tail, [...Duplicates, Head]>
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
