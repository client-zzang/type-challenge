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

/* _____________ 여기에 코드 입력 _____________ */

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [key in T[number]]: key;
};

type ex = (keyof any)[];

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

/*
느낀 점
- extends 부분이 도저히 안풀려서 결국 마지막엔 답을 확인했다
- string|number|symbol을 그대로 적은 게 맞는건가.. 싶긴 하다 
- (keyof any)[] 사용 시 (string|number|symbol)[]와 동일하게 추론된다고 한다
  - TS에서 객체의 타입으로 올 수 있는 값은 string, number, symbol인데, 모든 타입을 의미하는 any의 key를 뽑아내면 이 타입으로 추론된다

배운 점
- 배열의 값들을 Union으로 뽑아낼 때: (typeof tuple)[number] // "tesla" | "model 3" | ...

- [key: string] 형태 -> key에 어떤 값이 올지 모를 때, 특정 타입이 온다는 것만 알 때 사용
- [key in T] 형태 -> key에 T의 값들이 온다는 것을 알 때, key가 정해져 있을 때 사용
*/
