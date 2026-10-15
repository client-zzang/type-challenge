type FindAll<
  T extends string,
  P extends string,
  Index extends unknown[] = [],
  Result extends number[] = [],
> = P extends ''
  ? []
  : T extends `${infer _}${infer Rest}`
    ? FindAll<
        Rest,
        P,
        [...Index, unknown],
        T extends `${P}${string}` ? [...Result, Index['length']] : Result
      >
    : Result

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]
