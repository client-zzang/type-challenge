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

// 🚀 시작: 2026-04-26 13:05
// ✅ 종료: 2026-04-26 13:05
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    C의 타입을 true로 제한해서 삼항연산자를 활용해 true에 포함되면 T, 아니라면 F
    error 케이스의 null을 제한하기 위해서 C의 타입을 boolean으로 좁히기

  😆 배움
    세 번째 테스트 케이스 Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>
      - boolean은 true와 false를 포함하는 유니온 타입이기 때문에 T와 F를 모두 반환
      - 즉, 'a' | 2 로 유니온 타입 추론 발생
        - 분배 조건부 타입(Distributive Conditional Types)
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
