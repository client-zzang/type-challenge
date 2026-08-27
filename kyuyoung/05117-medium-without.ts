type ToUnion<T> = T extends any[] ? T[number] : T
type Without<T, U> = 
  T extends [infer R, ...infer F]
    ? R extends ToUnion<U>
      ? Without<F, U>
      : [R, ...Without<F, U>]
    : T
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]
