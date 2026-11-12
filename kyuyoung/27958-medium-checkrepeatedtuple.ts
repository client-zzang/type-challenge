type Includes<T extends unknown[], U> =
  T extends [infer F, ...infer R]
    ? Equal<F, U> extends true ? true : Includes<R, U>
    : false

type CheckRepeatedTuple<T extends unknown[]> =
  T extends [infer F, ...infer R]
    ? Includes<R, F> extends true ? true : CheckRepeatedTuple<R>
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
