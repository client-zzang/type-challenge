/*
  4803 - Trim Right
  -------
  by Yugang Cao (@Talljack) #medium #template-literal

  ### Question

  Implement `TrimRight<T>` which takes an exact string type and returns a new string with the whitespace ending removed.

  For example:

  ```ts
  type Trimmed = TrimRight<'   Hello World    '> // expected to be '   Hello World'
  ```

  > View on GitHub: https://tsch.js.org/4803
*/

/* _____________ Your Code Here _____________ */
type TrimRight<S extends string> = S extends `${infer Left}${' ' | '\n' | '\t'}` ? TrimRight<Left> : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4803/answer
  > View solutions: https://tsch.js.org/4803/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. Flag : 문자열을 만나 우측으로 접근했는지 여부
type TrimRight<S extends string, Flag extends boolean = false, C extends string = ''> = S extends `${infer F}${infer R}` 
  ? Flag extends true
    ? F extends ' '  // 이미 문자열을 만난 경우
      ? C
      : TrimRight<R, Flag, `${C}${F}`>
    : TrimRight<R, true, `${C}${F}`> // 문자열 아직 안만난 경우
  : C
=> 4, 5, 7 케이스 실패

2. (정답) 오른쪽 끝 문자를 확인하며 Left를 재귀로 돌리기
type TrimRight<S extends string> = S extends `${infer Left}${' ' | '\n' | '\t'}` ? TrimRight<Left> : S

*/
