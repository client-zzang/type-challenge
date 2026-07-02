/*
  16 - Pop
  -------
  by Anthony Fu (@antfu) #보통 #array

  ### 질문

  > 이 챌린지에는 TypeScript 4.0 사용이 권장됩니다.

  배열 `T`를 사용해 마지막 요소를 제외한 배열을 반환하는 제네릭 `Pop<T>`를 구현합니다.

  예시

  ```ts
  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]

  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
  ```

  **더보기**: 비슷하게 `Shift`, `Push` 그리고 `Unshift`도 구현할 수 있을까요?

  > GitHub에서 보기: https://tsch.js.org/16/ko
*/

// 🚀 시작: 2026-07-02 23:23
// ✅ 종료: 2026-07-02 23:25
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. infer
      - 제일 뒤에 요소 any를 두고 나머지를 rest로 처리

      type Pop<T extends any[]> = T extends [...infer Rest, any] ? [...Rest] : [];

  😆 배움
    - 

*/

/* _____________ 여기에 코드 입력 _____________ */

type Pop<T extends any[]> = T extends [...infer Rest, any] ? [...Rest] : [];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/16/answer/ko
  > 정답 보기: https://tsch.js.org/16/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
