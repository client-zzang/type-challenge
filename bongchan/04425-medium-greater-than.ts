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

// 🚀 시작: 2026-08-08 15:30
// ✅ 종료: 2026-08-08 16:26
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 각 숫자보다 큰 수를 유니온으로 갖는 type Greater 추가

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

    2. 재귀를 돌며 앞에서부터 값을 비교하기 위한 배열화

      type StringToArray<T extends string> = T extends `${infer F}${infer R}`
        ? [F, ...StringToArray<R>]
        : [];

      type GreaterThan<
        T extends number,
        U extends number,
        TArray = StringToArray<`${T}`>,
        UArray = StringToArray<`${U}`>,
        Index extends Array<number> = [],
      > = any;

    3. 반환 제네릭을 추가하여 재귀를 돌 때 직전의 비교값을 반환

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

    type GreaterThan<
      T extends number,
      U extends number,
      Index extends Array<number> = [],
      R extends boolean = true,
      TArray extends Array<string> = StringToArray<`${T}`>,
      UArray extends Array<string> = StringToArray<`${U}`>,
    > = TArray[Index['length']] extends GreaterUnits
      ? UArray[Index['length']] extends GreaterUnits
        ? TArray[Index['length']] extends Greater[UArray[Index['length']]]
          ? GreaterThan<T, U, [...Index, 1]>
          : GreaterThan<T, U, [...Index, 1], false>
        : GreaterThan<T, U, [...Index, 1], true>
      : UArray[Index['length']] extends GreaterUnits
        ? GreaterThan<T, U, [...Index, 1], false>
        : R;

  😆 배움
    - 다른 풀이

      // Iterate over the digits of T and U. If some digit of U is greater - remember it in Res.
      // If both T and U appeared to be the same length - return Res.
      // If not - return true for longer T and false for longer U
      type GreaterThan<
        T extends number | string,
        U extends number | string,
        Res = false,
      > = `${T}` extends `${infer TF}${infer TR}`
        ? `${U}` extends `${infer UF}${infer UR}`
          ? [Res, TF & UF] extends [false, never] // Res == false and TF != UF
            ? GreaterThan<
                TR,
                UR,
                '0123456789' extends `${string}${TF}${string}${UF}${string}`
                  ? false
                  : true
              >
            : GreaterThan<TR, UR, Res>
          : true
        : U extends ''
          ? Res
          : false;

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

type GreaterThan<
  T extends number,
  U extends number,
  Index extends Array<number> = [],
  R extends boolean = true,
  TArray extends Array<string> = StringToArray<`${T}`>,
  UArray extends Array<string> = StringToArray<`${U}`>,
> = TArray[Index['length']] extends GreaterUnits
  ? UArray[Index['length']] extends GreaterUnits
    ? TArray[Index['length']] extends Greater[UArray[Index['length']]]
      ? GreaterThan<T, U, [...Index, 1]>
      : GreaterThan<T, U, [...Index, 1], false>
    : GreaterThan<T, U, [...Index, 1], true>
  : UArray[Index['length']] extends GreaterUnits
    ? GreaterThan<T, U, [...Index, 1], false>
    : R;

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
