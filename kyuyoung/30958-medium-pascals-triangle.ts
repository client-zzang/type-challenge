type Tup<N extends number, A extends 0[] = []> =
  A['length'] extends N ? A : Tup<N, [...A, 0]>

type Add<A extends number, B extends number> =
  [...Tup<A>, ...Tup<B>]['length'] extends infer S extends number ? S : never

type PairSums<R extends number[]> =
  R extends [infer A extends number, infer B extends number, ...infer Rest extends number[]]
    ? [Add<A, B>, ...PairSums<[B, ...Rest]>]
    : []

type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never

type Pascal<N extends number, Acc extends number[][] = [[1]]> =
  Acc['length'] extends N
    ? Acc
    : Last<Acc> extends infer Row extends number[]
      ? Pascal<N, [...Acc, [1, ...PairSums<Row>, 1]]>
      : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]
