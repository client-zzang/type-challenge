/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

// 🚀 시작: 2026-07-04 10:56
// ✅ 종료: 2026-07-04 11:58
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. Homomorphic Mapped Type 활용

      declare function PromiseAll<T extends Array<unknown>>(
        values: T,
      ): Promise<{
        [P in keyof T]: T[P];
      }>;

      - ❌ Promise return을 해결하면 된다. -> const promiseAllTest2: Promise<[1, 2, Promise<number>]>;

      1) Promise<infer R>로 Promise로 감싸진 R 꺼내기

        declare function PromiseAll<T extends Array<unknown>>(
          values: T,
        ): Promise<{
          [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]; // ➡️ infer 사용
        }>;

      - ❌ 3, 4, 5 케이스에서 실패
        Case 3) const promiseAllTest3: Promise<(number | Promise<number>)[]>
          - readonly 처리해보자

            declare function PromiseAll<T extends Array<unknown>>(
              values: readonly [...T], // ➡️ readonly spread 사용
            ): Promise<{
              [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P];
            }>;

            - ✅ const promiseAllTest3: Promise<[number, number, number]>

          Case 4) const promiseAllTest4: Promise<(number | Promise<number>)[]>
          Case 5) const promiseAllTest5: Promise<(number | Promise<string>)[]>

            - 4, 5 모두 제네릭으로 타입을 받는 케이스라 하나만 해결하면 둘 다 해결될 듯

              declare function PromiseAll<T extends Array<unknown>>(
                values: readonly [...T],
              ): Promise<{
                [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P];
              }>;
            
                - ❌ const promiseAllTest4: Promise<(number | Promise<number>)[]>
                - Promise 내부가 풀리지 않고 타입 추론됨
                - ✌️ Promise<infer R>로 extends 하는 부분을 별도 타입으로 분리하니까 해결됨

                  type MyAwaited<T> = T extends Promise<infer R> ? R : T;

                  declare function PromiseAll<T extends Array<unknown>>(
                    values: readonly [...T],
                  ): Promise<{
                    [P in keyof T]: MyAwaited<T[P]>;
                  }>;


                - 정답 확인

                  declare function PromiseAll<T extends Array<unknown>>(
                    values: readonly [...T],
                  ): Promise<{
                    [P in keyof T]: T[P] extends Promise<infer R> | infer R ? R : never;
                  }>;


  😆 배움
    - Distribute Conditional Types는 naked(벌거벗은) 타입 파라미터만 가능
      - [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P];
      - 위 구조에서 T[P]는 naked가 아니라 distribute 되지 않음
        - 따라서 T[P] = number | Promise<number> 이렇게 분배되지 않고 유니온이 통째로 검사
      - type MyAwaited<T> = T extends Promise<infer R> ? R : T;
        - 이렇게 별도로 분리하면 T는 naked가 되어 distribute 가능

*/

/* _____________ Your Code Here _____________ */

type MyAwaited<T> = T extends Promise<infer R> ? R : T;

declare function PromiseAll<T extends Array<unknown>>(
  values: readonly [...T],
): Promise<{
  [P in keyof T]: MyAwaited<T[P]>;
}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([
  1,
  2,
  Promise.resolve('3'),
]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/
