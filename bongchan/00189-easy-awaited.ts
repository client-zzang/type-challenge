/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #쉬움 #promise #built-in

  ### 질문

  Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

  예시: 들어 `Promise<ExampleType>`이 있을 때, `ExampleType`을 어떻게 얻을 수 있을까요?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > 출처: [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > GitHub에서 보기: https://tsch.js.org/189/ko
*/

// 🚀 시작: 2026-04-25 16:19
// ✅ 종료: 2026-04-25 16:49
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    PromiseLike를 활용하면 될 것 같은데...

  😆 배움
    1. PromiseLike
      - Promise 뿐 아니라 thenable 도 표현

    2. infer
      - 조건부 타입의 extends 절 안에서, 매칭되는 위치의 타입을 변수처럼 뽑아내 이름을 붙이는 키워드
        - type Unbox<T> = T extends Array<infer U> ? U : T;
          - type A = Unbox<string[]>;   // string
          - type B = Unbox<number[]>;   // number
          - type C = Unbox<boolean>;    // boolean (매칭 실패 → T 그대로)
 */

/* _____________ 여기에 코드 입력 _____________ */

type MyAwaited<T> = T extends PromiseLike<infer Val> ? MyAwaited<Val> : T;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/189/answer/ko
  > 정답 보기: https://tsch.js.org/189/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
