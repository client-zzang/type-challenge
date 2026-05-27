/*
  119 - ReplaceAll
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `ReplaceAll<S, From, To>` which replace the all the substring `From` with `To` in the given string `S`

  For example

  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
  ```

  > View on GitHub: https://tsch.js.org/119
*/

/* _____________ Your Code Here _____________ */

type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer Rest}${From}${infer Rest2}` ? `${Rest}${To}${ReplaceAll<Rest2, From, To>}` : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/119/answer
  > View solutions: https://tsch.js.org/119/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer Rest}${From}${infer Rest2}` ? ReplaceAll<`${Rest}${To}${Rest2}`, From, To> : S
=> 미통과:  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
           Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
fbarfbar가 fobarfobar로 되어야 함.
fobrfobar가 foborfobar로 되어야 함
- 재귀적으로 돌면서 foob -> fob -> fb가 됨

2. type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer Rest}${From}${infer Rest2}` ? `${Rest}${ReplaceAll<`${To}${Rest2}`, From, To>}` : S
=> 미통과: Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>
fobrfobar가 foborfobar로 되어야 함
- 해결 방법: 재귀로 Rest2만 넘기자

정답: type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer Rest}${From}${infer Rest2}` ? `${Rest}${To}${ReplaceAll<Rest2, From, To>}` : S
*/
