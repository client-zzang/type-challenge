/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #medium #arguments

  ### Question

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

  > View on GitHub: https://tsch.js.org/3196
*/

/* _____________ Your Code Here _____________ */

type Reverse<T> = T extends [infer First, ...infer Rest] ? [...Reverse<Rest>, First] : T
type FlipArguments<T extends Function> = T extends (...args: infer A) => infer B ? A extends any[] ? (...args: Reverse<A>) => B : never : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3196/answer
  > View solutions: https://tsch.js.org/3196/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 리턴문에서 args를 펼칠 땐 동일하게 ...args 사용하기
type FlipArguments<T extends Function> = T extends (...args: infer A) => infer B ? (...args: A) => B : false
=> 일단 이게 기본 형태 - 어떻게 뒤집지?

A 타입 = [arg0: string, arg1: number, arg2: boolean]
A[0] = string
A[1] = number

2. 각 key - value 매핑하기
type FlipArguments<T extends Function> = T extends (...args: infer A) => infer B ? A extends [infer First, ...infer Rest] ? (...args: {[key in keyof A]: First}) => B : never : false
=> string (First)로만 매핑된다 
=> 앞 문제의 reverse를 활용해볼까

3. Reverse
type Reverse<T> = T extends [infer First, ...infer Rest] ? [...Reverse<Rest>, First] : T
type FlipArguments<T extends Function> = T extends (...args: infer A) => infer B ? A extends any[] ? (...args: {[key in keyof A]: Reverse<A>}) => B : never : false
=> (arg0: [boolean, number, string], arg1: [boolean, number, string], arg2: [boolean, number, string]) => void이 됨
=> 튜플을 푸는 방법은?

4. 튜플 분해하기
type FlipArguments<T extends Function> = T extends (...args: infer A) => infer B ? A extends any[] ? (...args: {[key in keyof A]: Reverse<A>[number]}) => B : never : false
=> (arg0: string | number | boolean, arg1: string | number | boolean, arg2: string | number | boolean) => void 이 되는 문제. (분해가 아니라 유니온으로 합쳐짐)

5. (정답 확인) Reverse<A>로 이미 튜플이 파라미터로 펼쳐지니 (...args: Reverse<A>)가 정답
*/
