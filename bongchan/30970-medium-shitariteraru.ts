/*
  30970 - IsFixedStringLiteralType
  -------
  by 蛭子屋双六 (@sugoroku-y) #medium

  ### Question

  Sometimes you may want to determine whether a string literal is a definite type. For example, when you want to check whether the type specified as a class identifier is a fixed string literal type.

  ```typescript
  type Action<ID extends string> = { readonly id: ID };
  ```

  Since it must be fixed, the following types must be determined as false.

  * never type
  * Union of string literal types
  * Template literal types with embedded string, number, bigint, boolean

  Determine whether the given type S is a definite string literal type.

  > View on GitHub: https://tsch.js.org/30970
*/

// 🚀 시작: 2026-11-23 16:39
// ✅ 종료: 2026-11-23 18:08
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    🔴 접근 1. 🤖 (AI 힌트 받음)
      🔵 1-1. never 조기 반환

        type IsFixedStringLiteralType<S extends string> = [S] extends [never]
          ? false
          : 'TODO';

      🔵 1-2. IsUnion 유틸 타입으로 유니온 찾기

        type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : false;

        type IsFixedStringLiteralType<S extends string> = [S] extends [never]
          ? false
          : IsUnion<S> extends true
            ? false
            : 'TODO';

      🔵 1-3. 무한한 문자열 찾기(Record 타입으로 확정 문자열과 구분)

        type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : false;

        type IsFixedStringLiteralType<S extends string> = [S] extends [never]
          ? false
          : IsUnion<S> extends true
            ? false
            : {} extends Record<S, 1>
              ? false
              : true;

  😆 배움
    1. Record를 활용한 확정 문자열, 무한 문자열 구분

      - string, `ABC${number}` 같은 무한 문자열을 Record의 key로 쓰면 인덱스 시그니처가 됨
      - 인덱스 시그니처 객체는 key가 0개여도 돼서 {}가 할당된다. 확정 문자열 key는 필수 속성이 되어 {}가 할당되지 않는다.

*/

/* _____________ Your Code Here _____________ */

type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : false;

type IsFixedStringLiteralType<S extends string> = [S] extends [never]
  ? false
  : IsUnion<S> extends true
    ? false
    : {} extends Record<S, 1>
      ? false
      : true;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type testcase =
  | Expect<Equal<IsFixedStringLiteralType<'ABC'>, true>>
  | Expect<Equal<IsFixedStringLiteralType<string>, false>>
  | Expect<Equal<IsFixedStringLiteralType<'ABC' | 'DEF'>, false>>
  | Expect<Equal<IsFixedStringLiteralType<never>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${string}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${string & {}}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${number}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${bigint}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${boolean}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${true}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${false}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${null}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${undefined}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string & {}}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${number}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${bigint}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${boolean}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${true}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${false}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${null}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${undefined}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${string}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${string & {}}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${number}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${bigint}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${boolean}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${true}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${false}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${null}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${undefined}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string & {}}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${number}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${bigint}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${boolean}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${true}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${false}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${null}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${undefined}DEF`>, true>>
  | true;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30970/answer
  > View solutions: https://tsch.js.org/30970/solutions
  > More Challenges: https://tsch.js.org
*/
