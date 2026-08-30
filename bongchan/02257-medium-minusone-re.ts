/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

// 🚀 시작: 2026-08-30 11:46
// ✅ 종료: 2026-08-30 12:33
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. infer로 값을 꺼내기 위해서 number를 string 타입으로 변환

      type ToString<T> = T extends number ? `${T}` : T;

      type MinusOne<T extends number> = ToString<T>;

    2. 0의 자리부터 마이너스 하기 위해서 Reverse type 구현

      type Reverse<T> = T extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : '';

      type MinusOne<T extends number> = Reverse<ToString<T>>;

    3. 제일 앞자리의 숫자가 0이면 재귀 돌면서 다음 숫자를 1 빼주기

      type MinusOneMapper = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];

      type MinusOne<T extends number> = Reverse<
        Reverse<
          ToString<T>
        > extends `${infer F extends number}${infer R extends number}`
          ? F extends '0'
            ? `${MinusOneMapper[F]}${MinusOne<R>}`
            : `${MinusOneMapper[F]}${R}`
          : ''
      >;

    4. 자리수가 줄어들면서 생긴 앞자리 0 제거

      type RemoveLeadingZeros<T extends string> = T extends '0'
        ? T
        : T extends `0${infer Digit}`
          ? RemoveLeadingZeros<Digit>
          : T;

    5. 1 뺐으면 다시 number 타입으로 변환

      type ToNumber<T extends string> = T extends `${infer Digit extends number}`
        ? Digit
        : never;

    6. 최종

      type ToString<T> = T extends number ? `${T}` : T;

      type Reverse<T> = T extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : '';

      type MinusOneMapper = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];

      type ToNumber<T extends string> = T extends `${infer Digit extends number}`
        ? Digit
        : never;

      type MinusOneImpl<T extends string> =
        T extends `${infer F extends number}${infer R}`
          ? F extends 0
            ? `${MinusOneMapper[F]}${MinusOneImpl<R>}`
            : `${MinusOneMapper[F]}${R}`
          : never;

      type RemoveLeadingZeros<T extends string> = T extends '0'
        ? T
        : T extends `0${infer Digit}`
          ? RemoveLeadingZeros<Digit>
          : T;

      type MinusOne<T extends number> = ToNumber<
        RemoveLeadingZeros<Reverse<MinusOneImpl<Reverse<ToString<T>>>>>
      >;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type ToString<T> = T extends number ? `${T}` : T;

type Reverse<T> = T extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : '';

type MinusOneMapper = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];

type ToNumber<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never;

type MinusOneImpl<T extends string> =
  T extends `${infer F extends number}${infer R}`
    ? F extends 0
      ? `${MinusOneMapper[F]}${MinusOneImpl<R>}`
      : `${MinusOneMapper[F]}${R}`
    : never;

type RemoveLeadingZeros<T extends string> = T extends '0'
  ? T
  : T extends `0${infer Digit}`
    ? RemoveLeadingZeros<Digit>
    : T;

type MinusOne<T extends number> = ToNumber<
  RemoveLeadingZeros<Reverse<MinusOneImpl<Reverse<ToString<T>>>>>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
