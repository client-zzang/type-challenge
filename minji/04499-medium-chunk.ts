/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > View on GitHub: https://tsch.js.org/4499
*/

/* _____________ Your Code Here _____________ */

type Chunk<T extends any[], N extends number, A extends any[] = [], B extends any[] = []> = T extends [infer F, ...infer R] 
  ? N extends A['length']
    ? Chunk<T, N, [], [...B, A]>
    : Chunk<R, N, [...A, F], B>
  : A extends []
    ? [...B, ...A]
    : [...B, A]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4499/answer
  > View solutions: https://tsch.js.org/4499/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 현재 튜플, 결과 튜플 제네릭 만들어 추가 => 첫 번째 튜플만 생성됨
type Chunk<T extends any[], N extends number, A extends any[] = [], B extends any[] = []> = T extends [infer F, ...infer R] 
  ? N extends A['length']
    ? Chunk<R, N, [], [...B, A]>
    : Chunk<R, N, [...A, F], B>
  : B

2. A의 길이가 N보다 작을 때 T를 그대로 넘겨주기 => 마지막 남는 원소가 출력되지 않음
type Chunk<T extends any[], N extends number, A extends any[] = [], B extends any[] = []> = T extends [infer F, ...infer R] 
  ? N extends A['length']
    ? Chunk<T, N, [], [...B, A]>
    : Chunk<R, N, [...A, F], B>
  : B

3. 최종 출력을 바꾸기 => 1번 빈 튜플 케이스가 안풀린다
type Chunk<T extends any[], N extends number, A extends any[] = [], B extends any[] = []> = T extends [infer F, ...infer R] 
  ? N extends A['length']
    ? Chunk<T, N, [], [...B, A]>
    : Chunk<R, N, [...A, F], B>
  : [...B, A]

4. (힌트) 최종 출력 시 A를 비교하기
type Chunk<T extends any[], N extends number, A extends any[] = [], B extends any[] = []> = T extends [infer F, ...infer R] 
  ? N extends A['length']
    ? Chunk<T, N, [], [...B, A]>
    : Chunk<R, N, [...A, F], B>
  : A extends []
    ? [...B, ...A]
    : [...B, A]
*/
