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

/* _____________ 여기에 코드 입력 _____________ */

type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (...args: infer Arg) => infer R ? (...args: [...Arg, A]) => R : never

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/191/answer/ko
  > 정답 보기: https://tsch.js.org/191/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/*
접근 1
type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (...args) => any ? true: false
- args의 타입을 꺼내와야 한다
- (임시값이긴 하지만) 결과가 함수 타입이 되어야 한다

접근 2
type AppendArgument<Fn extends (...args: infer Arg) => infer R, A> = Fn extends (...args: [...infer Arg, A]) => R ? true : false
- infer는 extends 조건 안에서만 쓸 수 있다 => ...args: infer Arg는 사용 불가!
- Fn 타입 제한 후, 우측에서 Fn이 args를 extends했는지를 봐야 한다
- 우측에서 Fn의 타입을 확인해서 조건에 맞다면 함수를 반환해야 한다

*/
