/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Result extends any[] = [],
  Flag extends boolean = false,
  Curr extends boolean = Result['length'] extends End
    ? false // End 이상일 때 (범위 벗어났을 때 업데이트)
    : Result['length'] extends Start
      ? true // Start 이상일 때 (범위 포함될 때 업데이트)
      : Flag // 이외의 경우에는 받은 Flag 그대로 넘겨줌
> = T extends [infer F, ...infer R]
  ? Fill<R, N, Start, End, [...Result, Curr extends true ? N : F], Curr> // Curr가 true일 땐 범위 내에 존재한다는 의미 => N 추가, 아니면 F 추가 +++++ 다음 Flag로는 Curr를 넘겨줌
  : Result

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. S, E 빈 값이면 전체 범위
Current Tuple (Index) 제네릭 C 넣기

Nums = [0, ... , 10] 타입으로 순회? => 20인 케이스때문에 안됨

2. (힌트) 현재 인덱스와 Start, End를 비교하며 Flag로 관리하기
- Flag가 true일 땐 N을 넣고, false일 땐 F 넣기
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Result extends any[] = [],
  Flag extends boolean = false,
> = T extends [infer F, ...infer R]
  ? Fill<R, N, Start, End, [...Result, Flag extends false ? F : N], Result['length'] extends End 
    ? false
    : Result['length'] extends Start
      ? true
      : Flag>
  : Result
=> 튜플의 첫 번째 인자가 N으로 바뀌지 않는 문제 발생 - 인덱스는 0부터 시작하는 특성 때문
=> Curr 제네릭 추가하기

=> 못 풀음!

*/
