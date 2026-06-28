/*
  2688 - StartsWith
  -------
  by jiangshan (@jiangshanmeta) #medium #template-literal

  ### Question

  Implement `StartsWith<T, U>` which takes two exact string types and returns whether `T` starts with `U`

  For example

  ```typescript
  type a = StartsWith<'abc', 'ac'> // expected to be false
  type b = StartsWith<'abc', 'ab'> // expected to be true
  type c = StartsWith<'abc', 'abcd'> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/2688
*/

/* _____________ Your Code Here _____________ */

type StartsWith<T extends string, U extends string> = U extends `${infer Fu}${infer Ru}`
  ?  T extends `${infer F}${infer R}` 
    ? F extends Fu 
      ? StartsWith<R, Ru> : false 
    : T extends U 
      ? true 
    : false
  : true

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2688/answer
  > View solutions: https://tsch.js.org/2688/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. type StartsWith<T extends string, U extends string> = T extends `${infer F}${infer R}` 
  ? U extends `${infer Fu}${infer Ru}` 
    ? F extends Fu 
      ? StartsWith<R, Ru> : false 
    : F extends U 
      ? true 
    : false
  : true
=> StartsWith<'abc', 'ab'>가 false가 나온다
=> 순회 기준을 T가 아니라 U로 잡아보기
*/
