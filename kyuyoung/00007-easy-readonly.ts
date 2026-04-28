/* _____________ Your Code Here _____________ */

type MyReadonly<T> = {
  readonly [k in keyof T]: T[k]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

/*
  배운점
  - readonly를 value 앞에 위치해야하는 줄 착각했네요 ㅎㅎ;
*/
