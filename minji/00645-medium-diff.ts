/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff<F, S> = {[key in keyof F | keyof S as key extends keyof F ? key extends keyof S ? never :key : key extends keyof S ? key extends keyof F ? never : key : key]: key extends keyof F ? F[key] : key extends keyof S ? S[key] : never }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/

/**
접근
1. type Diff<F, S> = {[key in keyof F | keyof S]: key extends keyof F ? key extends keyof S ? never : F[key] : key extends keyof S ? key extends keyof F ? never : S[key]}
=> value의 never가 남는다!!
=> key에서 never로 없애기

 */
