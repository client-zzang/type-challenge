type FindEles<T extends any[], Duplicates = never> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends Duplicates
    ? FindEles<Rest, Duplicates>
    : First extends Rest[number]
    ? FindEles<Rest, Duplicates | First>
    : [First, ...FindEles<Rest, Duplicates>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
]
