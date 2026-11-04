/*
  27862 - CartesianProduct
  -------
  by jazelly (@jazelly) #medium #union

  ### Question

  Given 2 sets (unions), return its Cartesian product in a set of tuples, e.g.
  ```ts
  CartesianProduct<1 | 2, 'a' | 'b'>
  // [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']
  ```

  > View on GitHub: https://tsch.js.org/27862
*/

/* _____________ Your Code Here _____________ */

// 총 T*U개의 타입을 갖는 유니온이 만들어져야 함 (never 제외)
type CartesianProduct<T, U> = T extends T
  ? U extends U
    ? [T, U]
    : never
  : never

type a = CartesianProduct<1 | 2, 'a' | 'b'>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CartesianProduct<1 | 2, 'a' | 'b'>, [2, 'a'] | [1, 'a'] | [2, 'b'] | [1, 'b']>>,
  Expect<Equal<CartesianProduct<1 | 2 | 3, 'a' | 'b' | 'c' >, [2, 'a'] | [1, 'a'] | [3, 'a'] | [2, 'b'] | [1, 'b'] | [3, 'b'] | [2, 'c'] | [1, 'c'] | [3, 'c']>>,
  Expect<Equal<CartesianProduct<1 | 2, 'a' | never>, [2, 'a'] | [1, 'a'] >>,
  Expect<Equal<CartesianProduct<'a', Function | string>, ['a', Function] | ['a', string]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27862/answer
  > View solutions: https://tsch.js.org/27862/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근

[T, U] => [1 | 2, 'a' | 'b']가 된다 
*/
