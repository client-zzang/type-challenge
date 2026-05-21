/* _____________ Your Code Here _____________ */

type Last<T extends any[]> = T extends [] ? never : [any, ...T][T["length"]]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

/*
  배운점
  - T['length']로 접근시 마지막에서 하나 오버 한 요소에 접근 되므로 맨 앞에 any 추가
*/
