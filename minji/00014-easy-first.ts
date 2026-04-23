/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array

  ### Question

  Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.

  For example:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

// type First<T extends any[]> = T extends [] ? never: T[0]
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
];

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14/answer
  > View solutions: https://tsch.js.org/14/solutions
  > More Challenges: https://tsch.js.org
*/

/*
느낀 점
- 세 번째 예제의 never가 도저히 안풀려서 답을 참고했다😭
- 일단 T extends any[]는 T의 elements에 ArrayElement type이 올 수 있다는 뜻 (복습)

배운 점
- T['length'] 형태로 접근이 가능하다. extends가 동등 비교 === 목적으로 쓰이기도 한다.
- 조건부 타입: """T extends A ? B : C""" => T가 A 타입에 속한다면 ? B 타입을, 아니라면 : C 타입으로 정의.
- infer: 타입스크립트 infer는 조건부 타입에서 미리 정의되지 않은 타입을 유연하게 정의할 수 있게 도와주는 문법. 항상 조건부 타입과 함께 사용된다.
  - ex. T extends (infer A)[] ? A : T => T에 A 타입이 오면 A 타입으로, A 타입이 아니면 T 타입으로 반환한다는 의미
  - https://joshua1988.github.io/ts/usage/infer.html#infer-%EC%98%88%EC%8B%9C
*/
