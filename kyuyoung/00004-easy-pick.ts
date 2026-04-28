/* _____________ Your Code Here _____________ */

type MyPick<T, K extends keyof T> = {
  [k in K]: T[k]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/*
배운점
- in 연산자를 활용해 k 값을 K 타입으로 한정하고 T 제네릭 타입에 접근하는 방식
*/
