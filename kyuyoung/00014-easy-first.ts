/* _____________ Your Code Here _____________ */

type First<T extends any[]> = T extends [] ? never : T[0]
// type First<T extends any[]> = T extends [infer V, ...any] ? V : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

/*
  배운점
  - extends 로 먼저 배열 타입으로 추론하고 extends [] 를 통해 빈 배열임을 추론하는 방법
  - 다른 답을 찾아보며 infer 을 활용하는 답안을 보고 평소 infer 키워드를 활용하지 않는데 이에 대해 배웠음
*/
