/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > View on GitHub: https://tsch.js.org/5317
*/

// 🚀 시작: 2026-08-30 12:37
// ✅ 종료: 2026-08-30 12:53
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 뒤에서부터 검사를 하기 위해서 [...infer R, infer L] 구조로 타입 좁히기

      type LastIndexOf<
        T extends unknown[],
        U,
      > = T extends [...infer R, infer L] ? true : false;

    2. 찾은 요소의 index를 계산할 Index 제네릭 추가

      type LastIndexOf<
        T extends unknown[],
        U,
        Index extends unknown[] = [], // ✅ 기본값을 넣어서 에러가 발생하지 않게 하기
      > = T extends [...infer R, infer L] ? true : false;

    3. 재귀를 다 돌았다는 의미는 배열에 요소가 없다는 의미로 -1 반환

      type LastIndexOf<
        T extends unknown[],
        U,
        Index extends unknown[] = [],
      > = T extends [...infer R, infer L] ? true : -1;

    4. infer L과 제니릭 U가 같다면 Index의 길이를 반환

      type LastIndexOf<
        T extends unknown[],
        U,
        Index extends unknown[] = [],
      > = T extends [...infer R, infer L]
        ? Equal<L, U> extends true
          ? Index['length']
          : false
        : -1;

    5. Index 제네릭을 계산하는 GenerateIndex
      - 뒤에서부터 돌기 때문에 Index 제네릭을 빈배열로 시작하면 index가 제대로 나오지 않음
      - 제네릭 T의 요소를 채우고 요소를 하나씩 지우는 방식으로 거꾸로 index를 탐색해보자

      type GenerateIndex<T extends unknown[]> = T extends [any, ...infer Rest]
        ? Rest
        : [];

      type LastIndexOf<
        T extends unknown[],
        U,
        Index extends unknown[] = GenerateIndex<T>, // ✅ index는 0부터 시작하기 때문에 요소 하나를 지우고 시작해야함
      > = T extends [...infer R, infer L]
        ? Equal<L, U> extends true
          ? Index['length']
          : LastIndexOf<R, U, GenerateIndex<Index>> // ✅ 재귀를 돌때마다 요소를 하나씩 지워서 index를 거꾸로 맞춰나감
        : -1;

  😆 배움
    1. LastIndexOf에서 애초에 요소 하나를 제외한 Rest를 들고 있기 때문에 GenerateIndex 할 필요 없다

      type LastIndexOf<T, U> = T extends [...infer Rest, infer F] 
        ? Equal<F, U> extends true
          ? Rest['length'] 
          : LastIndexOf<Rest, U>
        : -1

*/

/* _____________ Your Code Here _____________ */

type GenerateIndex<T extends unknown[]> = T extends [any, ...infer Rest]
  ? Rest
  : [];

type LastIndexOf<
  T extends unknown[],
  U,
  Index extends unknown[] = GenerateIndex<T>,
> = T extends [...infer R, infer L]
  ? Equal<L, U> extends true
    ? Index['length']
    : LastIndexOf<R, U, GenerateIndex<Index>>
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5317/answer
  > View solutions: https://tsch.js.org/5317/solutions
  > More Challenges: https://tsch.js.org
*/
