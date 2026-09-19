/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > View on GitHub: https://tsch.js.org/2946
*/

// 🚀 시작: 2026-09-19 22:55
// ✅ 종료: 2026-09-19 22:59
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Distribute Conditional Types 활용
      - 분배를 시키기 위해서 keyof T를 갖는 제네릭 K 추가

        type ObjectEntries<T, K extends keyof T = keyof T> = K extends K
          ? [K, T[K]]
          : never;

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type ObjectEntries<T, K extends keyof T = keyof T> = K extends K
  ? [K, T[K]]
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null];
type PartialModelEntries =
  | ['name', string | undefined]
  | ['age', number | undefined]
  | ['locations', string[] | null | undefined];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, PartialModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<
    Equal<
      ObjectEntries<{ key: string | undefined }>,
      ['key', string | undefined]
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/
