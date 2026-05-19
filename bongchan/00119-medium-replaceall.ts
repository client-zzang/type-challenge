/*
  119 - ReplaceAll
  -------
  by Anthony Fu (@antfu) #보통 #template-literal

  ### 질문

  주어진 문자열 `S`에서 부분 문자열 `From`을 찾아 모두 `To`로 교체하는 제네릭 `ReplaceAll<S, From, To>`을 구현하세요.

  예시:

  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
  ```

  > GitHub에서 보기: https://tsch.js.org/119/ko
*/

// 🚀 시작: 2026-05-19 22:01
// ✅ 종료: 2026-05-19 22:31
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. Template Literal type + 재귀
      - From이 빈문자열인 경우 S 그대로 반환
      - `${infer F}${From}${infer L}`으로 재귀 돌면서 replace 진행

      type ReplaceAll<
        S extends string,
        From extends string,
        To extends string,
      > = From extends ''
        ? S
        : S extends `${infer F}${From}${infer L}`
          ? ReplaceAll<`${F}${To}${L}`, From, To>
          : S;

      - 위 코드의 재귀는 replace로 만들어진 문자열에 대해서도 From 감지를 진행하는 이슈 발생
        - 아래 두 케이스에서 에러 발생
          - Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>
            - 결과: 'fbarfbar'
          - Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>
            - 결과: 'fobrfobar'

  😆 배움
    1. Template Literal Type 안에서 재귀 사용

*/

/* _____________ 여기에 코드 입력 _____________ */

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
> = From extends ''
  ? S
  : S extends `${infer R1}${From}${infer R2}`
    ? `${R1}${To}${ReplaceAll<R2, From, To>}`
    : S;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/119/answer/ko
  > 정답 보기: https://tsch.js.org/119/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
