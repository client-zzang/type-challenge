/*
  28333 - Public Type
  -------
  by KaiKai (@kaikaibenkai) #medium #object-keys

  ### Question

  Remove the key starting with `_` from given type `T`.

  > View on GitHub: https://tsch.js.org/28333
*/

// 🚀 시작: 2026-11-08 13:51
// ✅ 종료: 2026-11-08 13:53
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. Mapped Type의 key remapping 활용

        type PublicType<T extends object> = {
          [P in keyof T as P extends `_${string}` ? never : P]: T[P];
        };

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type PublicType<T extends object> = {
  [P in keyof T as P extends `_${string}` ? never : P]: T[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<PublicType<{ a: number }>, { a: number }>>,
  Expect<Equal<PublicType<{ _b: string | bigint }>, {}>>,
  Expect<Equal<PublicType<{ readonly c?: number }>, { readonly c?: number }>>,
  Expect<Equal<PublicType<{ d: string; _e: string }>, { d: string }>>,
  Expect<Equal<PublicType<{ _f: () => bigint[] }>, {}>>,
  Expect<Equal<PublicType<{ g: '_g' }>, { g: '_g' }>>,
  Expect<Equal<PublicType<{ __h: number; i: unknown }>, { i: unknown }>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/28333/answer
  > View solutions: https://tsch.js.org/28333/solutions
  > More Challenges: https://tsch.js.org
*/
