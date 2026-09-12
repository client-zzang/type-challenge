/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.

  For example

  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }

  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }

  ```

  > View on GitHub: https://tsch.js.org/2759
*/

// 🚀 시작: 2026-09-12 19:00
// ✅ 종료: 2026-09-12 19:03
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Intersection Types 를 하나로 묶는 타입 활용

      type Compute<T> = {
        [P in keyof T]: T[P];
      };

      type RequiredByKeys<T, K extends keyof T = keyof T> = Compute<
        {
          [P in keyof T as P extends K ? never : P]: T[P];
        } & {
          [P in K]-?: T[P];
        }
      >;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Compute<T> = {
  [P in keyof T]: T[P];
};

type RequiredByKeys<T, K extends keyof T = keyof T> = Compute<
  {
    [P in keyof T as P extends K ? never : P]: T[P];
  } & {
    [P in K]-?: T[P];
  }
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
