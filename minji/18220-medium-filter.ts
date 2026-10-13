/*
  18220 - Filter
  -------
  by Mu-Hun (@mu-hun) #보통 #array #filter

  ### 질문

  타입 `Filter<T, Predicate>`를 구현하세요. 여기서 `T`는 배열이고, `Predicate`는 원시 타입 또는 원시 타입의 유니온입니다. 결과는 `Predicate`에 속하는 원시 타입만 가진 배열이어야 합니다.

  > GitHub에서 보기: https://tsch.js.org/18220/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type IsSame<A, B> = A extends B
  ? true
  : false

type Filter<T extends any[], P, Res extends any[] = []> = T extends [infer F, ...infer R]
  ? IsSame<F, P> extends true
    ? Filter<R, P, [...Res, F]>
    : Filter<R, P, Res>
  : Res

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/18220/answer/ko
  > 정답 보기: https://tsch.js.org/18220/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/*
접근
- P가 유니온인 케이스도 있으니 하나씩 순회하며 T 원소와 비교하기
*/
