/*
  15 - Last of Array
  -------
  by Anthony Fu (@antfu) #medium #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  Implement a generic `Last<T>` that takes an Array `T` and returns its last element.

  For example

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```

  > View on GitHub: https://tsch.js.org/15
*/

/* _____________ Your Code Here _____________ */

type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/15/answer
  > View solutions: https://tsch.js.org/15/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. type Last<T extends any[]> = T extends [infer First, ...infer Rest] ? Equal<Rest, undefined> extends true ? First : Last<Rest> : never
- spread 형태로 가장 마지막 것을 가져올 수 있다 => [...infer Rest, infer Last]로 개선 가능
- infer Rest는 항상 튜플 타입이기 때문에 undefined와 같을 수 없어서 항상 false가 된다

2. type Last<T extends any[]> = T extends [...infer R, infer L] ? L extends L ? L : Last<R> : never
- 정답...이긴 하다
- L extends L은 항상 true가 된다. 결과는 그대로 두고, 분배만 하고 싶을 때 사용

3. type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never
- T가 [...infer Rest, infer L]에 해당될때/안될때를 나누기 위해 이렇게 사용할 수 있음
*/
