/*
  21220 - Permutations of Tuple
  -------
  by null (@gaac510) #medium #union #tuple #conditional type #recursion

  ### Question

  Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.

  For example:

  ```ts
  PermutationsOfTuple<[1, number, unknown]>
  // Should return:
  // | [1, number, unknown]
  // | [1, unknown, number]
  // | [number, 1, unknown]
  // | [unknown, 1, number]
  // | [number, unknown, 1]
  // | [unknown, number ,1]
  ```

  > View on GitHub: https://tsch.js.org/21220
*/

/* _____________ Your Code Here _____________ */

// 몇 번째 타입을 골랐는지에 따라 순열 만들기
// any, unknown, never가 합쳐지지 않도록 하기 위해 튜플 그대로 사용
// 앞에서 건너뛴 원소들은 Prev에 담아둠
type PermutationsOfTuple<T extends unknown[], Prev extends unknown[] = []> = T extends [infer F, ...infer R]
  ? [F, ...PermutationsOfTuple<[...Prev, ...R]>] | PermutationsOfTuple<R, [...Prev, F]>
  : Prev extends [] ? [] : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectFalse } from '@type-challenges/utils'

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
  Expect<Equal<
    PermutationsOfTuple<[any, unknown, never]>,
    | [any, unknown, never]
    | [unknown, any, never]
    | [unknown, never, any]
    | [any, never, unknown]
    | [never, any, unknown]
    | [never, unknown, any]
  >>,
  Expect<Equal<
    PermutationsOfTuple<[1, number, unknown]>,
    | [1, number, unknown]
    | [1, unknown, number]
    | [number, 1, unknown]
    | [unknown, 1, number]
    | [number, unknown, 1]
    | [unknown, number, 1]
  >>,
  ExpectFalse<Equal<PermutationsOfTuple<[ 1, number, unknown ]>, [unknown]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21220/answer
  > View solutions: https://tsch.js.org/21220/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 만약 유니온으로 관리한다 해도, any | unknown => any로 축약되는데 어떻게 분리하지?

2. Permutations 문제 답을 가져왔는데 여전히 any | unknown 문제 발생 
type PermutationsOfTuple<A extends unknown[], T = A[number], K = T> = 
    [T] extends [never]
      ? []
      : K extends K
        ? [K, ...PermutationsOfTuple<A, Exclude<T, K>>]
        : never
*/
