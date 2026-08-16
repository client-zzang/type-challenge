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

// 🚀 시작: 2026-08-16 14:02
// ✅ 종료: 2026-08-16 14:43
// 🥺 정답 확인 여부:

/*
  🤔 접근
    1. 튜플이 비어있을 때는 그대로 반환

      type Fill<
        T extends unknown[],
        N,
        Start extends number = 0,
        End extends number = T['length'],
        Index extends unknown[] = [],
      > = T extends [infer F, ...infer Rest] ? true : T;

    2. Index가 T의 길이 or End에 도달하면 T 반환

      type Fill<
        T extends unknown[],
        N,
        Start extends number = 0,
        End extends number = T['length'],
        Index extends unknown[] = [],
      > = T extends [infer F, ...infer R]
        ? Index['length'] extends T['length'] | End
          ? T
          : false
        : T;

    3. Index가 Start에 단 한번이라도 도달했다면 N으로 치환하고 Start에 Index의 길이 주입

      type Fill<
        T extends unknown[],
        N,
        Start extends number = 0,
        End extends number = T['length'],
        Index extends unknown[] = [],
      > = T extends [infer F, ...infer R]
        ? Index['length'] extends T['length'] | End
          ? T
          : Index['length'] extends Start
            ? [N, ...Fill<R, N, [...Index, 1]['length'], End, [...Index, 1]>]
            : [F, ...Fill<R, N, Start, End, [...Index, 1]>]
        : T;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Index extends unknown[] = [],
> = T extends [infer F, ...infer R]
  ? Index['length'] extends T['length'] | End
    ? T
    : Index['length'] extends Start
      ? [N, ...Fill<R, N, [...Index, 1]['length'], End, [...Index, 1]>]
      : [F, ...Fill<R, N, Start, End, [...Index, 1]>]
  : T;

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
