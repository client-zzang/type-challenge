/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #medium #template-literal #infer #union

  ### Question

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > View on GitHub: https://tsch.js.org/4260
*/

/* _____________ Your Code Here _____________ */
type StringToUnion<S> = S extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : S
type AllCombinations<S extends string, U extends string = StringToUnion<S>> = S extends '' ? S : '' | {[key in U]: `${key}${AllCombinations<S, Exclude<U, key>>}`}[U]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4260/answer
  > View solutions: https://tsch.js.org/4260/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 문자열 분리 => 다음으로 넘겨주는 문자와 재귀로 합치기
type AllCombinations<S extends string, C extends string = ''> = S extends '' ? '' : S extends `${infer First}${infer Rest}` ? First | AllCombinations<Rest, `${C}${First}`> | AllCombinations<Rest, C> : C
=> 합치는 게 안된다
AllCombinations<'AB'>가 "" | "A" | "B"로 나옴

2. ''인 경우 C를 리턴하도록 하기
type AllCombinations<S extends string, C extends string = ''> = S extends '' ? C : S extends `${infer First}${infer Rest}` ? First | C | AllCombinations<Rest, `${C}${First}`> | AllCombinations<Rest, C> | AllCombinations<Rest, First> : ''
=> BA 케이스가 안된다 ("" | "A" | "AB" | "B")

3. 세번째 예제는 해결, 이번엔 네번째 예제가 안풀린다
type AllCombinations<S extends string, C extends string = ''> = S extends '' ? C : S extends `${infer First}${infer Rest}` ? First | C | AllCombinations<Rest, `${C}${First}`> | AllCombinations<Rest, `${First}${C}`> | AllCombinations<Rest, C> | AllCombinations<Rest, First> : ''
=> 문자열 3개인 케이스 일부 대응이 안되었음

4. 유니온으로 접근해보기
(정답)
type StringToUnion<S> = S extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : S
type AllCombinations<S extends string, U extends string = StringToUnion<S>> = S extends '' ? S : '' | {[key in U]: `${key}${AllCombinations<S, Exclude<U, key>>}`}[U]
=> 왜 U extends string이지?
*/
