/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #보통 #infer #tuple #union

  ### 질문

  튜플 값으로 유니온 타입을 생성하는 제네릭 `TupleToUnion<T>`를 구현하세요.

  예시:

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > GitHub에서 보기: https://tsch.js.org/10/ko
*/

// 🚀 시작: 2026-05-06 23:42
// ✅ 종료: 2026-05-06 23:50
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. infer
      - 처음에 `infer`를 사용할 생각을 못하고 헤매다가 문제에 태그를 확인하고 생각
      - 재귀를 돌면서 유니온 매핑을 해주면 되겠다고 생각

  😆 배움
    1. 더 쉬운 접근
      - `number` 키워드를 활용한 튜플 접근
      - 재귀를 사용하지 않는 `infer` 접근

    2. Indexed Access Type
      - 배열/튜플에 `number` 키워드를 인덱스로 넣으면 모든 인덱스의 요소 타입이 자동으로 유니온타입으로 합쳐짐

*/

/* _____________ 여기에 코드 입력 _____________ */

type TupleToUnion<T> = T extends [infer First, ...infer Rest]
  ? First | TupleToUnion<Rest>
  : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/10/answer/ko
  > 정답 보기: https://tsch.js.org/10/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
