/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.

  For example

  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```

  > View on GitHub: https://tsch.js.org/2757
*/

/* _____________ Your Code Here _____________ */

type Flatten<T> = {
  [key in keyof T]: T[key]
}
type PartialByKeys<T, K extends keyof T = keyof T> = Flatten<Omit<T, K> & {[key in K]?: T[key]}>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 안되는 것 알지만....일단 &로 연결 -> 실패!
type PartialByKeys<T, K extends keyof T = keyof T> = {[key in keyof T as key extends K? never : key]: T[key]} & {K?: T[K]}

2. Omit이 내부적으로 flatten화한다고 하는데, 얘도 안됨
type PartialByKeys<T, K extends keyof T = keyof T> = Omit<Omit<T, K> & {K?: T[K]}, never>

3. Flatten 타입 추가 => 성공!
type Flatten<T> = {
  [key in keyof T]: T[key]
}
type PartialByKeys<T, K extends keyof T = keyof T> = Flatten<Omit<T, K> & {[key in K]?: T[key]}>


 */
