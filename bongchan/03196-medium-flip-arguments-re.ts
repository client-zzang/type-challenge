/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #medium #arguments

  ### Question

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

  > View on GitHub: https://tsch.js.org/3196
*/

// 🚀 시작: 2026-09-26 18:05
// ✅ 종료: 2026-09-26 18:13
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 매개변수를 spread infer로 추출하여 뒤집기

      type Reverse<T extends unknown[]> = T extends [infer F, ...infer R]
        ? [...Reverse<R>, F]
        : [];

      type FlipArguments<T extends Function> = T extends (
        ...args: infer Args
      ) => infer Return
        ? (...args: Reverse<Args>) => Return
        : T;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : [];

type FlipArguments<T extends Function> = T extends (
  ...args: infer Args
) => infer Return
  ? (...args: Reverse<Args>) => Return
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >,
];

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3196/answer
  > View solutions: https://tsch.js.org/3196/solutions
  > More Challenges: https://tsch.js.org
*/
