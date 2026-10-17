/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > View on GitHub: https://tsch.js.org/4471
*/

// 🚀 시작: 2026-10-17 12:52
// ✅ 종료: 2026-10-17 13:04
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 제네릭 T, U를 unknown[]으로 타입 좁히기

        type Zip<T extends unknown[], U extends unknown[]> = any;

      🔵 1-2. 제네릭 T, U를 infer 를 활용하여 첫 번재 요소와 나머지 요소를 분리

        type Zip<T extends unknown[], U extends unknown[]> = T extends [
          infer THead,
          ...infer TTail,
        ]
          ? U extends [infer UHead, ...infer UTail]
            ? true
            : false
          : false;

      🔵 1-3. T의 첫 번째 요소, U의 첫 번째 요소 중에서 하나라도 비어있으면 병합을 생략하고 재귀

        type Zip<T extends unknown[], U extends unknown[]> = T extends [
          infer THead,
          ...infer TTail,
        ]
          ? U extends [infer UHead, ...infer UTail]
            ? [[THead, UHead], ...Zip<TTail, UTail>]
            : []
          : [];

  😆 배움
    1. 

      type Zip<T extends any[], U extends any[]> = [T, U] extends [
        [infer L, ...infer RestT],
        [infer R, ...infer RestU],
      ]
        ? [[L, R], ...Zip<RestT, RestU>]
        : [];

*/

/* _____________ Your Code Here _____________ */

type Zip<T extends unknown[], U extends unknown[]> = T extends [
  infer THead,
  ...infer TTail,
]
  ? U extends [infer UHead, ...infer UTail]
    ? [[THead, UHead], ...Zip<TTail, UTail>]
    : []
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4471/answer
  > View solutions: https://tsch.js.org/4471/solutions
  > More Challenges: https://tsch.js.org
*/
