/*
  9142 - CheckRepeatedChars
  -------
  by Hong (@RThong) #medium #union #string

  ### Question

  Implement type ```CheckRepeatedChars<S>``` which will return whether type ```S``` contains duplicated chars?

  For example:

  ```ts
  type CheckRepeatedChars<'abc'>   // false
  type CheckRepeatedChars<'aba'>   // true
  ```

  > View on GitHub: https://tsch.js.org/9142
*/

// 🚀 시작: 2026-09-14 22:54
// ✅ 종료: 2026-09-14 22:58
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 같은 값을 가지고 있는지 확인할 string 유니온 타입의 제네릭 추가

      type CheckRepeatedChars<
        T extends string,
        K extends string = '',
      > = T extends `${infer F}${infer R}`
        ? F extends K
          ? true
          : CheckRepeatedChars<R, K | F>
        : false;

  😆 배움
    1. 다른풀이
      - Template Literal을 적극 활용한 풀이

      type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer E}`
        ? E extends `${string}${F}${string}`
          ? true
          : CheckRepeatedChars<E>
        : false;

*/

/* _____________ Your Code Here _____________ */

type CheckRepeatedChars<
  T extends string,
  K extends string = '',
> = T extends `${infer F}${infer R}`
  ? F extends K
    ? true
    : CheckRepeatedChars<R, K | F>
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9142/answer
  > View solutions: https://tsch.js.org/9142/solutions
  > More Challenges: https://tsch.js.org
*/
