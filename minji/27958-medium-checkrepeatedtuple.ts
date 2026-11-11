/*
  27958 - CheckRepeatedTuple
  -------
  by bowen (@jiaowoxiaobala) #medium

  ### Question

  Implement type `CheckRepeatedChars<T>` which will return whether type `T` contains duplicated member

  For example:

  ```ts
  type CheckRepeatedTuple<[1, 2, 3]>   // false
  type CheckRepeatedTuple<[1, 2, 1]>   // true
  ```

  > View on GitHub: https://tsch.js.org/27958
*/

/* _____________ Your Code Here _____________ */

type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2)
    ? true
    : false

type IsInclude<T extends unknown[], Prev> = T extends [infer F, ...infer R]
  ? IsEqual<Prev, F> extends true
    ? true
    : IsInclude<R, Prev>
  : false

type CheckRepeatedTuple<T extends unknown[]> = T extends [infer F, ...infer R]
  ?  IsInclude<R, F> extends true
    ? true
    : CheckRepeatedTuple<R>
  : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[number, 1, string, '1', boolean, true, false, unknown, any]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[never, any, never]>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27958/answer
  > View solutions: https://tsch.js.org/27958/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 타입의 정확한 일치 여부 확인 -> [1, 2, 1] 케이스 미통과
type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2)
    ? true
    : false


type CheckRepeatedTuple<T extends unknown[], U = never> = T extends [infer F, ...infer R]
  ? IsEqual<F, U> extends true
    ? true
    : CheckRepeatedTuple<R, U | F>
  : false

- 이 풀이는 "같은지"만 보고 있음
- 같은지 확인하는 게 아니라 포함되는지를 확인해야 함!

*/
