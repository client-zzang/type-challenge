/*
  25270 - Transpose
  -------
  by Apollo Wayne (@Shinerising) #medium #array #math

  ### Question

  The transpose of a matrix is an operator which flips a matrix over its diagonal; that is, it switches the row and column indices of the matrix A by producing another matrix, often denoted by A<sup>T</sup>.

  ```ts
  type Matrix = Transpose <[[1]]>; // expected to be [[1]]
  type Matrix1 = Transpose <[[1, 2], [3, 4]]>; // expected to be [[1, 3], [2, 4]]
  type Matrix2 = Transpose <[[1, 2, 3], [4, 5, 6]]>; // expected to be [[1, 4], [2, 5], [3, 6]]
  ```

  > View on GitHub: https://tsch.js.org/25270
*/

/* _____________ Your Code Here _____________ */

// 첫 문자만 모아 튜플 만드는 타입
type GetTupleByFirst<T extends number[][]> = T extends [infer F, ...infer R extends number[][]]
  ? F extends [infer FF, ...infer FR]
    ? [FF, ...GetTupleByFirst<R>]
    : []
  : []

// 튜플의 첫 문자만 제거
// [[1,2],[3,4],[5,6]] -> 원하는 기댓값: [[2],[4],[6]]
type RemoveFirstNumber<T extends number[][]> = T extends [infer F, ...infer R extends number[][]] // F: [1,2] R: [[3,4],[5,6]]
  ? F extends [infer _, ...infer FR]
    ? [FR, ...RemoveFirstNumber<R>]
    : []
  : []

type Transpose<M extends number[][]> = M extends [infer F, ...infer _R] // F : [1,2], R: [[3, 4], [5, 6]]
  ? F extends [infer _FF, ...infer _FR] // FF: 1, FR: [2]
    ? [GetTupleByFirst<M>, ...Transpose<RemoveFirstNumber<M>>] // RF: [3,4], RR: [[5,6]]
    : []
  : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>, [[1, 4, 7], [2, 5, 8], [3, 6, 9]]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/25270/answer
  > View solutions: https://tsch.js.org/25270/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근

행렬 곱셈
*/
