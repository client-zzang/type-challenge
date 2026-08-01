/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #보통 #math #template-literal

  ### 질문

  number, string, 혹은 bigint을 받는 `Absolute` 타입을 만드세요.
  출력은 양수 문자열이어야 합니다.

  예시:

  ```ts
  type Test = -100
  type Result = Absolute<Test> // expected to be "100"
  ```

  > GitHub에서 보기: https://tsch.js.org/529/ko
*/

// 🚀 시작: 2026-08-01 13:26
// ✅ 종료: 2026-08-01 13:28
// 🥺 정답 확인 여부:

/*
  🤔 접근
    1. 문자열로 변환

      type Absolute<T extends number | string | bigint> = `${T}`;

    2. infer를 활용하여 숫자 출력

      type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
        ? R
        : `${T}`;

  😆 배움
    -

*/

/* _____________ 여기에 코드 입력 _____________ */

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/529/answer/ko
  > 정답 보기: https://tsch.js.org/529/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
