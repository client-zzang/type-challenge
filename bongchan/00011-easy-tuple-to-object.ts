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

// 🚀 시작: 2026-04-19 09:53
// ✅ 종료: 2026-04-19 10:24
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    인덱스 시그니처로 접근하면 되지 않을까?

    type TupleToObject<T extends readonly any[]> = {
      [key in keyof T]: key;
    };

    type Test = TupleToObject<typeof tuple>; // type Test = readonly ["0", "1", "2", "3"]
    튜플의 keyof는 암묵적으로 인덱스 값이 key가 되고 있네 그럼 해당 key를 통해서 T에 접근해 value를 꺼내면 가능할까?


    type TupleToObject<T extends readonly any[]> = {
      [key in T[keyof T]]: key;
    };
    // 우선 T[keyof T] 이 부분에서 다음과 같은 에러가 발생
    //   'T[keyof T]' 형식은 'string | number | symbol' 형식에 할당할 수 없습니다.
    //   'T[string] | T[number] | T[symbol]' 형식은 'string | number | symbol' 형식에 할당할 수 없습니다.
    //   'T[string]' 형식은 'string | number | symbol' 형식에 할당할 수 없습니다.

    type Test = TupleToObject<typeof tuple>;

    Test의 타입 추론은 다음과 같음
    //  type Test = {
    //    tesla: "tesla";
    //    "model 3": "model 3";
    //    "model X": "model X";
    //    "model Y": "model Y";
    //    4: 4;
    //  }

  😆 배움
    1. PropertyKey(string | number | symbol)
      TypeScript 내장 타입으로 객체의 key로 사용 가능한 모든 원시 타입의 유니온
    
    2. T[number](Indexed Access Type)
      type Obj = { a: string; b: number };
      type A = Obj['a'];        // string
      type B = Obj['b'];        // number
      type AB = Obj['a' | 'b']; // string | number  ← 유니온으로 꺼내면 값도 유니온

      튜플도 내부적으로는 숫자 key를 가진 객체
      type T0 = T[0];  // 'tesla'
      type T1 = T[1];  // 'model 3'
      type T2 = T[2];  // 'model X'
      type T3 = T[3];  // 'model Y'

      T[number]에서 number는 모든 숫자 타입을 의미하는 타입으로 T[0 | 1 | 2 | ...] 과 같다.
      내가 접근한 keyof T는 인덱스와 배열 메서드(length, push 등) key까지 포함된다.

    3. in(Mapped Type)
      {
        [P in U]: ...
      }
      해당 문법은 유니온 U의 각 멤버를 P에 대입하면서 객체를 만든다는 의미로 JavaScript의 for ... of 와 비슷한 타입 레벨 반복문을 의미

      type Keys = 'a' | 'b' | 'c';

      type Obj = { [P in Keys]: P };
      // P가 'a'일 때 → a: 'a'
      // P가 'b'일 때 → b: 'b'
      // P가 'c'일 때 → c: 'c'
      // 결과: { a: 'a'; b: 'b'; c: 'c' }

      // value 자리에 다른 값을 넣을 수도 있다.

      type AllNumber = { [P in Keys]: number };
      // { a: number; b: number; c: number }

      type AllBoolean = { [P in Keys]: boolean };
      // { a: boolean; b: boolean; c: boolean }
    
    4. 인덱스 시그니처(Index Signature)
      "어떤 타입의 key든 들어올 수 있고, 그 value는 특정 타입이다"를 선언하는 문법

      type StringMap = {
        [key: string]: number;
      }

      Index Signature vs Mapped Type
      
      Index Signature
        - 키워드
          - `:`
        - key의 정체
          - 타입 제약(string, number 등)
        - 결과
          - 임의 개수의 동적 key 허용
        - 예시
          - { [k: string]: T }

      Mapped Type
        - 키워드
          - `in`
        - key의 정체
          - 유니온 순회 변수
        - 결과
          - 유니온 멤버 수만큼 고정된 key 생성
        - 예시
          - { [K in U]: T }

      접근에 내가 인덱스 시그니처라고 작성했지만 사실 Mapped Type으로 접근한 것이 맞는 표현이다.

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
