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

// 🚀 시작: 2026-10-20 21:42
// ✅ 종료: 2026-10-20 21:56
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 대상 제네릭 T, 묶을 개수 제네릭 L, 그룹이 되는 제네릭 G, 반환값 R

        type Chunk<
          T extends unknown[],
          L extends number,
          G extends unknown[] = [],
          R extends unknown[] = [],
        > = any;

      🔵 1-2. 제네릭 T를 infer로 앞요소와 나머지 요소로 분리. 해당 타입으로 좁혀지지 않는다면 R 반환

        type Chunk<
          T extends unknown[],
          L extends number,
          G extends unknown[] = [],
          R extends unknown[] = [],
        > = T extends [infer Head, ...infer Tail] ? 1 : R;

      🔵 1-3. G의 length가 L과 같다면 R에 넣어주고 G 초기화

        type Chunk<
          T extends unknown[],
          L extends number,
          G extends unknown[] = [],
          R extends unknown[] = [],
        > = T extends [infer Head, ...infer Tail]
          ? G['length'] extends L
            ? Chunk<Tail, L, [Head], [...R, G]>
            : Chunk<Tail, L, [...G, Head], R>
          : R;

      🔵 1-4. R을 반환할 때 G가 비어있지 않다면 G를 포함해서 반환

        type Chunk<
          T extends unknown[],
          L extends number,
          G extends unknown[] = [],
          R extends unknown[] = [],
        > = T extends [infer Head, ...infer Tail]
          ? G['length'] extends L
            ? Chunk<Tail, L, [Head], [...R, G]>
            : Chunk<Tail, L, [...G, Head], R>
          : G['length'] extends 0
            ? R
            : [...R, G];

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Chunk<
  T extends unknown[],
  L extends number,
  G extends unknown[] = [],
  R extends unknown[] = [],
> = T extends [infer Head, ...infer Tail]
  ? G['length'] extends L
    ? Chunk<Tail, L, [Head], [...R, G]>
    : Chunk<Tail, L, [...G, Head], R>
  : G['length'] extends 0
    ? R
    : [...R, G];

type A = Chunk<[1, 2, 3], 1>;

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
