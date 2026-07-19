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

// 🚀 시작: 2026-07-19 17:17
// ✅ 종료: 2026-07-19 17:30
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 T를 Function 타입으로 좁히기
      - errors 대응

        type FlipArguments<T extends Function> = any;

    2. 아규먼트를 infer로 꺼내서 뒤집기

      type MyReverse<T> = T extends [...infer Rest, infer Last]
        ? [Last, ...MyReverse<Rest>]
        : T;

      type FlipArguments<T extends Function> = T extends (
        ...args: infer Args
      ) => infer R
        ? (...args: MyReverse<Args>) => R
        : T;

  😆 배움
    1. TypeScript의 구조적 타입 시스템
      - 함수의 타입을 비교할 때는 다음 세 가지를 확인해서 파라미터 이름은 타입의 일부가 아님
        1. 파라미터의 개수
        2. 각 위치의 파라미터 타입
        3. 반환타입
  
*/

/* _____________ Your Code Here _____________ */

type MyReverse<T> = T extends [...infer Rest, infer Last]
  ? [Last, ...MyReverse<Rest>]
  : T;

type FlipArguments<T extends Function> = T extends (
  ...args: infer Args
) => infer R
  ? (...args: MyReverse<Args>) => R
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
