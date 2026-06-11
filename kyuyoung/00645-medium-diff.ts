type Diff<O extends Object, O1 extends Object> = {
  [K in (Exclude<keyof O | keyof O1, keyof O & keyof O1>)]: 
    K extends keyof O 
      ? O[K]
      : K extends keyof O1
        ? O1[K]
        : never
} 

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

/*
  배운점
*/
