/*
  191 - Append Argument
  -------
  by Maciej Sikora (@maciejsikora) #보통 #arguments

  ### 질문

  함수 타입 `Fn`과 어떤 타입 `A`가 주어질 때 `Fn`의 인수와 `A`를 마지막 인수로 받는 `Fn`과 동일한 함수 유형인 `G`를 생성하세요.

  예시 :

  ```typescript
  type Fn = (a: number, b: string) => number

  type Result = AppendArgument<Fn, boolean>
  // 기대되는 결과는 (a: number, b: string, x: boolean) => number 입니다.
  ```

  > 이 문제는 [@maciejsikora](https://github.com/maciejsikora)가 작성한 [원문 글](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c)에서 발췌했습니다.

  > GitHub에서 보기: https://tsch.js.org/191/ko
*/

// 🚀 시작: 2026-05-23 23:50
// ✅ 종료: 2026-05-23 00:19
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 제네릭 Fn을 extends Function으로 타입 좁히기

      type AppendArgument<Fn extends Function, A> = any;

    2. infer을 활용해서 제네릭 Fn에서 매개변수 타입, return 타입 추출

      type AppendArgument<Fn extends Function, A> = Fn extends (
        ...args: infer Args
      ) => infer R
        ? (x: A, ...args: Args) => R
        : never;

      - Case2는 통과하는데 Case1은 통과하지 못함
        - rest 매개변수는 항상 맨 뒤에 위치 해야해서 이슈 발생
        - type Case1 = (x: boolean, a: number, b: string) => number
        - type Result1 = (a: number, b: string, x: boolean) => number;
      
      - rest 매개변수 하나만 두고 rest 매개변수의 타입을 배열로 받기

        type AppendArgument<Fn extends Function, A> = Fn extends (
          ...args: infer Args
        ) => infer R
          ? (...args: [...Args, x: A]) => R
          : never;

  😆 배움
    1. Labeled Tuple Elements
      - 튜플 요소를 라벨링하여 함수 시그니처에서 매개변수 이름으로 노출
        - type Args = [a: number, b: string]
        - (...args: [...Args, x: A]) => void
          - (a: number, b: string, x: A) => void
      - https://www.typescriptlang.org/ko/docs/handbook/release-notes/typescript-4-0.html#%EB%9D%BC%EB%B2%A8%EB%A7%81%EB%90%9C-%ED%8A%9C%ED%94%8C-%EC%9A%94%EC%86%8C-labeled-tuple-elements

*/

/* _____________ 여기에 코드 입력 _____________ */

type AppendArgument<Fn extends Function, A> = Fn extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, x: A]) => R
  : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/191/answer/ko
  > 정답 보기: https://tsch.js.org/191/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
