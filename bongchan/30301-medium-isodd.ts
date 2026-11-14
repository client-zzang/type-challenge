/*
  30301 - IsOdd
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  return true is a number is odd

  > View on GitHub: https://tsch.js.org/30301
*/

// 🚀 시작: 2026-11-14 13:41
// ✅ 종료: 2026-11-14 14:01
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 홀수, 짝수는 정수의 가장 마지막 자리만 보면 된다는 성질 활용

        // ➡️ 홀수를 판별하는 1, 3, 5, 7, 9 유니온
        type Odd = 1 | 3 | 5 | 7 | 9;

        // ➡️ 정수만 보면 되기에 소수점 제거
        type RemoveDecimal<T extends number> =
          `${T}` extends `${infer Head extends number}.${string}` ? Head : T;

        // ➡️ 정수의 마지막 자리를 추출하기위해서 한번 뒤집기
        type Reverse<T extends string> = T extends `${infer Head}${infer Tail}`
          ? `${Reverse<Tail>}${Head}`
          : '';

        // ➡️ Reverse 유틸 타입을 활용하여 정수의 마지막 숫자 추출
        type ExtractLast<T extends number> =
          Reverse<`${T}`> extends `${infer Head extends number}${string}` ? Head : T;

        type IsOdd<
          T extends number,
          N extends number = RemoveDecimal<T>,
        > = `${N}` extends `${string}e${string}`
          ? false
          : ExtractLast<N> extends Odd
            ? true
            : false;

  😆 배움
    - 다른 풀이
      - 소수점이 있는 경우는 홀수, 짝수 어디에도 속하지 않는 것을 활용

      type IsOdd<T extends number>
        = `${T}` extends `${any}e${any}` | `${any}.${any}` ? false
        : `${T}` extends `${any}${1 | 3 | 5 | 7 | 9}` ? true : false

*/

/* _____________ Your Code Here _____________ */

type Odd = 1 | 3 | 5 | 7 | 9;

type RemoveDecimal<T extends number> =
  `${T}` extends `${infer Head extends number}.${string}` ? Head : T;

type Reverse<T extends string> = T extends `${infer Head}${infer Tail}`
  ? `${Reverse<Tail>}${Head}`
  : '';

type ExtractLast<T extends number> =
  Reverse<`${T}`> extends `${infer Head extends number}${string}` ? Head : T;

type IsOdd<
  T extends number,
  N extends number = RemoveDecimal<T>,
> = `${N}` extends `${string}e${string}`
  ? false
  : ExtractLast<N> extends Odd
    ? true
    : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsOdd<5>, true>>,
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<2.3>, false>>,
  Expect<Equal<IsOdd<3e23>, false>>,
  Expect<Equal<IsOdd<3>, true>>,
  Expect<Equal<IsOdd<number>, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30301/answer
  > View solutions: https://tsch.js.org/30301/solutions
  > More Challenges: https://tsch.js.org
*/
