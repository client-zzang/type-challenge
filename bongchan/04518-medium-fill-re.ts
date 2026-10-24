/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > View on GitHub: https://tsch.js.org/4518
*/

// 🚀 시작: 2026-10-24 14:00
// ✅ 종료: 2026-10-24 14:26
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.

      🔵 1-1. 빈배열의 경우 조기 반환

      type Fill<
        T extends unknown[],
        N,
        Start extends number = 0,
        End extends number = T['length'],
      > = T extends [] ? [] : false;

      🔵 1-2. 현재 인덱스를 파악하는 Current 제네릭 추가, End 값이 Current와 같다면 종료

        type Fill<
          T extends unknown[],
          N,
          Start extends number = 0,
          End extends number = T['length'],
          Current extends number[] = [],
        > = T extends [] ? [] : Current['length'] extends End ? T : false;

      🔵 1-3. 

        type Fill<
          T extends unknown[],
          N,
          Start extends number = 0,
          End extends number = T['length'],
          Current extends number[] = [],
        > = T extends []
          ? []
          : Current['length'] extends End
            ? T
            : T extends [infer Head, ...infer Tail]
              ? Current['length'] extends Start
                ? [N, ...Fill<Tail, N, [...Current, 1]['length'], End, [...Current, 1]>]
                : [Head, ...Fill<Tail, N, Start, End, [...Current, 1]>]
              : [];

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Current extends number[] = [],
> = T extends []
  ? []
  : Current['length'] extends End
    ? T
    : T extends [infer Head, ...infer Tail]
      ? Current['length'] extends Start
        ? [N, ...Fill<Tail, N, [...Current, 1]['length'], End, [...Current, 1]>]
        : [Head, ...Fill<Tail, N, Start, End, [...Current, 1]>]
      : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/
