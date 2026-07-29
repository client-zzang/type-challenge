/*
  527 - Append to object
  -------
  by Andrey Krasovsky (@bre30kra69cs) #보통 #object-keys

  ### 질문

  주어진 인터페이스에 새로운 필드를 추가한 object 타입을 구현하세요. 이 타입은 세 개의 인자를 받습니다.

  예시:

  ```ts
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
  ```

  > GitHub에서 보기: https://tsch.js.org/527/ko
*/

// 🚀 시작: 2026-07-29 23:26
// ✅ 종료: 2026-07-29 23:33
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 U를 key로 V를 value로 갖는 객체를 제네릭 T와 intersection으로 묶어서 Mapped Types 만들기

  😆 배움
    -

*/

/* _____________ 여기에 코드 입력 _____________ */

type Merge<T> = {
  [P in keyof T]: T[P];
};

type AppendToObject<T, U extends string, V> = Merge<
  T & {
    [P in U]: V;
  }
>;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type test1 = {
  key: 'cat';
  value: 'green';
};

type testExpect1 = {
  key: 'cat';
  value: 'green';
  home: boolean;
};

type test2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
};

type testExpect2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
  home: 1;
};

type test3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
};

type testExpect3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
  moon: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/527/answer/ko
  > 정답 보기: https://tsch.js.org/527/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
