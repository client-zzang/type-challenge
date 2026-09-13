/*
  8767 - Combination
  -------
  by Homyee King (@HomyeeKing) #medium #array #application #string

  ### Question

  Given an array of strings, do Permutation & Combination.
  It's also useful for the prop types like video [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)

  ```ts
  // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
  type Keys = Combination<['foo', 'bar', 'baz']>
  ```

  > View on GitHub: https://tsch.js.org/8767
*/

/* _____________ Your Code Here _____________ */

type Combination<T extends string[], A extends string = T[number], S extends string = A> = S extends S
  ? S | `${S} ${Combination<T, Exclude<A, S>>}`
  : never

type a = Combination<['foo', 'bar', 'baz']>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>, 'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
  Expect<Equal<Combination<['apple', 'banana', 'cherry']>, 'apple' | 'banana' | 'cherry' |
  'apple banana' | 'apple cherry' | 'banana apple' | 'banana cherry' | 'cherry apple' | 'cherry banana' |
  'apple banana cherry' | 'apple cherry banana' | 'banana apple cherry' | 'banana cherry apple' | 'cherry apple banana' | 'cherry banana apple'>>,
  Expect<Equal<Combination<['red', 'green', 'blue', 'yellow']>, 'red' | 'green' | 'blue' | 'yellow' |
  'red green' | 'red blue' | 'red yellow' | 'green red' | 'green blue' | 'green yellow' | 'blue red' | 'blue green' | 'blue yellow' | 'yellow red' | 'yellow green' | 'yellow blue' |
  'red green blue' | 'red green yellow' | 'red blue green' | 'red blue yellow' | 'red yellow green' | 'red yellow blue' |
  'green red blue' | 'green red yellow' | 'green blue red' | 'green blue yellow' | 'green yellow red' | 'green yellow blue' |
  'blue red green' | 'blue red yellow' | 'blue green red' | 'blue green yellow' | 'blue yellow red' | 'blue yellow green' |
  'yellow red green' | 'yellow red blue' | 'yellow green red' | 'yellow green blue' | 'yellow blue red' | 'yellow blue green' |
  'red green blue yellow' | 'red green yellow blue' | 'red blue green yellow' | 'red blue yellow green' | 'red yellow green blue' | 'red yellow blue green' |
  'green red blue yellow' | 'green red yellow blue' | 'green blue red yellow' | 'green blue yellow red' | 'green yellow red blue' | 'green yellow blue red' |
  'blue red green yellow' | 'blue red yellow green' | 'blue green red yellow' | 'blue green yellow red' | 'blue yellow red green' | 'blue yellow green red' |
  'yellow red green blue' | 'yellow red blue green' | 'yellow green red blue' | 'yellow green blue red' | 'yellow blue red green' | 'yellow blue green red'>>
  ,
  Expect<Equal<Combination<['one', 'two']>, 'one' | 'two' |
  'one two' | 'two one'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8767/answer
  > View solutions: https://tsch.js.org/8767/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근

1. 순서 상관 있는 조합 (순열인가?)
먼저 튜플을 유니온으로 바꾸기
type Combination<T extends string[], U extends string = T[number], S extends string = never> = T extends [infer F extends string, ...infer R extends string[]]
  ? F | Combination<R, R[number], `${S} ${F}`>
  : S
=> 무조건 순서가 앞에 것 먼저 나오게 되는 문제

2.튜플 대신 유니온을 순회하기 : S extends S

type Combination<T extends string[], A extends string = T[number], S extends string = A> = S extends S
  ? S | `${S} ${Combination<T, Exclude<A, S>, S extends S ? S : ''>}`
  : never
=> 무한 재귀 발생
=> 원인: 다음으로 넘겨주는 S extends S ? S : ''에서 S가 줄어들지 않음
=> 세 번째 인자는 항상 A를 따르도록 하기 (세번째 인자 넘겨주지 않기)

3. 세 번째 인자를 넘겨주지 않기

type Combination<T extends string[], A extends string = T[number], S extends string = A> = S extends S
  ? S | `${S} ${Combination<T, Exclude<A, S>>}`
  : never
*/
