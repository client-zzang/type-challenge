/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal

  ### Question

  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.

  > View on GitHub: https://tsch.js.org/10969
*/

// 🚀 시작: 2026-09-27 23:51
// ✅ 종료: 2026-09-28 00:07
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. infer를 활용한 Integer 여부 판단

      type NumberToString<T extends number> = `${T}`;

      type Integer<T extends number> =
        NumberToString<T> extends `${string}.${infer L}`
          ? L extends 0
            ? T
            : never
          : number extends T
            ? never
            : T;

  😆 배움
    - 다른 풀이

      type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;

*/

/* _____________ Your Code Here _____________ */

type NumberToString<T extends number> = `${T}`;

type Integer<T extends number> =
  NumberToString<T> extends `${string}.${infer L}`
    ? L extends 0
      ? T
      : never
    : number extends T
      ? never
      : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

let x = 1;
let y = 1 as const;

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.0>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10969/answer
  > View solutions: https://tsch.js.org/10969/solutions
  > More Challenges: https://tsch.js.org
*/
