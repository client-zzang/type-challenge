/*
  5360 - Unique
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Lodash.uniq, Unique<T> takes an Array T, returns the Array T without repeated values.

  ```ts
  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
  ```

  > View on GitHub: https://tsch.js.org/5360
*/

/* _____________ Your Code Here _____________ */

type IsInclude<T extends any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : IsInclude<R, U>
  : false

type Unique<T extends any[], U extends any[] = []> = T extends [infer F, ...infer R]
  ? IsInclude<U, F> extends true
    ? Unique<R, U>
    : Unique<R, [...U, F]>
  : U

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5360/answer
  > View solutions: https://tsch.js.org/5360/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. Union 타입에서 1 | number => number 타입으로 흡수된다
=> Object 만들어 key만 추출하기

type Any = string | number | symbol

type UnionToTuple<U> = any

type Unique<T extends Any[], O extends Record<any, any> = {}> = T extends [infer F extends Any, ...infer R extends Any[]]
  ? Unique<R, O & Record<F, 1>>
  : keyof O

=> keyof O에서 1과 number가 합쳐지는 문제 발생
=> 원소 하나하나 Include로 비교하는 타입 생성하자


2. IsInclude로 각 원소 비교하여 T/F 반환 

type IsInclude<T extends any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : IsInclude<R, U>
  : false

type Unique<T extends any[], U extends any[] = []> = T extends [infer F, ...infer R]
  ? IsInclude<U, F> extends true
    ? Unique<R, U>
    : Unique<R, [...U, F]>
  : U

*/
