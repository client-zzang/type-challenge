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

// 🚀 시작: 2026-05-30 22:11
// ✅ 종료: 2026-05-30 22:41
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. Template Literal + 재귀

      type ToLowerCase = {
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
        K: 'k';
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

      type UpperLetter = keyof ToLowerCase;

      type KebabCase<S> = S extends `${infer F}${infer L}`
        ? F extends UpperLetter
          ? `-${ToLowerCase[F]}${KebabCase<L>}`
          : `${F}${KebabCase<L>}`
        : S;

      - KebabCase<'FooBarBaz'> 케이스에서 "-foo-bar-baz" 같은 결과가 나옴

      - MyLowerCase 타입을 정의해 `${infer F}${infer L}` 구조에서 F로 타입을 좁히는 것이 아니라 L로 좁히기

        type MyLowerCase<S> = S extends `${infer F}${infer L}`
          ? F extends `${UpperLetter}`
            ? `${ToLowerCase[F]}${KebabCase<L>}`
            : `${F}${KebabCase<L>}`
          : S;

        type KebabCase<S> = S extends `${infer F}${infer L}`
          ? L extends `${UpperLetter}${infer _}`
            ? `${MyLowerCase<F>}-${KebabCase<L>}`
            : `${MyLowerCase<F>}${KebabCase<L>}`
          : S;

  😆 배움
    1. Uncapitalize

      type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
        ? S2 extends Uncapitalize<S2>
          ? `${Uncapitalize<S1>}${KebabCase<S2>}`
          : `${Uncapitalize<S1>}-${KebabCase<S2>}`
        : S;

*/

/* _____________ 여기에 코드 입력 _____________ */

type ToLowerCase = {
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
  K: 'k';
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

type UpperLetter = keyof ToLowerCase;

type MyLowerCase<S> = S extends `${infer F}${infer L}`
  ? F extends `${UpperLetter}`
    ? `${ToLowerCase[F]}${KebabCase<L>}`
    : `${F}${KebabCase<L>}`
  : S;

type KebabCase<S> = S extends `${infer F}${infer L}`
  ? L extends `${UpperLetter}${infer _}`
    ? `${MyLowerCase<F>}-${KebabCase<L>}`
    : `${MyLowerCase<F>}${KebabCase<L>}`
  : S;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type T1 = KebabCase<'FooBarBaz'>;

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
