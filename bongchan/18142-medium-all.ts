/*
  18142 - All
  -------
  by cutefcc (@cutefcc) #medium #array

  ### Question

  Returns true if all elements of the list are equal to the second parameter passed in, false if there are any mismatches.

  For example

  ```ts
  type Test1 = [1, 1, 1]
  type Test2 = [1, 1, 2]

  type Todo = All<Test1, 1> // should be same as true
  type Todo2 = All<Test2, 1> // should be same as false
  ```

  > View on GitHub: https://tsch.js.org/18142
*/

// 🚀 시작: 2026-10-05 22:56
// ✅ 종료: 2026-10-05 23:03
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 배열을 infer로 앞 요소, 나머지 요소를 분리하고 제네릭 K랑 교차 검증

      type All<T extends unknown[], K extends unknown> = T extends [
        infer Head,
        ...infer Tail,
      ]
        ? [Head] extends [K]
          ? [K] extends [Head]
            ? All<Tail, K>
            : false
          : false
        : true;

      - ❌ 아래 두 케이스에서 에러
        - All<[any], unknown>
        - All<[unknown], any>
    
    2. Equal 타입 활용

      type All<T extends unknown[], K extends unknown> = T extends [
        infer Head,
        ...infer Tail,
      ]
        ? Equal<Head, K> extends true
          ? All<Tail, K>
          : false
        : true;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type All<T extends unknown[], K extends unknown> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Equal<Head, K> extends true
    ? All<Tail, K>
    : false
  : true;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<['1', '1', '1'], '1'>, true>>,
  Expect<Equal<All<['1', '1', '1'], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
  Expect<Equal<All<[never], never>, true>>,
  Expect<Equal<All<[any], any>, true>>,
  Expect<Equal<All<[unknown], unknown>, true>>,
  Expect<Equal<All<[any], unknown>, false>>,
  Expect<Equal<All<[unknown], any>, false>>,
  Expect<Equal<All<[1, 1, 2], 1 | 2>, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/18142/answer
  > View solutions: https://tsch.js.org/18142/solutions
  > More Challenges: https://tsch.js.org
*/
