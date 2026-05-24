/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #쉬움 #object-keys

  ### 질문

  배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

  예시:

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > GitHub에서 보기: https://tsch.js.org/11/ko
*/

// 🚀 시작: 2026-05-24 23:18
// ✅ 종료: 2026-05-24 23:25
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Mapped Types, Indexed Access Type
      - Homomorphic Mapped Types(동형 매핑)으로 제네릭 튜풀/배열 T를 keyof로 사용하면 return 타입이 튜플/배열 형태로 나온다.
      - 튜플/배열을 keyof 하면 눈에 보이는 요소 뿐만 아니라 length 등 튜플/배열의 프로퍼티가 포함된다.
      - 따라서 Indexed Access Type으로 튜플/배열을 유니온 타입으로 변환하고 Mapped Types를 활용하여 객체로 전환

      type TupleToObject<T extends readonly PropertyKey[]> = {
        [P in T[number]]: P;
      };

  😆 배움
    -
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P;
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const sym1 = Symbol(1);
const sym2 = Symbol(2);
const tupleSymbol = [sym1, sym2] as const;
const tupleMix = [1, '2', 3, '4', sym1] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: 'tesla';
        'model 3': 'model 3';
        'model X': 'model X';
        'model Y': 'model Y';
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<
      TupleToObject<typeof tupleSymbol>,
      { [sym1]: typeof sym1; [sym2]: typeof sym2 }
    >
  >,
  Expect<
    Equal<
      TupleToObject<typeof tupleMix>,
      { 1: 1; '2': '2'; 3: 3; '4': '4'; [sym1]: typeof sym1 }
    >
  >,
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/11/answer/ko
  > 정답 보기: https://tsch.js.org/11/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
