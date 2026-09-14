/*
  2852 - OmitByType
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  From ```T```, pick a set of properties whose type are not assignable to ```U```.

  For Example

  ```typescript
  type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { name: string; count: number }
  ```

  > View on GitHub: https://tsch.js.org/2852
*/

// 🚀 시작: 2026-09-14 22:43
// ✅ 종료: 2026-09-14 22:45
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Mapped Types, Key Remapping을 활용하여 제네릭 U로 타입 좁히기

      type OmitByType<T, U> = {
        [P in keyof T as T[P] extends U ? never : P]: T[P];
      };

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<
    Equal<
      OmitByType<Model, string>,
      { count: number; isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<
    Equal<
      OmitByType<Model, number>,
      { name: string; isReadonly: boolean; isEnable: boolean }
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2852/answer
  > View solutions: https://tsch.js.org/2852/solutions
  > More Challenges: https://tsch.js.org
*/
