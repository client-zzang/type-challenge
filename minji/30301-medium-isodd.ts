/*
  30301 - IsOdd
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  return true is a number is odd

  > View on GitHub: https://tsch.js.org/30301
*/

/* _____________ Your Code Here _____________ */

type OddNum = '1' | '3' | '5' | '7' | '9'

type IsOdd<T extends number> = `${T}` extends `${string}.${string}`
  ? false
  : `${T}` extends `${string}e+${string}`
    ? false
    : `${T}` extends `${string}${OddNum}`
      ? true
      : false

type a = IsOdd<3e23>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<5>, true>>,
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<2.3>, false>>,
  Expect<Equal<IsOdd<3e23>, false>>,
  Expect<Equal<IsOdd<3e0>, true>>,
  Expect<Equal<IsOdd<number>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30301/answer
  > View solutions: https://tsch.js.org/30301/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 재귀로 마지막 글자 추출 > 비교 ----> 한 글자의 숫자가 처리가 안되는 문제!
type OddNum = '1' | '3' | '5' | '7' | '9'

type GetLastWord<N extends string> = N extends `${string}${infer R}`
  ? GetLastWord<R>
  : N

type IsOdd<T extends number> = `${T}` extends `${string}.${string}`
  ? false
  : GetLastWord<`${T}`> extends OddNum
    ? true
    : false


2. 단순하게 접근

type OddNum = '1' | '3' | '5' | '7' | '9'
type IsOdd<T extends number> = `${T}` extends `${string}.${string}`
  ? false
  : `${T}` extends `${string}${OddNum}`
    ? true
    : false

=> 3e23이 안풀린다 찾아보니 `${T}`로 변환하면 3e+23가 된다고 함!!

*/
