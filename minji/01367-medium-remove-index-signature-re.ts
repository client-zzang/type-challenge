/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

// type RemoveIndexSignature<T> = {[key in keyof T as string extends key ? never : number extends key ? never : symbol extends key ? never : key]: T[key]}
type RemoveIndexSignature<T> = {
  [key in keyof T as {} extends Record<key, any> ? never : key]: T[key]
}
type a = RemoveIndexSignature<Foo>
type b = RemoveIndexSignature<Bar>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. type RemoveIndexSignature<T> = {[key in keyof T]: key extends string | number | symbol ? never : T[key]
=> Index Signature, foo() 모두 never로 추론됨
=> Index Signature, foo() 분리 필요

2. type RemoveIndexSignature<T> = {[key in keyof T]: string | number | symbol extends key ? never : T[key]}
=> 4번 예제는 풀리지만 인덱스 시그니처도 조건문을 통과하지 않아 never로 사라지지 않게 됨
=> key를 없애기

3. (정답) type RemoveIndexSignature<T> = {[key in keyof T as string extends key ? never : number extends key ? never : symbol extends key ? never : key]: T[key]}

3-1. (정답)
type RemoveIndexSignature<T> = {
  [key in keyof T as {} extends Record<key, any> ? never : key]: T[key]
}
=> 인덱스 시그니처는 빈 객체를 포함한다
=> {} extends Record<key, any>가 true
*/
