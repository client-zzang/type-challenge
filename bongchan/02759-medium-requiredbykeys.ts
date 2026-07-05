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

// 🚀 시작: 2026-07-05 15:20
// ✅ 종료: 2026-07-05 15:31
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 K에 제네릭 T의 key가 아닌 값이 들어올 경우 에러 처리, 제네릭 K 옵셔널 처리
      - type RequiredByKeys<T, K extends keyof T = keyof T> = any;

    2. Mapped Types로 조건부 처리 후 Intersection Types로 합치기

  😆 배움
    - 객체의 프로퍼티를 필수로 지정하는 방법
      - { key-?: value }
  
*/

/* _____________ Your Code Here _____________ */

type Compute<T> = {
  [P in keyof T]: T[P];
};

type RequiredByKeys<T, K extends keyof T = keyof T> = Compute<
  {
    [P in K]-?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

type T1 = RequiredByKeys<User, 'name'>;
type T2 = RequiredByKeys<User, 'name' | 'age'>;

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
