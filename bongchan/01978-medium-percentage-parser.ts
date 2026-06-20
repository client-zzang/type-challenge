/*
  1978 - Percentage Parser
  -------
  by SSShuai1999 (@SSShuai1999) #보통 #template-literal

  ### 질문

  PercentageParser을 구현하세요. `/^(\+|\-)?(\d*)?(\%)?$/` 정규식에 따라 T를 일치시키고 3개의 일치 요소를 얻습니다
  구조는 [`더하기 혹은 빼기`, `숫자`,`단위`]와 같아야 합니다.
  일치 요소가 없다면, 기본값은 빈 문자열입니다.

  예시:

  ```ts
  type PString1 = ""
  type PString2 = "+85%"
  type PString3 = "-85%"
  type PString4 = "85%"
  type PString5 = "85"

  type R1 = PercentageParser<PString1> // expected ['', '', '']
  type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
  type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
  type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
  type R5 = PercentageParser<PString5> // expected ["", "85", ""]
  ```

  > GitHub에서 보기: https://tsch.js.org/1978/ko
*/

// 🚀 시작: 2026-06-20 09:49
// ✅ 종료: 2026-06-20 10:02
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Template Literal
      1) infer를 활용해서 재귀 돌면서 튜플에 값 채워주기
      2) 재귀를 돌 때 반환할 튜플을 제네릭 생성

      type Sign = '+' | '-';

      type PercentageParser<
        A extends string,
        R extends [string, string, string] = ['', '', ''],
      > = A extends `${infer First}${infer Rest}`
        ? First extends Sign
          ? PercentageParser<Rest, [First, R[1], R[2]]>
          : First extends '%'
            ? PercentageParser<Rest, [R[0], R[1], '%']>
            : PercentageParser<Rest, [R[0], `${R[1]}${First}`, R[2]]>
        : R;

      3) 숫자에 대한 조건은 가장 마지막으로 분리
        - "100" extends number ? true : false -> false
        - "100" extends string ? true : false -> true

  😆 배움
    - 다른 풀이
      type CheckPrefix<T> = T extends '+' | '-' ? T : never;
      type CheckSuffix<T> = T extends `${infer P}%` ? [P, '%'] : [T, ''];
      type PercentageParser<A extends string> =
        A extends `${CheckPrefix<infer L>}${infer R}`
          ? [L, ...CheckSuffix<R>]
          : ['', ...CheckSuffix<A>];
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type Sign = '+' | '-';

type PercentageParser<
  A extends string,
  R extends [string, string, string] = ['', '', ''],
> = A extends `${infer First}${infer Rest}`
  ? First extends Sign
    ? PercentageParser<Rest, [First, R[1], R[2]]>
    : First extends '%'
      ? PercentageParser<Rest, [R[0], R[1], '%']>
      : PercentageParser<Rest, [R[0], `${R[1]}${First}`, R[2]]>
  : R;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Case0 = ['', '', ''];
type Case1 = ['+', '', ''];
type Case2 = ['+', '1', ''];
type Case3 = ['+', '100', ''];
type Case4 = ['+', '100', '%'];
type Case5 = ['', '100', '%'];
type Case6 = ['-', '100', '%'];
type Case7 = ['-', '100', ''];
type Case8 = ['-', '1', ''];
type Case9 = ['', '', '%'];
type Case10 = ['', '1', ''];
type Case11 = ['', '100', ''];

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/1978/answer/ko
  > 정답 보기: https://tsch.js.org/1978/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
