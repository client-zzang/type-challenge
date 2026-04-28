/*
  898 - Includes
  -------
  by null (@kynefuk) #쉬움 #array

  ### 질문

  JavaScript의 `Array.includes` 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, `true` 또는 `false`를 반환해야 합니다.

  예시:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > GitHub에서 보기: https://tsch.js.org/898/ko
*/

// 🚀 시작: 2026-04-28 12:14
// ✅ 종료: 2026-04-28 12:44
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 첫 번째 접근
      - U의 타입을 T로 좁혀서 조건부 처리
        - type Includes<T extends readonly any[], U> = U extends T ? true : false;

    2. 두 번째 접근
      - any[] T에 number로 union 접근
        - type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
      - 공변, 반공변 개념 때문에 테스트 케이스 몇 개 통과 못 하는 것 같음
        - Expect<Equal<Includes<[{}], { a: 'A' }>, false>> // error
        - Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>> // error

    3. 세 번째 접근
      - 공변, 반공변 문제라면 위 테스트 케이스에서 boolean은 false가 통과 되어야 하는 거 아닌가?
        - type T1 = false extends boolean ? true : false; // true
        - type T2 = boolean extends true ? true : false; // false
  😆 배움
      1. 공변, 반공변
        - 공변: 좁은 타입을 넓은 타입에 넣을 수 있다.
            ```ts
            let stringArray: Array<string> = [];
            let array: Array<string | number> = [];

            array = stringArray; // OK - stringArray는 array를 포함
            stringArray = array; // Error

            let subObj: { a: string; b: number } = { a: '1', b: 1 };
            let superObj: { a: string | number; b: number } = subObj; // superObj는 subObj 포함
            ```
        - 반공변: 넓은 타입을 좁은 타입에 넣을 수 있다.
            ```ts
            type Logger<T> = (param: T) => void;

            let logNumber: Logger<number> = (param) => {
              console.log(param); // number
            };

            let log: Logger<string | number> = (param) => {
              console.log(param); // string | number
            };

            logNumber = log; // OK
            log = logNumber; // Error
            ```
      2. extends
        - extends는 부분집합/할당 가능 여부
          - 동일성이 아님
          - 한쪽 방향(좁은 -> 넓은) 할당 가능성만 체크(공변 영향)
          - T1 = false extends boolean ? true : false // true
 */

/* _____________ 여기에 코드 입력 _____________ */

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest,
]
  ? Equal<U, First> extends true
    ? true
    : Includes<Rest, U>
  : false;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/898/answer/ko
  > 정답 보기: https://tsch.js.org/898/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
