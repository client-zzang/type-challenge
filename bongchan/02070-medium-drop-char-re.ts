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

// 🚀 시작: 2026-08-30 00:10
// ✅ 종료: 2026-08-30 00:13
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 S, C 를 string 으로 타입 좁히기
      - 첫 번째 케이스의 @ts-expect-error 대응

      type DropChar<S extends string, C extends string> = any;

    2. infer를 활용해서 제네릭 C를 재귀 돌면서 제거하기

      type DropChar<
        S extends string,
        C extends string,
      > = S extends `${infer F}${C}${infer R}` ? DropChar<`${F}${R}`, C> : S;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type DropChar<
  S extends string,
  C extends string,
> = S extends `${infer F}${C}${infer R}` ? DropChar<`${F}${R}`, C> : S;

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
