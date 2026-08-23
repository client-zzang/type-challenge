/*
  5117 - Without
  -------
  by Pineapple (@Pineapple0919) #medium #union #array

  ### Question

  Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```

  > View on GitHub: https://tsch.js.org/5117
*/

/* _____________ Your Code Here _____________ */

type ChangeToUnion<N extends number[] | number> = N extends number[] ? N[number] : N

type Without<T extends number[], U extends number[] | number, Result extends number[] = []> = T extends [infer TF extends number, ...infer TR extends number[]]
  ? Without<TR, U, TF extends ChangeToUnion<U> ? Result : [...Result, TF]>
  : Result

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5117/answer
  > View solutions: https://tsch.js.org/5117/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 모든 케이스를 비교 => M*N번 비교
type Without<T extends number[], U, Result extends number[] = []> = T extends [infer TF extends number, ...infer TR extends number[]]
  ? Without<TR, U extends [infer F, ...infer R] ? R : U, [...Result, TF]>
  : Result

2. 유니온으로 변환하기
type Without<T extends number[], U extends number[] | number, Result extends number[] = []> = T extends [infer TF extends number, ...infer TR extends number[]]
  ? Without<TR, U, TF extends ChangeToUnion<U> ? Result : [...Result, TF]>
  : Result
- U를 유니온으로 변환하고, 튜플의 첫 번째 값과 비교
- 튜플의 나머지 값을 T로 넘겨줌
*/
