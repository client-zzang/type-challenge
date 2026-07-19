/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

/* _____________ Your Code Here _____________ */

type TupleToNestedObject<T extends (string | number | symbol)[], U> = T extends [] ? U : T extends [infer First extends string, ...infer Rest extends string[]] ? Record<First, TupleToNestedObject<Rest, U>> : Record<T[0], U >

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3188/answer
  > View solutions: https://tsch.js.org/3188/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * 접근
1. type TupleToNestedObject<T extends any[], U> = T extends [] ? U : T extends [infer First, ...infer Rest] ? Record<First, TupleToNestedObject<Rest, U>> : Record<First, U >
=> Type 'First' does not satisfy the constraint 'string | number | symbol'. 에러

2. 타입 좁혀보기 (실패)
type TupleToNestedObject<T extends (string | number | symbol)[], U> = T extends [] ? U : T extends [infer First, ...infer Rest] ? Record<First, TupleToNestedObject<Rest, U>> : Record<First, U >
=> [] 내부에 extends 붙이기

3. 성공!
type TupleToNestedObject<T extends (string | number | symbol)[], U> = T extends [] ? U : T extends [infer First extends string, ...infer Rest extends string[]] ? Record<First, TupleToNestedObject<Rest, U>> : Record<T[0], U >

 */
