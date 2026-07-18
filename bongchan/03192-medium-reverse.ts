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

// 🚀 시작: 2026-07-18 18:56
// ✅ 종료: 2026-07-18 19:00
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 T를 unknown Array로 타입 좁히기
      - 아래 errors 대응을 위함
      
        type Reverse<T extends Array<unknown>> = any;

    2. infer 활용
      - 마지막 요소와 나머지 요소를 infer로 추출하여 마지막 요소를 제일 앞에 배치하고 나머지 요소로 재귀를 돌면서 Reverse

        type Reverse<T extends Array<unknown>> = T extends [...infer Rest, infer Last]
          ? [Last, ...Reverse<Rest>]
          : T;

  😆 배움
    - 

/* _____________ Your Code Here _____________ */

type Reverse<T extends Array<unknown>> = T extends [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : T;

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
