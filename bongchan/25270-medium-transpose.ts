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

// 🚀 시작: 2026-10-26 12:35
// ✅ 종료: 2026-10-26 13:03
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    🔴 접근 1. 🤖 (AI 힌트 받음)
      🔵 1-1. JS로 생각하기

        function transpose(M) {
          // 결과의 행 개수 = M의 열 개수 = M[0].length
          return M[0].map((_, col) =>
            M.map((row) => row[col])
          );
        }

      🔵 1-2. Mapped Type의 동형 특징 활용

        type Transpose<M extends number[][]> = {
          [P in keyof M[0]]: { // ❌ M[0] 은 타입 파라미터 형태가 아니기 때문에 동형 타입이 유지되지 않음
            [K in keyof M]: P extends keyof M[K] ? M[K][P] : never;
          };
        };

        type Transpose<M extends number[][], C extends number[] = M[0]> = {
          [P in keyof C]: { // ✅ Homomorphic Mapped Type 조건은 타입 파라미터 그 자체일 때만 튜플 모양 유지
            [K in keyof M]: P extends keyof M[K] ? M[K][P] : never;
          };
        };

      🔵 1-3. 빈배열의 경우 M[0]이 없을 수 있기 때문에 조건부 처리

        type Transpose<
          M extends number[][],
          C extends number[] = M[0] extends undefined ? [] : M[0],
        > = {
          [P in keyof C]: {
            [K in keyof M]: P extends keyof M[K] ? M[K][P] : never;
          };
        };


  😆 배움
    1. Homomorphic Mapped Type 조건

      - keyof 대상이 타입 파라미터 그 자체여야 튜플 모양 유지

*/

/* _____________ Your Code Here _____________ */

type Transpose<
  M extends number[][],
  C extends number[] = M[0] extends undefined ? [] : M[0],
> = {
  [P in keyof C]: {
    [K in keyof M]: P extends keyof M[K] ? M[K][P] : never;
  };
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<
    Equal<
      Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/25270/answer
  > View solutions: https://tsch.js.org/25270/solutions
  > More Challenges: https://tsch.js.org
*/
