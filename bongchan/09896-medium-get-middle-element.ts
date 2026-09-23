/*
  9896 - GetMiddleElement
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  Get the middle element of the array by implementing a `GetMiddleElement` method, represented by an array

  > If the length of the array is odd, return the middle element
  > If the length of the array is even, return the middle two elements

  For example

  ```ts
    type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>, // expected to be [3]
    type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/9896
*/

// 🚀 시작: 2026-09-23 22:13
// ✅ 종료: 2026-09-23 22:38
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 T를 unknown[]으로 타입 좁히기
      - error 케이스 대응

        type GetMiddleElement<T extends unknown[]> = any;

    2. 배열의 길이가 1 또는 2 일 때, 배열 그대로 반환. 아닐 경우 앞에서 하나 뒤에서 하나씩 재귀로 제거

      type GetMiddleElement<T extends unknown[]> = T['length'] extends 1 | 2
        ? T
        : T extends [unknown, ...infer Rest, unknown]
          ? GetMiddleElement<Rest>
          : T;
      

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type GetMiddleElement<T extends unknown[]> = T['length'] extends 1 | 2
  ? T
  : T extends [unknown, ...infer Rest, unknown]
    ? GetMiddleElement<Rest>
    : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<
    Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>
  >,
  Expect<
    Equal<
      GetMiddleElement<[() => string, () => number]>,
      [() => string, () => number]
    >
  >,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
];
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9896/answer
  > View solutions: https://tsch.js.org/9896/solutions
  > More Challenges: https://tsch.js.org
*/
