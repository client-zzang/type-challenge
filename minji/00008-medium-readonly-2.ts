/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #보통 #readonly #object-keys

  ### 질문

  `T`에서 `K` 프로퍼티만 읽기 전용으로 설정해 새로운 오브젝트 타입을 만드는 제네릭 `MyReadonly2<T, K>`를 구현하세요. `K`가 주어지지 않으면 단순히 `Readonly<T>`처럼 모든 프로퍼티를 읽기 전용으로 설정해야 합니다.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > GitHub에서 보기: https://tsch.js.org/8/ko
*/

/* _____________ 여기에 코드 입력 _____________ */
// K를 제외한 나머지는 그대로 처리하고, K에 포함된 것들은 readonly 처리
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & { readonly [P in K]: T[P] };

/* _____________ 테스트 케이스 _____________ */
import type { Alike, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>,
];

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/8/answer/ko
  > 정답 보기: https://tsch.js.org/8/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/*
접근 방법
1. 제네릭 K에 아무것도 지정되지 않는 케이스가 존재해야 한다.
type MyReadonly2<T, K = null extends keyof T ? any : null> = ...
- K 기본값을 null로 지정해두면 extends keyof T가 항상 false이다

2. type MyReadonly2<T, K = []> = ..
- K는 []가 아니라 유니온이어야 한다
type MyReadonly2<T, K extends keyof T = keyof T> 로 개선 

3. type MyReadonly2<T, K extends keyof T = keyof T> = {[key in keyof T extends K ? readonly key : key]:T[key]}
- key를 알기위해 keyof T ... union을 알아야 함. 하지만 이 union 내부에서 key 사용 시 circular constraint 발생

4. 포함되지 않는 것 + K에 포함된 것 (readonly 처리)
type MyReadonly2<T, K extends keyof T = keyof T> = {[key in keyof T extends K ? never : keyof T]:T[key]} & {readonly [key in K]: T[key]}
- key in keyof T extends K가 false이면 keyof T (T 전체)가 key에 매핑된다

5. (정답) P 추가 후 as 키워드 사용
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & { readonly [P in K]: T[P] };
- extends가 아닌 as 키워드를 쓰는 이유
  - extends 사용 시 { [key in keyof T extends K ? never : keyof T]: T[key] }
    1. 먼저 in 뒷부분을 먼저 계산 (keyof T extends K ? never : keyof T)
      - "title" | "description" | "completed"이 "title" | "description"에 속하나요? => False => keyof T로 매핑
    2. [key in "title" | "description" | "completed"]가 됨 => 결과: key 필터링이 되지 않고 그냥 그대로 됨
  - as 사용 시 [P in keyof T as P extends K ? never : P]
    - in 뒷부분을 먼저 계산 (keyof T) => keyof T를 하나씩 순회함
      - P가 title일 때: P extends K => True => never가 됨
- as 뒤의 조건문은 각 key마다 다시 계산된다.
*/
