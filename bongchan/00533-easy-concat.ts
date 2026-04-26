/*
  533 - Concat
  -------
  by Andrey Krasovsky (@bre30kra69cs) #쉬움 #array

  ### 질문

  JavaScript의 `Array.concat` 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, 인수를 왼쪽부터 concat한 새로운 배열을 반환해야 합니다.

  예시:

  ```ts
  type Result = Concat<[1], [2]> // expected to be [1, 2]
  ```

  > GitHub에서 보기: https://tsch.js.org/533/ko
*/

// 🚀 시작: 2026-04-26 23:14
// ✅ 종료: 2026-04-26 23:20
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    readonly any[]로 타입을 제한하고 spread 연산자를 활용하면 어떨까

  😆 배움
    1. Variadic Tuple Types
      - 값 레벨 spread: [...arr1, ...arr2] -> 런타임 배열 생성
      - 타입 레벨 spread: [...T, ...U] -> 컴파일 타임 튜플 타입 결합
      - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types
 */

/* _____________ 여기에 코드 입력 _____________ */

type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const tuple = [1] as const;

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<
    Equal<
      Concat<['1', 2, '3'], [false, boolean, '4']>,
      ['1', 2, '3', false, boolean, '4']
    >
  >,
];

// @ts-expect-error
type error = Concat<null, undefined>;

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/533/answer/ko
  > 정답 보기: https://tsch.js.org/533/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
