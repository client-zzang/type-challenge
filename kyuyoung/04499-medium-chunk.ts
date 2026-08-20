type Chunk<T extends any[], N extends number, Swap extends any[] = []> 
  = Swap['length'] extends N
    ? [Swap, ...Chunk<T, N>]
    : T extends [infer K, ...infer L]
      ? Chunk<L, N, [...Swap, K]>
      : Swap extends [] 
        ? Swap 
        : [Swap]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]
