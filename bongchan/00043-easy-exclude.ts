/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #쉬움 #built-in #union

  ### 질문

  `T`에서 `U`에 할당할 수 있는 타입을 제외하는 내장 제네릭 `Exclude<T, U>`를 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > GitHub에서 보기: https://tsch.js.org/43/ko
*/

// 🚀 시작: 2026-04-25 09:26
// ✅ 종료: 2026-04-25 09:29
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    삼항연산자를 활용해서 T의 타입을 U로 제한해서 조건부로 never 처리

  😆 배움
    1. 분배 조건부 타입(Distributive Conditional Types)
      - 조건부 타입에서 검사 대상이 naked 제네릭 타입 매개변수이고, 그 타입이 유니온이면 자동으로 분배되어 그 결과를 유니온으로 합쳐짐
      - https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

    2. Naked
      - Naked — T가 그 자체로 등장
        - type A<T> = T extends U ? X : Y;

      - Not naked — T가 다른 타입으로 "옷을 입은" 상태
        - type B<T> = [T] extends [U] ? X : Y;        // 튜플로 감쌈
        - type C<T> = { v: T } extends { v: U } ? X : Y; // 객체로 감쌈
        - type D<T> = Promise<T> extends Promise<U> ? X : Y; // 제네릭으로 감쌈

      - 분배 동작 차이
        - type Distribute<T> = T extends string ? 'yes' : 'no';
        - type NoDistribute<T> = [T] extends [string] ? 'yes' : 'no';

        - type R1 = Distribute<'a' | 1>;   // 'yes' | 'no'  ← 각 멤버별로 분배됨
        - type R2 = NoDistribute<'a' | 1>; // 'no'          ← 유니온 전체로 한 번만 평가
 */

/* _____________ 여기에 코드 입력 _____________ */

type MyExclude<T, U> = T extends U ? never : T;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/43/answer/ko
  > 정답 보기: https://tsch.js.org/43/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
