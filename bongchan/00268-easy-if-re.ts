/*
  268 - If
  -------
  by Pavel Glushkov (@pashutk) #쉬움 #utils

  ### 질문

  조건 `C`, 참일 때 반환하는 타입 `T`, 거짓일 때 반환하는 타입 `F`를 받는 타입 `If`를 구현하세요. `C`는 `true` 또는 `false`이고, `T`와 `F`는 아무 타입입니다.

  예시:

  ```ts
  type A = If<true, 'a', 'b'>  // expected to be 'a'
  type B = If<false, 'a', 'b'> // expected to be 'b'
  ```

  > GitHub에서 보기: https://tsch.js.org/268/ko
*/

// 🚀 시작: 2026-05-29 21:52
// ✅ 종료: 2026-05-29 21:54
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 C를 boolean 타입으로 좁히기

      type If<C extends boolean, T, F> = C extends true ? T : F;

  😆 배움
    1. Distributive Conditional Types, naked type parameter
      - 제네릭 C의 경우 extends 절에서 naked type parameter(다른 타입으로 감싸지 않은 순수 타입 매개변수)로 사용됨
      - 이때 제네릭 C에 유니온 타입이 들어오는 경우(boolean -> true | false) 분배가 일어남

*/

/* _____________ 여기에 코드 입력 _____________ */

type If<C extends boolean, T, F> = C extends true ? T : F;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
];

// @ts-expect-error
type error = If<null, 'a', 'b'>;

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/268/answer/ko
  > 정답 보기: https://tsch.js.org/268/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
