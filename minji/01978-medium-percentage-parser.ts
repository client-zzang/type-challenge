/*
  1978 - Percentage Parser
  -------
  by SSShuai1999 (@SSShuai1999) #medium #template-literal

  ### Question

  Implement PercentageParser<T extends string>.
  According to the `/^(\+|\-)?(\d*)?(\%)?$/` regularity to match T and get three matches.

  The structure should be: [`plus or minus`, `number`, `unit`]
  If it is not captured, the default is an empty string.

  For example:

  ```ts
  type PString1 = ""
  type PString2 = "+85%"
  type PString3 = "-85%"
  type PString4 = "85%"
  type PString5 = "85"

  type R1 = PercentageParser<PString1> // expected ['', '', '']
  type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
  type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
  type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
  type R5 = PercentageParser<PString5> // expected ["", "85", ""]
  ```

  > View on GitHub: https://tsch.js.org/1978
*/

/* _____________ Your Code Here _____________ */

type returnArray<A> = A extends `${infer Num}%` ? [Num, '%'] : [A, '']
type PercentageParser<A extends string> = A extends `${infer First extends '+' | '-'}${infer Rest}` ? [First, ...returnArray<Rest>] : ['', ...returnArray<A>]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1978/answer
  > View solutions: https://tsch.js.org/1978/solutions
  > More Challenges: https://tsch.js.org
*/

/**
접근
1. type PercentageParser<A extends string, C extends string = ""> = A extends `${infer First}${infer Rest}` ? First extends `/^(\+|\-)?(\d*)?(\%)?$/` ? [First, ...PercentageParser<Rest>] : [...PercentageParser<A, `${C}${First}`>] : [C]
=> 무한 루프에 빠지는 중
=> 원인 1: [...PercentageParser<A, `${C}${First}`>] 여기서 A가 아니라 Rest를 넘겨줘야 한다. First는 이미 두번째 제네릭 자리에 넘겨주고 있기 때문
원인 2: 정규식을 바꿔보기

2. type PercentageParser<A extends string, C extends string = ""> = A extends `${infer First}${infer Rest}` ? First extends "+" | "-" | "%" ? [First, ...PercentageParser<Rest>] : [...PercentageParser<Rest, `${C}${First}`>] : [C]
=> PercentageParser<'+100'>가 ["+", "100"]로 뜸. 공백이 포함 안됨
=> 마지막 문자 %로 분해해보기

3. type PercentageParser<A extends string, C extends string = ""> = A extends `${infer First extends '+' | '-'}${infer Rest}` ? [First, ...PercentageParser<Rest, C>] : A extends `${infer Num}%` ? ['', Num, '%'] : [A, '']
=> +, 100, %의 +와 100 사이 공백이 들어가게 됨
=> 필요없는 C 제거하기

4. type returnArray<A> = A extends `${infer Num}%` ? [Num, '%'] : [A, '']
type PercentageParser<A extends string> = A extends `${infer First extends '+' | '-'}${infer Rest}` ? [First, ...PercentageParser<Rest>] : ['', ...returnArray<A>]
=> 앞에 부호 붙은 케이스 대응이 안된다.
=> 재귀를 returnArray로 돌기

 */
