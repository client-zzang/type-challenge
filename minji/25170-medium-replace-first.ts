/*
  25170 - Replace First
  -------
  by George Flinn (@ProjectFlinn) #medium

  ### Question

  Implement the type ReplaceFirst<T, S, R> which will replace the first occurrence of S in a tuple T with R. If no such S exists in T, the result should be T.

  > View on GitHub: https://tsch.js.org/25170
*/

/* _____________ Your Code Here _____________ */

type ReplaceFirst<T extends readonly unknown[], S, R, Res extends unknown[] = []> = T extends [infer F, ...infer Rest]
  ? [F] extends [S]
    ? ReplaceFirst<Rest, never, R, [...Res, R]> // 첫 번째로 일치하는 것만 바꾸기 위해 S 대신 never를 넘김 
    : ReplaceFirst<Rest, S, R, [...Res, F]>
  : Res

type a = ReplaceFirst<[true, true, true], true, false>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceFirst<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
  Expect<Equal<ReplaceFirst<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
  Expect<Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]>>,
  Expect<Equal<ReplaceFirst<[string, boolean, number], boolean, string>, [string, string, number]>>,
  Expect<Equal<ReplaceFirst<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
  Expect<Equal<ReplaceFirst<['six', 'eight', 'ten'], 'eleven', 'twelve'>, ['six', 'eight', 'ten']>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/25170/answer
  > View solutions: https://tsch.js.org/25170/solutions
  > More Challenges: https://tsch.js.org
*/
