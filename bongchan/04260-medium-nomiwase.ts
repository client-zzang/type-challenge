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

// 🚀 시작: 2026-08-05 23:33
// ✅ 종료: 2026-08-05 00:03
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 제네릭 S의 문자열을 유니온으로 쪼개기

      type StringToUnion<S> = S extends `${infer F}${infer R}`
        ? F | StringToUnion<R>
        : never;

      type AllCombinations<S, U = StringToUnion<S>> = S extends '' ? '' : U;

      - 이 이후로 접근을 못 함

  😆 배움
    - 다른 풀이

      type StringToUnion<S> = S extends `${infer F}${infer R}`
        ? F | StringToUnion<R>
        : never;

      type AllCombinations<
        STR extends string,
        S extends string = StringToUnion<STR>,
      > = [S] extends [never]
        ? ''
        : '' | { [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}` }[S];

*/

/* _____________ Your Code Here _____________ */

type StringToUnion<S> = S extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;

type AllCombinations<
  STR extends string,
  S extends string = StringToUnion<STR>,
> = [S] extends [never]
  ? ''
  : '' | { [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}` }[S];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<
    Equal<
      AllCombinations<'ABC'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'AB'
      | 'AC'
      | 'BA'
      | 'BC'
      | 'CA'
      | 'CB'
      | 'ABC'
      | 'ACB'
      | 'BAC'
      | 'BCA'
      | 'CAB'
      | 'CBA'
    >
  >,
  Expect<
    Equal<
      AllCombinations<'ABCD'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'AB'
      | 'AC'
      | 'AD'
      | 'BA'
      | 'BC'
      | 'BD'
      | 'CA'
      | 'CB'
      | 'CD'
      | 'DA'
      | 'DB'
      | 'DC'
      | 'ABC'
      | 'ABD'
      | 'ACB'
      | 'ACD'
      | 'ADB'
      | 'ADC'
      | 'BAC'
      | 'BAD'
      | 'BCA'
      | 'BCD'
      | 'BDA'
      | 'BDC'
      | 'CAB'
      | 'CAD'
      | 'CBA'
      | 'CBD'
      | 'CDA'
      | 'CDB'
      | 'DAB'
      | 'DAC'
      | 'DBA'
      | 'DBC'
      | 'DCA'
      | 'DCB'
      | 'ABCD'
      | 'ABDC'
      | 'ACBD'
      | 'ACDB'
      | 'ADBC'
      | 'ADCB'
      | 'BACD'
      | 'BADC'
      | 'BCAD'
      | 'BCDA'
      | 'BDAC'
      | 'BDCA'
      | 'CABD'
      | 'CADB'
      | 'CBAD'
      | 'CBDA'
      | 'CDAB'
      | 'CDBA'
      | 'DABC'
      | 'DACB'
      | 'DBAC'
      | 'DBCA'
      | 'DCAB'
      | 'DCBA'
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4260/answer
  > View solutions: https://tsch.js.org/4260/solutions
  > More Challenges: https://tsch.js.org
*/
