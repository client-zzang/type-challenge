/*
  2793 - Mutable
  -------
  by jiangshan (@jiangshanmeta) #medium #readonly #object-keys

  ### Question

  Implement the generic ```Mutable<T>``` which makes all properties in ```T``` mutable (not readonly).

  For example

  ```typescript
  interface Todo {
    readonly title: string
    readonly description: string
    readonly completed: boolean
  }

  type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }

  ```

  > View on GitHub: https://tsch.js.org/2793
*/

// 🚀 시작: 2026-09-13 23:08
// ✅ 종료: 2026-09-13 23:11
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 T를 객체 타입으로 타입 제한
      - errors를 대응하기 위함

      type Mutable<T extends object> = any;

    2. Mapped Types를 활용해서 readonly 제거

      type Mutable<T extends object> = {
        -readonly [P in keyof T]: T[P];
      };

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type Mutable<T extends object> = {
  -readonly [P in keyof T]: T[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type List = [1, 2, 3];

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
];

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2793/answer
  > View solutions: https://tsch.js.org/2793/solutions
  > More Challenges: https://tsch.js.org
*/
