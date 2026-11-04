/*
  27932 - MergeAll
  -------
  by scarf (@scarf005) #medium #object #array #union

  ### Question

  Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

  For example:

  ```ts
  type Foo = { a: 1; b: 2 }
  type Bar = { a: 2 }
  type Baz = { c: 3 }

  type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
  ```

  > View on GitHub: https://tsch.js.org/27932
*/

/* _____________ Your Code Here _____________ */

type MergeAll<XS, Obj extends Record<any, any> = {}> = XS extends [infer F, ...infer R]
  ? MergeAll<R, {[key in keyof Obj | keyof F]: (key extends keyof Obj ? Obj[key] : never) | (key extends keyof F ? F[key] : never)}>
  : Obj
  
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll<[{ a: string }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1 }, { c: 2 }]>,
    { a: 1, c: 2 }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2, b: 2, c: 3 }
>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27932/answer
  > View solutions: https://tsch.js.org/27932/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. obj key로 접근하기 => 
type MergeAll<XS, Obj extends Record<any, any> = {}> = XS extends [infer F, ...infer R]
  ? MergeAll<R, Omit<Obj & {[key in keyof F]: F[key]}, never>>
  : Obj

=> value가 유니온 타입인 경우 never로 추론되는 문제 발생

2. RemoveDuplicate 추가 => 첫 번째 오는 value만 저장되는 문제
type RemoveDuplicate<A extends Record<any, any>, B extends Record<any, any>> = Omit<{[key in keyof A]: A[key]} & {[Bkey in keyof B]: Bkey extends keyof A ? A[Bkey] | B[Bkey]: B[Bkey]}, never>

type MergeAll<XS, Obj extends Record<any, any> = {}> = XS extends [infer F, ...infer R]
  ? MergeAll<R, RemoveDuplicate<Obj, {[key in keyof F]: F[key]}>>
  : Obj

- (AI힌트) 원인: & 교집합을 쓰면 첫 번째 value만 남게 된다.
=> value를 직접 유니온으로 묶기

*/
