/*
  5153 - IndexOf
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```

  > View on GitHub: https://tsch.js.org/5153
*/

/* _____________ Your Code Here _____________ */

// 없으면 -1
// 0부터 시작
type IndexOf<T extends any[], U, N extends number[] = []> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? N['length']
    : IndexOf<R, U, [...N, 0]>
  : -1

type a = IndexOf<[string, 'a'], 'a'> // 1
type b = IndexOf<[string, 1, number, 'a'], number> // 2
type c = IndexOf<[string, 1, number, 'a', any], any> // 4

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5153/answer
  > View solutions: https://tsch.js.org/5153/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 튜플 분해 + 재귀

type IndexOf<T extends any[], U, N extends number[] = []> = T extends [infer F, ...infer R]
  ? U extends F
    ? N['length']
    : IndexOf<R, U, [...N, 0]>
  : -1

=> IndexOf<[string, 'a'], 'a'> 미통과 
=> F extends U로 바꾸면 number <-> 숫자 케이스가 미통과 => 양쪽 두 번 비교하기 

2. any 처리 필요

type IndexOf<T extends any[], U, N extends number[] = []> = T extends [infer F, ...infer R]
  ? F extends U
    ? U extends F
      ? N['length']
      : IndexOf<R, U, [...N, 0]>
    : IndexOf<R, U, [...N, 0]>
  : -1

IndexOf<[string, 1, number, 'a', any], any> // 4 케이스가 0 | 2 | 1 | 4 | 3 로 나옴
=> 비교 시 []를 씌워도 해결 안됨..

3. (정답 확인)
Equal<F, U> extends true로 비교하기!!
*/
