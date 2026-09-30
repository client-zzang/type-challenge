/*
  9616 - Parse URL Params
  -------
  by Anderson. J (@andersonjoseph) #medium #infer #string #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL params string into an Union.

  ```ts
  ParseUrlParams<':id'> // id
  ParseUrlParams<'posts/:id'> // id
  ParseUrlParams<'posts/:id/:user'> // id | user
  ```

  > View on GitHub: https://tsch.js.org/9616
*/

/* _____________ Your Code Here _____________ */

// type ParseUrlParams<T extends string> = T extends ''
//   ? never
//   : T extends `${infer R}/:${infer F}/:${infer F2}/${infer R2}`
//     ? F | F2
//     : T extends `${infer R}/:${infer F}/:${infer F2}`
//       ? F | F2
//       : T extends `${infer R}/:${infer F}/`
//         ? F
//         : T extends `${infer R}/:${infer F}`
//           ? F
//           : T extends `:${infer F}`
//             ? F
//             : never

type ParseUrlParams<T extends string> =
  T extends `${infer L}/${infer R}`
    ? ParseUrlParams<L> | ParseUrlParams<R>
    : T extends `:${infer P}`
      ? P
      : never


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9616/answer
  > View solutions: https://tsch.js.org/9616/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 문자열을 직접 분리하기 => 더 간단하게 하는 방법은 없을까?

type ParseUrlParams<T extends string> = T extends ''
  ? never
  : T extends `${infer R}/:${infer F}/:${infer F2}/${infer R2}`
    ? F | F2
    : T extends `${infer R}/:${infer F}/:${infer F2}`
      ? F | F2
      : T extends `${infer R}/:${infer F}/`
        ? F
        : T extends `${infer R}/:${infer F}`
          ? F
          : T extends `:${infer F}`
            ? F
            : never


2. (정답 봄) 더 간단하게 하는 방법: 재귀 돌리기
- A/B, A/:B 패턴을 활용

type ParseUrlParams<T extends string> =
  T extends `${infer L}/${infer R}`
    ? ParseUrlParams<L> | ParseUrlParams<R>
    : T extends `:${infer P}`
      ? P
      : never
*/
