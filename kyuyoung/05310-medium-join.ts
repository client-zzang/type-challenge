type Join<T extends string[], U extends string | number = ',', R extends string | number = ''> = 
  T extends [infer I extends string] 
    ? `${R}${I}`
    : T extends [infer First extends string, ...infer Rest extends string[]] 
      ? Join<Rest, U, `${R}${First}${U}`> 
      : R

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
  Expect<Equal<Join<['1', '1', '1']>, '1,1,1'>>,
]
