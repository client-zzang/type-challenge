/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > View on GitHub: https://tsch.js.org/5317
*/

/* _____________ Your Code Here _____________ */

type LastIndexOf<T extends any[], U, L extends number = -1, I extends number[] = []> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? LastIndexOf<R, U, I['length'], [...I, 1]>
    : LastIndexOf<R, U, L, [...I, 1]>
  : L

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5317/answer
  > View solutions: https://tsch.js.org/5317/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 배열을 뒤집어 마지막 원소부터 접근? => 인덱스 추적 어려움
=> 첫 번째 원소부터 접근하고, flag를 두기

type LastIndexOf<T extends any[], U, L extends number = 0, I extends number[] = []> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? LastIndexOf<R, U, I['length'], [...I, 1]>
    : LastIndexOf<R, U, L, [...I, 1]>
  : L

=> 3번 케이스 미통과 (-1)

2. L 기본값을 -1으로 두기

type LastIndexOf<T extends any[], U, L extends number = -1, I extends number[] = []> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? LastIndexOf<R, U, I['length'], [...I, 1]>
    : LastIndexOf<R, U, L, [...I, 1]>
  : L
*/
