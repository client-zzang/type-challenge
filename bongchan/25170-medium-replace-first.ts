/*
  25170 - Replace First
  -------
  by George Flinn (@ProjectFlinn) #medium

  ### Question

  Implement the type ReplaceFirst<T, S, R> which will replace the first occurrence of S in a tuple T with R. If no such S exists in T, the result should be T.

  > View on GitHub: https://tsch.js.org/25170
*/

// 🚀 시작: 2026-10-20 22:00
// ✅ 종료: 2026-10-20 22:09
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 제네릭 T를 제일 앞요소와 나머지 요소로 분리

        type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? 1
          : 0;

      🔵 1-2. 꺼낸 앞요소가 제네릭 S에 할당가능 여부에 따른 분기

        type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? Head extends S
            ? 1
            : 0
          : 0;

      🔵 1-3. 1-2의 분기에 따라서 Head를 R로 치환하여 재귀
      
        type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? Head extends S
            ? [R, ...ReplaceFirst<Tail, S, R>]
            : [Head, ...ReplaceFirst<Tail, S, R>]
          : [];

        - ❌ Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]> 해당 케이스 에러 발생

      🔵 1-4. Head를 R로 치환했다면 재귀를 돌 필요 없이 Tail을 그대로 풀어주기

        type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
          infer Head,
          ...infer Tail,
        ]
          ? Head extends S
            ? [R, ...Tail]
            : [Head, ...ReplaceFirst<Tail, S, R>]
          : [];

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends S
    ? [R, ...Tail]
    : [Head, ...ReplaceFirst<Tail, S, R>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ReplaceFirst<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
  Expect<Equal<ReplaceFirst<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
  Expect<
    Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]>
  >,
  Expect<
    Equal<
      ReplaceFirst<[string, boolean, number], boolean, string>,
      [string, string, number]
    >
  >,
  Expect<Equal<ReplaceFirst<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
  Expect<
    Equal<
      ReplaceFirst<['six', 'eight', 'ten'], 'eleven', 'twelve'>,
      ['six', 'eight', 'ten']
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/25170/answer
  > View solutions: https://tsch.js.org/25170/solutions
  > More Challenges: https://tsch.js.org
*/
