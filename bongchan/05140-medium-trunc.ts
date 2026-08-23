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

// 🚀 시작: 2026-08-24 00:34
// ✅ 종료: 2026-08-24 00:43
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. infer를 활용하여 . 뒷 부분을 제거

      type Minus = '-';
      type Dot = '.';

      type NumberToString<T> = T extends number ? `${T}` : T;

      type Trunc<T, S = NumberToString<T>> = S extends `${infer F}${Dot}${string}`
        ? F extends '' | Minus
          ? F extends ''
            ? '0'
            : '-0'
          : F
        : S;

  😆 배움
    - 다른 풀이

      type Trunc<T extends number | string> = `${T}` extends `${infer R}.${any}`
        ? R extends '' | '-'
          ? `${R}0` // ➡️ R은 '' 아니면 '-' 니까 0 앞에 붙여주면 된다. 오...
          : `${R}`
        : `${T}`;

*/

/* _____________ Your Code Here _____________ */

type Minus = '-';
type Dot = '.';

type NumberToString<T> = T extends number ? `${T}` : T;

type Trunc<T, S = NumberToString<T>> = S extends `${infer F}${Dot}${string}`
  ? F extends '' | Minus
    ? F extends ''
      ? '0'
      : '-0'
    : F
  : S;

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
