/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #보통 #object-keys

  ### 질문

  객체 유형에서 인덱스 시그니처를 제외하는 `RemoveIndexSignature<T>`를 구현하세요

  예시:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > GitHub에서 보기: https://tsch.js.org/1367/ko
*/

// 🚀 시작: 2026-08-23 23:55
// ✅ 종료: 2026-08-24 00:17
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. index signature를 keyof 했을 때 key가 PropertyKey로 나오는 것을 타입 제한

      type RemoveIndexSignature<T> = {
        [K in keyof T as K extends PropertyKey
          ? PropertyKey extends K
            ? never
            : K
          : K]: T[K];
      };

  😆 배움
    - 내가 접근한 방법으로 풀이된 답

      type RemoveIndexSignature<T, P = PropertyKey> = {
        [K in keyof T as K extends P ? (P extends K ? never : K) : K]: T[K];
      };

      - PropertyKey는 타입 파라미터가 아니라 구체 타입이라 분배가 일어나지 않음

*/

/* _____________ 여기에 코드 입력 _____________ */

type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as K extends P ? (P extends K ? never : K) : K]: T[K];
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol('foobar');
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/1367/answer/ko
  > 정답 보기: https://tsch.js.org/1367/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
