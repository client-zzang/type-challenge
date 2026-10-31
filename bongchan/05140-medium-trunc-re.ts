/*
  5140 - Trunc
  -------
  by jiangshan (@jiangshanmeta) #medium #template-literal

  ### Question

  Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.

  For example:

  ```typescript
  type A = Trunc<12.34> // 12
  ```

  > View on GitHub: https://tsch.js.org/5140
*/

// 🚀 시작: 2026-10-31 15:06
// ✅ 종료: 2026-10-31 15:16
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. template literal 활용

        type ToString<N extends number | string> = N extends number ? `${N}` : N;

        type Trunc<
          N extends number | string,
          S = ToString<N>,
        > = S extends `${infer F}.${string}` ? (F extends '' | '-' ? `${F}0` : F) : S;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type ToString<N extends number | string> = N extends number ? `${N}` : N;

type Trunc<
  N extends number | string,
  S = ToString<N>,
> = S extends `${infer F}.${string}` ? (F extends '' | '-' ? `${F}0` : F) : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5140/answer
  > View solutions: https://tsch.js.org/5140/solutions
  > More Challenges: https://tsch.js.org
*/
