/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

// 🚀 시작: 2026-07-17 22:31
// ✅ 종료: 2026-07-17 22:47
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 T가 빈튜플이면 제네릭 U 반환

      type TupleToNestedObject<T extends Array<string>, U> = T extends [] ? U : false;

    2. 튜플의 첫 번째 요소부터 객체의 키로 만들면서 재귀

      type TupleToNestedObject<T extends Array<string>, U> = T extends []
        ? U
        : {
            [P in T[0]]: T extends [string, ...infer Rest extends Array<string>]
              ? Rest extends []
                ? U
                : TupleToNestedObject<Rest, U>
              : U;
          };

  😆 배움
    - 다른 풀이

      type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
        ? {
            [K in F & string]: TupleToNestedObject<R, U>;
          }
        : U;

*/

/* _____________ Your Code Here _____________ */

type TupleToNestedObject<T extends Array<string>, U> = T extends []
  ? U
  : {
      [P in T[0]]: T extends [string, ...infer Rest extends Array<string>]
        ? Rest extends []
          ? U
          : TupleToNestedObject<Rest, U>
        : U;
    };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<['a', 'b', 'c'], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3188/answer
  > View solutions: https://tsch.js.org/3188/solutions
  > More Challenges: https://tsch.js.org
*/
