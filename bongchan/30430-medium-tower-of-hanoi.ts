/*
  30430 - Tower of hanoi
  -------
  by null (@aswinsvijay) #medium #array

  ### Question

  Simulate the solution for the Tower of Hanoi puzzle. Your type should take the number of rings as input an return an array of steps to move the rings from tower A to tower B using tower C as additional. Each entry in the array should be a pair of strings `[From, To]` which denotes ring being moved `From -> To`.

  [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
  [GeeksForGeeks](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi)

  > View on GitHub: https://tsch.js.org/30430
*/

// 🚀 시작: 2026-11-17 23:38
// ✅ 종료: 2026-11-17 23:46
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    🔴 접근 1. 🤖 (AI 힌트 받음)
      🔵 1-1. 종료 조건 만들기

        type Hanoi<
          N extends number,
          From = 'A',
          To = 'B',
          Intermediate = 'C',
          Count extends unknown[] = [],
        > = Count['length'] extends N ? [] : 'TODO';

      🔵 1-2. 재귀 돌면서 기둥 바꾸기

        type Hanoi<
          N extends number,
          From = 'A',
          To = 'B',
          Intermediate = 'C',
          Count extends unknown[] = [],
        > = Count['length'] extends N
          ? []
          : [
              ...Hanoi<N, From, Intermediate, To, [...Count, 1]>,
              [From, To],
              ...Hanoi<N, Intermediate, To, From, [...Count, 1]>,
            ];

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Hanoi<
  N extends number,
  From = 'A',
  To = 'B',
  Intermediate = 'C',
  Count extends unknown[] = [],
> = Count['length'] extends N
  ? []
  : [
      ...Hanoi<N, From, Intermediate, To, [...Count, 1]>,
      [From, To],
      ...Hanoi<N, Intermediate, To, From, [...Count, 1]>,
    ];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Tests = [
  Expect<Equal<Hanoi<0>, []>>,
  Expect<Equal<Hanoi<1>, [['A', 'B']]>>,
  Expect<Equal<Hanoi<2>, [['A', 'C'], ['A', 'B'], ['C', 'B']]>>,
  Expect<
    Equal<
      Hanoi<3>,
      [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
        ['A', 'B'],
        ['C', 'A'],
        ['C', 'B'],
        ['A', 'B'],
      ]
    >
  >,
  Expect<
    Equal<
      Hanoi<5>,
      [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
        ['A', 'B'],
        ['C', 'A'],
        ['C', 'B'],
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
        ['B', 'A'],
        ['C', 'A'],
        ['B', 'C'],
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
        ['A', 'B'],
        ['C', 'A'],
        ['C', 'B'],
        ['A', 'B'],
        ['C', 'A'],
        ['B', 'C'],
        ['B', 'A'],
        ['C', 'A'],
        ['C', 'B'],
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
        ['A', 'B'],
        ['C', 'A'],
        ['C', 'B'],
        ['A', 'B'],
      ]
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30430/answer
  > View solutions: https://tsch.js.org/30430/solutions
  > More Challenges: https://tsch.js.org
*/
