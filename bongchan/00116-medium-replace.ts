/*
  116 - Replace
  -------
  by Anthony Fu (@antfu) #보통 #template-literal

  ### 질문

  문자열 S에서 `From`를 찾아 한 번만 `To`로 교체하는 `Replace<S, From, To>`를 구현하세요.

  예시:

  ```ts
  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
  ```

  > GitHub에서 보기: https://tsch.js.org/116/ko
*/

// 🚀 시작: 2026-05-18 21:40
// ✅ 종료: 2026-05-18 21:53
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Template Literal
      
      type Replace<
        S extends string,
        From extends string,
        To extends string,
      > = S extends `${infer F}${From}${infer L}` ? `${F}${To}${L}` : S;

      - 3번째 케이스 Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>> 에서 에러 발생
        - Replace<'foobarbar', '', 'foo'> 의 결과가 'ffoooobarbar' 이렇게 나옴

      - 처음에 From으로 빈문자열이 들어오면 바로 반환하자

  😆 배움
    -

*/

/* _____________ 여기에 코드 입력 _____________ */

type Replace<
  S extends string,
  From extends string,
  To extends string,
> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer L}`
    ? `${F}${To}${L}`
    : S;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/116/answer/ko
  > 정답 보기: https://tsch.js.org/116/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
