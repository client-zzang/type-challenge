/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal

  ### Question

  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.

  > View on GitHub: https://tsch.js.org/10969
*/

/* _____________ Your Code Here _____________ */

type IsAllZero<T extends string> = T extends `${infer F}${infer R}`
  ? F extends 0
    ? IsAllZero<R>
    : false
  : true

type Integer<T extends number> = `${T}` extends `${infer F}.${infer R}`
  ? F extends 0
    ? never
    : IsAllZero<R> extends true
      ? F
      : never
  : [number] extends [T]
    ? never
    : T

// never가 되는 경우
// 1. 0으로 시작하는 경우
// 2. .뒤에 모두 0이 아닌 경우
// 3. number 타입인 경우

type a = Integer<1>
type b = Integer<1.1>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.00>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10969/answer
  > View solutions: https://tsch.js.org/10969/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. typeof x (number)가 통과가 안된다.

type IsAllZero<T extends string> = T extends `${infer F}${infer R}`
  ? F extends 0
    ? IsAllZero<R>
    : false
  : true

type Integer<T extends number> = `${T}` extends `${infer F}.${infer R}`
  ? F extends 0
    ? never
    : IsAllZero<R> extends true
      ? F
      : never
  : T

2. [number] extends [T] 비교 추가 => 정답!!

type Integer<T extends number> = `${T}` extends `${infer F}.${infer R}`
  ? F extends 0
    ? never
    : IsAllZero<R> extends true
      ? F
      : never
  : [number] extends [T]
    ? never
    : T


*/
