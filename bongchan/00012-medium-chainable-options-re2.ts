/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #보통 #application

  ### 질문

  체인 가능 옵션은 일반적으로 Javascript에서 사용됩니다. 하지만 TypeScript로 전환하면 제대로 구현할 수 있나요?

  이 챌린지에서는 `option(key, value)`과 `get()` 두가지 함수를 제공하는 객체(또는 클래스) 타입을 구현해야 합니다. 현재 타입을 `option`으로 지정된 키와 값으로 확장할 수 있고 `get`으로 최종 결과를 가져올 수 있어야 합니다.

  예시

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // 결과는 다음과 같습니다:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  문제를 해결하기 위해 js/ts 로직을 작성할 필요는 없습니다. 단지 타입 수준입니다.

  `key`는 `string`만 허용하고 `value`는 무엇이든 될 수 있다고 가정합니다. 같은 `key`는 두 번 전달되지 않습니다.

  > GitHub에서 보기: https://tsch.js.org/12/ko
*/

// 🚀 시작: 2026-06-28 14:40
// ✅ 종료: 2026-06-28 14:55
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 재귀 + 결과를 담는 제네릭 타입
      1) Chainable에 R을 넘겨줄 때 다음과 같은 방식으로 했더니 key의 추론이 리터럴이 아닌 제네릭 T로 추론됨
        
        type Chainable<R = {}> = {
          option<T extends string, V>(
            key: T,
            value: V,
          ): Chainable<
            R & {
              T: V; // ➡️ T: number 이런식으로 추론
            }
          >;
          get(): R;
        };

        - Mapped Types를 활용하니까 제네릭 T 리터럴이 그대로 key로 추론

        type Chainable<R = {}> = {
          option<T extends string, V>(
            key: T,
            value: V,
          ): Chainable<
            R & {
              [P in T]: V; // ➡️ foo: number 이렇게 잘 추론
            }
          >;
          get(): R;
        };

      2) result2, result3의 중복 key 막기

        type Chainable<R = {}> = {
          option<T extends string, V>(
            key: T extends keyof R ? never : T, // ➡️ 반환 타입 R에 이미 있다면 never로 중복 key 막기
            value: V,
          ): Chainable<
            R & {
              [P in T]: V;
            }
          >;
          get(): R;
        };

      3) 

        type Chainable<R = {}> = {
          option<T extends string, V>(
            key: T extends keyof R ? never : T,
            value: V,
          ): Chainable<
            Omit<R, T> & { // ➡️ 중복된 key에 대해서 value를 덮어쓰기 위해서 Omit으로 이미 존재하는 key 제거
              [P in T]: V;
            }
          >;
          get(): R;
        };

  😆 배움
    - 

*/

/* _____________ 여기에 코드 입력 _____________ */

type Chainable<R = {}> = {
  option<T extends string, V>(
    key: T extends keyof R ? never : T,
    value: V,
  ): Chainable<
    Omit<R, T> & {
      [P in T]: V;
    }
  >;
  get(): R;
};

/* _____________ 테스트 케이스 _____________ */
import type { Alike, Expect } from '@type-challenges/utils';

declare const a: Chainable;

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get();

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get();

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/12/answer/ko
  > 정답 보기: https://tsch.js.org/12/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
