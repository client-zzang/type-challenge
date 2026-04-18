/*
  7 - Readonly
  -------
  by Anthony Fu (@antfu) #쉬움 #built-in #readonly #object-keys

  ### 질문

  `T`의 모든 프로퍼티를 읽기 전용(재할당 불가)으로 바꾸는 내장 제네릭 `Readonly<T>`를 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```

  > GitHub에서 보기: https://tsch.js.org/7/ko
*/

// 🚀 시작: 2026-04-18 16:33
// ✅ 종료: 2026-04-18 16:35
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    인덱스 시그니처로 프로퍼티에 readonly 키워드를 넣으면 될 것 같다고 생각
    readonly 키워드를 어떻게 넣어야 하는 지 몰라서 구글 검색
    참조: https://radlohead.gitbook.io/typescript-deep-dive/type-system/readonly

  😆 배움
    TS에서 프로퍼티 앞에 readonly 키워드를 사용하면 해당 프로퍼티를 readonly 처리할 수 있다.
 */

/* _____________ 여기에 코드 입력 _____________ */

type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/7/answer/ko
  > 정답 보기: https://tsch.js.org/7/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
