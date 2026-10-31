/*
  27152 - Triangular number
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number N, find the Nth triangular number, i.e. `1 + 2 + 3 + ... + N`

  > View on GitHub: https://tsch.js.org/27152
*/

// 🚀 시작: 2026-10-31 15:43
// ✅ 종료: 2026-10-31 15:59
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 현재 반복 횟수를 담는 제네릭, 직전값을 담는 제네릭, 현재값을 담는 제네릭 활용

        type Triangular<
          N extends number,
          I extends number[] = [],
          P extends number[] = [1],
          C extends number[] = [],
        > = I['length'] extends N
          ? C['length']
          : Triangular<N, [...I, 1], [...P, 1], [...P, ...C]>;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type Triangular<
  N extends number,
  I extends number[] = [],
  P extends number[] = [1],
  C extends number[] = [],
> = I['length'] extends N
  ? C['length']
  : Triangular<N, [...I, 1], [...P, 1], [...P, ...C]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27152/answer
  > View solutions: https://tsch.js.org/27152/solutions
  > More Challenges: https://tsch.js.org
*/
