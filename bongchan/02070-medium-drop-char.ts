/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer

  ### Question

  Drop a specified char from a string.

  For example:

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > View on GitHub: https://tsch.js.org/2070
*/

// 🚀 시작: 2026-06-21 10:49
// ✅ 종료: 2026-06-21 10:54
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Template Literal
      - 반환 제네릭 R을 두고 재귀를 돌면서 R을 채우기

      type DropChar<
        S extends string,
        C extends string,
        R extends string = '',
      > = S extends `${infer First}${infer Rest}`
        ? First extends C
          ? DropChar<Rest, C, R>
          : DropChar<Rest, C, `${R}${First}`>
        : R;

  😆 배움
    - 다른 풀이
      type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}`
        ? DropChar<`${L}${R}`, C>
        : S;
  
*/

/* _____________ Your Code Here _____________ */

type DropChar<
  S extends string,
  C extends string,
  R extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? First extends C
    ? DropChar<Rest, C, R>
    : DropChar<Rest, C, `${R}${First}`>
  : R;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2070/answer
  > View solutions: https://tsch.js.org/2070/solutions
  > More Challenges: https://tsch.js.org
*/
