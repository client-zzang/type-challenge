/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #보통 #template-literal

  ### 질문

  `String#length`처럼 동작하는 문자열 리터럴의 길이를 구하세요.

  > GitHub에서 보기: https://tsch.js.org/298/ko
*/

// 🚀 시작: 2026-07-25 22:28
// ✅ 종료: 2026-07-25 22:37
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 튜플의 length 프로퍼티는 리터럴 값이 반환됨을 활용

      type StringToTuple<S extends string> = S extends `${infer F}${infer Rest}`
        ? [F, ...StringToTuple<Rest>]
        : [];

  😆 배움
    -

*/

/* _____________ 여기에 코드 입력 _____________ */

type StringToTuple<S extends string> = S extends `${infer F}${infer Rest}`
  ? [F, ...StringToTuple<Rest>]
  : [];

type LengthOfString<S extends string> = StringToTuple<S>['length'];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/298/answer/ko
  > 정답 보기: https://tsch.js.org/298/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
