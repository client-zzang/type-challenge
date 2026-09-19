/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

// 🚀 시작: 2026-09-19 23:12
// ✅ 종료: 2026-09-19 23:21
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 현재 인덱스를 저장할 Index 제네릭 추가

      type FirstUniqueCharIndex<T extends string, Index extends unknown[] = []> = any;

    2. string 제네릭 T 빈 값이면 -1 반환

      type FirstUniqueCharIndex<
        T extends string,
        Index extends unknown[] = [],
      > = T extends `${infer F}${infer R}` ? true : -1;

    3. 문자열의 제일 앞문자를 꺼내 나머지 문자열에서 찾기

      type FirstUniqueCharIndex<
        T extends string,
        Index extends unknown[] = [],
      > = T extends `${infer F}${infer R}`
        ? R extends `${string}${F}${string}`
          ? FirstUniqueCharIndex<R, [...Index, 1]>
          : Index['length']
        : -1;
      
      - ❌ 아래 두 케이스에서 실패
        - 문자열에서 앞문자를 하나씩 제거해서 중복이지만 혼자 남을 때 유니크로 취급되어 에러 발생
        - Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>
        - Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>

    4. 중복으로 넘어갈 때 해당 값이 중복값임을 증명할 제네릭 U 추가

      type FirstUniqueCharIndex<
        T extends string,
        Index extends unknown[] = [],
        U = never,
      > = T extends `${infer F}${infer R}`
        ? R extends `${string}${F}${string}`
          ? FirstUniqueCharIndex<R, [...Index, 1], [U] extends [never] ? F : U | F>
          : F extends U
            ? -1
            : Index['length']
        : -1;

  😆 배움
    - 다른 풀이
      - 인덱스 역할 + 중복 문자 역할을 하나의 제네릭이 담당
      - 중복 후보군에 속한지 먼저 판단하고 남은 문자열에서 중복값이 있는지 판단

      type FirstUniqueCharIndex<
        T extends string,
        _Acc extends string[] = [],
      > = T extends ''
        ? -1
        : T extends `${infer Head}${infer Rest}`
          ? Head extends _Acc[number]
            ? FirstUniqueCharIndex<Rest, [..._Acc, Head]>
            : Rest extends `${string}${Head}${string}`
              ? FirstUniqueCharIndex<Rest, [..._Acc, Head]>
              : _Acc['length']
          : never;

*/

/* _____________ Your Code Here _____________ */

type FirstUniqueCharIndex<
  T extends string,
  Index extends unknown[] = [],
  U = never,
> = T extends `${infer F}${infer R}`
  ? R extends `${string}${F}${string}`
    ? FirstUniqueCharIndex<R, [...Index, 1], [U] extends [never] ? F : U | F>
    : F extends U
      ? -1
      : Index['length']
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
