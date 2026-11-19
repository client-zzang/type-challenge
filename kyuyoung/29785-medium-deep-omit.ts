type DeepOmit<T, P extends string> =
  P extends `${infer First}.${infer Rest}`
    ? { [K in keyof T]: K extends First ? DeepOmit<T[K], Rest> : T[K] }
    : { [K in keyof T as K extends P ? never : K]: T[K] }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string, age: {} } }>>,
]

