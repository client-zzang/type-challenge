/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #보통 #union #string

  ### 질문

  문자열 인수를 입력받는 String to Union 유형을 구현하세요.
  출력은 입력 문자열의 Union type이어야 합니다.

  예시:

  ```ts
  type Test = "123"
  type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
  ```

  > GitHub에서 보기: https://tsch.js.org/531/ko
*/

// 🚀 시작: 2026-05-28 23:33
// ✅ 종료: 2026-05-28 23:42
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 출력 결과 타입 제네릭 R 추가 + Template Literal
    
      type StringToUnion<T extends string, R extends string = never> = T extends ''
        ? R
        : T extends `${infer F}${infer L}`
          ? StringToUnion<L, R | F>
          : never;

  😆 배움
    1. 더 쉬운 풀이
      type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}`
        ? Letter | StringToUnion<Rest>
        : never;

*/

/* _____________ 여기에 코드 입력 _____________ */

type StringToUnion<T extends string, R extends string = never> = T extends ''
  ? R
  : T extends `${infer F}${infer L}`
    ? StringToUnion<L, R | F>
    : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<
    Equal<
      StringToUnion<'coronavirus'>,
      'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'
    >
  >,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/531/answer/ko
  > 정답 보기: https://tsch.js.org/531/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
