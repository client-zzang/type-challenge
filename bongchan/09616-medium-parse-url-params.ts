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

// 🚀 시작: 2026-09-20 12:36
// ✅ 종료: 2026-09-20 12:48
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Template Literal 활용
      - 동적 param을 구성하는 :(콜론)으로 infer를 추출
      - 추출한 infer의 끝에 /가 있다면 경로가 더 있다고 판단하고 재귀
      - /가 없다면 추출한 Result(params)와 유니온으로 결합

        type ParseUrlParams<
          T extends string,
          Result = never,
        > = T extends `${string}:${infer Params}`
          ? Params extends `${infer Param}/${infer Rest}`
            ? ParseUrlParams<Rest, Result | Param>
            : Result | Params
          : Result;

  😆 배움
    - 다른 풀이
      - 제네릭을 추가하지 않고 풀이한 방법

        type ParseUrlParams<T> = T extends `${string}:${infer R}`
          ? R extends `${infer P}/${infer L}`
            ? P | ParseUrlParams<L>
            : R
          : never;

*/

/* _____________ Your Code Here _____________ */

type ParseUrlParams<
  T extends string,
  Result = never,
> = T extends `${string}:${infer Params}`
  ? Params extends `${infer Param}/${infer Rest}`
    ? ParseUrlParams<Rest, Result | Param>
    : Result | Params
  : Result;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9616/answer
  > View solutions: https://tsch.js.org/9616/solutions
  > More Challenges: https://tsch.js.org
*/
