/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #보통 #template-literal

  ### 질문

  `camelCase`나 `PascalCase`를 `kebab-case` 문자열로 수정하세요.

  `FooBarBaz` -> `foo-bar-baz`

  예시:

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > GitHub에서 보기: https://tsch.js.org/612/ko
*/

// 🚀 시작: 2026-08-08 13:59
// ✅ 종료: 2026-08-08 14:12
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 

  😆 배움
    -

*/

/* _____________ 여기에 코드 입력 _____________ */

type ToLowercase = {
  A: 'a';
  B: 'b';
  C: 'c';
  D: 'd';
  E: 'e';
  F: 'f';
  G: 'g';
  H: 'h';
  I: 'i';
  J: 'j';
  k: 'k';
  L: 'l';
  M: 'm';
  N: 'n';
  O: 'o';
  P: 'p';
  Q: 'q';
  R: 'r';
  S: 's';
  T: 't';
  U: 'u';
  V: 'v';
  W: 'w';
  X: 'x';
  Y: 'y';
  Z: 'z';
};

type UppercaseUnits = keyof ToLowercase;

type KebabCaseImpl<S> = S extends `${infer F}${infer R}`
  ? F extends UppercaseUnits
    ? `-${ToLowercase[F]}${KebabCaseImpl<R>}`
    : `${F}${KebabCaseImpl<R>}`
  : S;

type KebabCase<S> = S extends `${infer F}${infer R}`
  ? F extends UppercaseUnits
    ? `${ToLowercase[F]}${KebabCaseImpl<R>}`
    : `${F}${KebabCaseImpl<R>}`
  : S;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/612/answer/ko
  > 정답 보기: https://tsch.js.org/612/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
