/*
  19749 - IsEqual
  -------
  by Takahiro Kato (@doz13189) #medium #utils

  ### Question

  Implements the equal operator that returns a boolean for whether the two given types are equal.

  For example:

  ```ts
  type X1 = 1
  type Y1 = 1
  type T1 = IsEqual<X1, Y1> // expected to be true

  type X2 = 1
  type Y2 = 2
  type T2 = IsEqual<X2, Y2> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/19749
*/

/* _____________ Your Code Here _____________ */
  type IsEqual<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2)
      ? true
      : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsEqual<number, string>, false>>,
  Expect<Equal<IsEqual<1, 1>, true>>,
  Expect<Equal<IsEqual<any, 1>, false>>,
  Expect<Equal<IsEqual<1 | 2, 1>, false>>,
  Expect<Equal<IsEqual<any, never>, false>>,
  Expect<Equal<IsEqual<[any], [number]>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/19749/answer
  > View solutions: https://tsch.js.org/19749/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. any, 1 케이스를 걸러내기 위해 지난번 All에서 배웠던 IsAny 사용
type IsAny<T> = 0 extends 1 & T ? true : false

type IsEqual<X, Y> = [X] extends [Y]
  ? [Y] extends [X]
    ? IsAny<X> extends IsAny<Y>
      ? true
      : false
    : false
  : false

=> 마지막 케이스 [any], [number] 미통과
IsAny<X> extends IsAny<Y>에서 true로 걸러진다.

2. 임시방편인 해결책: 냅다 0번째 인덱스를 꺼내기
IsAny<X extends any[] ? X[0] : X> extends IsAny<Y extends any[] ? Y[0] : Y>

3. (정답) Equal을 구현해보기

type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2)
    ? true
    : false
    
<T>() => T extends X ? 1 : 2 에서의 T는 아직 정해지지 않은 상태라 지연 상태로 남게 됨
TS는 지연된 조건부 타입 두 개를 비교할 때는 할당 가능성이 아니라 동일성 검사를 함 => X와 Y가 동일한, 똑같은 타입일 때만 통과함
=> [any] vs [number] /// 1 | 2 vs 1 /// any vs never 모두 서로 할당은 되지만 동일하지는 않은 쌍이라 false가 나오도록 함

*/
