/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

type FlattenDepthOnce<T extends any[]> = T extends [infer First, ...infer Rest] ? First extends any[] ? [...First, ...FlattenDepthOnce<Rest>] : [First, ...FlattenDepthOnce<Rest>] : []
type FlattenDepth<T extends any[], N extends number = 1, A extends any[] = []> = FlattenDepthOnce<T> extends T ? T : A['length'] extends N ? T : FlattenDepth<FlattenDepthOnce<T>, N, [...A, 0]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>, // 3 -> 1
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>, // 3 -> 2
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. type FlattenDepth<T extends any[], N = 1> = T extends [infer First, ...infer Rest] ? [First, ...FlattenDepth<Rest, N>] : []
=> [1, [2]]가 [1, [2]]로 나온다 (3번째 케이스 실패)

2. Rest=[[2]]로 넘어가는 문제 해결하기
type FlattenDepth<T extends any[], N = 1> = T extends [infer First, ...infer Rest] ? [First, ...FlattenDepth<Rest extends any[][] ? Rest[0] : Rest, N>] : []
=> 4번 케이스부터 실패

3. First를 펼치기
type FlattenDepth<T extends any[], N = 1> = T extends [infer First, ...infer Rest] ? First extends any[] ? [...First, ...FlattenDepth<Rest, N>] : [First, ...FlattenDepth<Rest, N>] : []
=> 5번은 통과
=> n회 반복 어떻게 하지?

4. (힌트) 한번 반복, n회 반복 나누고 -> 배열 길이를 비교하기
type FlattenDepthOnce<T extends any[]> = T extends [infer First, ...infer Rest] ? First extends any[] ? [...First, ...FlattenDepthOnce<Rest>] : [First, ...FlattenDepthOnce<Rest>] : []
type FlattenDepth<T extends any[], N extends number = 1, A extends any[] = []> = A['length'] extends N ? T : FlattenDepth<FlattenDepthOnce<T>, N, [...A, 0]>
=> 마지막 케이스 실패

5. (정답) 한번 flatten 한 것과 원본과 비교하기 FlattenDepthOnce<T>
type FlattenDepthOnce<T extends any[]> = T extends [infer First, ...infer Rest] ? First extends any[] ? [...First, ...FlattenDepthOnce<Rest>] : [First, ...FlattenDepthOnce<Rest>] : []
type FlattenDepth<T extends any[], N extends number = 1, A extends any[] = []> = FlattenDepthOnce<T> extends T ? T : A['length'] extends N ? T : FlattenDepth<FlattenDepthOnce<T>, N, [...A, 0]>
*/
