/*
  3192 - Reverse
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple

  ### Question

  Implement the type version of ```Array.reverse```

  For example:

  ```typescript
  type a = Reverse<['a', 'b']> // ['b', 'a']
  type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
  ```

  > View on GitHub: https://tsch.js.org/3192
*/

// 🚀 시작: 2026-09-25 21:22
// ✅ 종료: 2026-09-25 21:25
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 뒤집은 배열을 저장할 제네릭 R 추가

      type Reverse<T extends unknown[], R extends unknown[]> = any;

    2. infer를 활용하여 요소 하나씩 뒤에서 꺼내어 넣기

      type Reverse<T extends unknown[], R extends unknown[] = []> = T extends [
        ...infer Rest,
        infer Last,
      ]
        ? Reverse<Rest, [...R, Last]>
        : R;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[], R extends unknown[] = []> = T extends [
  ...infer Rest,
  infer Last,
]
  ? Reverse<Rest, [...R, Last]>
  : R;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
];

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3192/answer
  > View solutions: https://tsch.js.org/3192/solutions
  > More Challenges: https://tsch.js.org
*/
