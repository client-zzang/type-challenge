/*
  34007 - Compare Array Length
  -------
  by alviner (@ScriptBloom) #medium #recursion #array

  ### Question

  Implement `CompareArrayLength` to compare two array length(T & U).

  If length of T array is greater than U, return 1;
  If length of U array is greater than T, return -1;
  If length of T array is equal to U, return 0.

  > View on GitHub: https://tsch.js.org/34007
*/

// 🚀 시작: 2026-11-25 19:24
// ✅ 종료: 2026-11-25 19:54
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 튜플의 length 프로퍼티로 길이가 같을 때 조기 반환

        type CompareArrayLength<
          T extends any[],
          U extends any[],
        > = T['length'] extends U['length'] ? 0 : 'TODO';

      🔵 1-2. IsEmptyArray 유틸 함수로 분기 처리

        type UnShift<T extends any[]> = T extends [any, ...infer Tail] ? [...Tail] : T;

        type IsEmptyArray<T extends any[]> = T extends [any, ...any] ? false : true;

        type CompareArrayLength<
          T extends any[],
          U extends any[],
        > = T['length'] extends U['length']
          ? 0
          : IsEmptyArray<T> extends true
            ? -1
            : IsEmptyArray<U> extends true
              ? 1
              : CompareArrayLength<UnShift<T>, UnShift<U>>;

  😆 배움
    - 다른 풀이

      - keyof T에는 인덱스 키가 문자열 리터럴로 들어 있음("0" ~ "length - 1")
      - `${U['length']}`가 keyof T에 포함되면 T에 그 인덱스가 있다는 뜻이므로 U의 길이 < T의 길이 → 1
      - 길이가 같은 경우는 첫 조건에서 걸러졌으므로 나머지는 U의 길이 > T의 길이 → -1


      type CompareArrayLength<
        T extends unknown[],
        U extends unknown[],
      > = T['length'] extends U['length']
        ? 0
        : `${U['length']}` extends keyof T
          ? 1
          : -1;

*/

/* _____________ Your Code Here _____________ */

type UnShift<T extends any[]> = T extends [any, ...infer Tail] ? [...Tail] : T;

type IsEmptyArray<T extends any[]> = T extends [any, ...any] ? false : true;

type CompareArrayLength<
  T extends any[],
  U extends any[],
> = T['length'] extends U['length']
  ? 0
  : IsEmptyArray<T> extends true
    ? -1
    : IsEmptyArray<U> extends true
      ? 1
      : CompareArrayLength<UnShift<T>, UnShift<U>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CompareArrayLength<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength<[], []>, 0>>,
  Expect<Equal<CompareArrayLength<[1, 2, 3], [4, 5, 6]>, 0>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/34007/answer
  > View solutions: https://tsch.js.org/34007/solutions
  > More Challenges: https://tsch.js.org
*/
