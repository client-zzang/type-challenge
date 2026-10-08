type ToPrimitive<T extends object> = {
  [key in keyof T]: 
    T[key] extends string 
      ? string 
      : T[key] extends number 
        ? number 
        : T[key] extends boolean
          ? boolean
          : T[key] extends Function
            ? Function
            : T[key] extends object
              ? ToPrimitive<T[key]>
              : T[key]
}

type Test = ToPrimitive<PersonInfo>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]
