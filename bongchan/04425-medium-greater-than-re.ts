/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

// 🚀 시작: 2026-10-11 21:02
// ✅ 종료: 2026-10-11 21:35
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. number를 string으로 변환하여 앞자리부터 검사

      type GreaterThan<
        T extends number,
        U extends number,
        TS extends string = `${T}`,
        US extends string = `${U}`,
      > = any;

    2. T 12, U 2 값이라고 가정
      - 

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Greater = {
  '0': '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  '1': '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  '2': '3' | '4' | '5' | '6' | '7' | '8' | '9';
  '3': '4' | '5' | '6' | '7' | '8' | '9';
  '4': '5' | '6' | '7' | '8' | '9';
  '5': '6' | '7' | '8' | '9';
  '6': '7' | '8' | '9';
  '7': '8' | '9';
  '8': '9';
  '9': never;
};

type GreaterUnits = keyof Greater;

type StringToArray<T extends string> = T extends `${infer F}${infer R}`
  ? [F, ...StringToArray<R>]
  : [];

type IsLonger<A extends Array<string>, B extends Array<string>> = A extends [
  string,
  ...infer AR extends Array<string>,
]
  ? B extends [string, ...infer BR extends Array<string>]
    ? IsLonger<AR, BR>
    : true
  : false;

type GreaterThan<
  T extends number,
  U extends number,
  Index extends Array<number> = [],
  TArray extends Array<string> = StringToArray<`${T}`>,
  UArray extends Array<string> = StringToArray<`${U}`>,
> = TArray['length'] extends UArray['length']
  ? TArray[Index['length']] extends GreaterUnits
    ? UArray[Index['length']] extends GreaterUnits
      ? TArray[Index['length']] extends UArray[Index['length']]
        ? GreaterThan<T, U, [...Index, 1]>
        : TArray[Index['length']] extends Greater[UArray[Index['length']]]
          ? true
          : false
      : false
    : false
  : IsLonger<TArray, UArray>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
