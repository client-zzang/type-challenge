/*
  2693 - EndsWith
  -------
  by jiangshan (@jiangshanmeta) #medium #template-literal

  ### Question

  Implement `EndsWith<T, U>` which takes two exact string types and returns whether `T` ends with `U`

  For example:

  ```typescript
  type a = EndsWith<'abc', 'bc'> // expected to be true
  type b = EndsWith<'abc', 'abc'> // expected to be true
  type c = EndsWith<'abc', 'd'> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/2693
*/

/* _____________ Your Code Here _____________ */

type ReverseString<S extends string> = S extends `${infer F}${infer R}` ? `${ReverseString<R>}${F}` : S
type ReversedEndsWith<T extends string, U extends string> = U extends `${infer Fu}${infer Ru}` 
  ? T extends `${infer F}${infer R}`
    ? F extends Fu
      ? ReversedEndsWith<R, Ru>
      : false
    : T extends Fu
      ? true
      : false
  : true

type EndsWith<T extends string, U extends string> = ReversedEndsWith<ReverseString<T>, ReverseString<U>> 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
  Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
  Expect<Equal<EndsWith<'abc', ''>, true>>,
  Expect<Equal<EndsWith<'abc', ' '>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2693/answer
  > View solutions: https://tsch.js.org/2693/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
: 뒷 문자부터 봐야 하니 reverse로 풀기
*/
