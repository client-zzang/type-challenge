/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

// 🚀 시작: 2026-08-02 13:03
// ✅ 종료: 2026-08-02 14:24
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 타겟 - 1, 타겟 - 2의 값을 가져오기 위한 배열 추가
      - 타입에서는 연산자(-)를 사용할 수 없으니까 튜플의 length 활용
      - 예) 세 번째 값을 가져오려면 첫 번째, 두 번째의 값을 알아야하기 때문에 튜플의 길이를 해당 값으로 유지

      - 어떻게 해야할 지 모르겠음...

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1],
> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
