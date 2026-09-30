/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，output: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

// D: 중복 건
type GetDuplicatedElement<T extends any[], U extends any[] = [], D extends any[] = []> = T extends [infer F, ...infer R]
  ? GetDuplicatedElement<R, [...U, F], IsInclude<U, F> extends true ? [...D, F] : D>
  : D

type IsSame<A, B> = [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false

type IsInclude<A, B> = A extends [infer F, ...infer R]
  ? IsSame<F, B> extends true
    ? true
    : IsInclude<R, B>
  : false

type FindEles<T extends any[], Dup extends any[] = GetDuplicatedElement<T>, Res extends any[] = []> = T extends [infer F, ...infer R extends any[]]
  ? IsInclude<Dup, F> extends true
    ? FindEles<R, Dup, Res>
    : FindEles<R, Dup, [...Res, F]>
  : Res


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 9286번의 중복값 유니온 활용하기 => number를 걸러내지 못한다
// D: 중복 건
type GetDuplicatedElement<T extends any[], U = never, D = never> = T extends [infer F, ...infer R]
  ? GetDuplicatedElement<R, U | [F], [F] extends U ? D | [F] : D>
  : D

type FindEles<T extends any[], Dup = GetDuplicatedElement<T>, Res extends any[] = []> = T extends [infer F, ...infer R extends any[]]
  ? [F] extends Dup
    ? FindEles<R, Dup, Res>
    : FindEles<R, Dup, [...Res, F]>
  : any

- [1] extends [number]는 항상 true =>  해결 방법: 양쪽을 비교하는 isSame 만들기


2. IsSame 만들어도 첫번째, 두번째 통과가 안된다 - Dup를 하나씩 비교해야하는데 현재는 유니온타입이라 전체 비교만 되는 중

// D: 중복 건
type GetDuplicatedElement<T extends any[], U = never, D = never> = T extends [infer F, ...infer R]
  ? GetDuplicatedElement<R, U | F, F extends U ? D | F : D>
  : D

type IsSame<A, B> = [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false

type FindEles<T extends any[], Dup = GetDuplicatedElement<T>, Res extends any[] = []> = T extends [infer F, ...infer R extends any[]]
  ? IsSame<F, Dup> extends true
    ? FindEles<R, Dup, Res>
    : FindEles<R, Dup, [...Res, F]>
  : Res

- Dup를 튜플로 바꿔보기
- 튜플에 포함되어있는지 확인하는 IsInclude 추가 
- 모든 비교 시 IsSame, IsInclude 활용하기 

*/
