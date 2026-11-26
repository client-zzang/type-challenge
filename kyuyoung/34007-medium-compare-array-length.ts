type CompareArrayLength<T extends any[], U extends any[]> =
  T extends [any, ...infer TR]
    ? U extends [any, ...infer UR]
      ? CompareArrayLength<TR, UR>
      : 1
    : U extends [any, ...any[]]
      ? -1
      : 0

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CompareArrayLength<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength<[], []>, 0>>,
  Expect<Equal<CompareArrayLength<[1, 2, 3], [4, 5, 6]>, 0>>,
]
