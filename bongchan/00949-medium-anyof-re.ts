/*
  949 - AnyOf
  -------
  by null (@kynefuk) #보통 #array

  ### 질문

  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

  Python의 `any` function을 타입 시스템으로 구현하세요

  배열을 사용하고 배열의 요소가 참이면 `true`를 반환합니다. 배열이 비어 있으면 `false`를 반환합니다

  예시:

  ```ts
  type Sample1 = AnyOf<[1, "", false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, "", false, [], {}]> // expected to be false.
  ```

  > GitHub에서 보기: https://tsch.js.org/949/ko
*/

// 🚀 시작: 2026-08-15 11:47
// ✅ 종료: 2026-08-15 12:04
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1.
      1-1. 빈배열을 확인하는 IsEmptyArray

        type IsEmptyArray<T extends any[]> = T extends [any, ...any] ? false : true;

      1-2. 빈객체를 확인하는 IsEmptyObject

        type IsEmptyObject<T extends {}> = [keyof T] extends [never] ? true : false;

      1-3. falsy 값을 확인하는 IsFalsy

        type IsFalsy<T> = T extends 0 | '' | false | undefined | null
          ? true
          : T extends {}
            ? T extends Array<unknown>
              ? IsEmptyArray<T>
              : IsEmptyObject<T>
            : false;

      1-4. 최종

        type IsEmptyArray<T extends any[]> = T extends [any, ...any] ? false : true;
        type IsEmptyObject<T extends {}> = [keyof T] extends [never] ? true : false;

        type IsFalsy<T> = T extends 0 | '' | false | undefined | null
          ? true
          : T extends {}
            ? T extends Array<unknown>
              ? IsEmptyArray<T>
              : IsEmptyObject<T>
            : false;

        type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
          ? IsFalsy<F> extends false
            ? true
            : AnyOf<R>
          : false;

  😆 배움
    1. 튜플[number]를 활용한 방법

      type FalseUnion =
        | 0
        | ''
        | false
        | undefined
        | null
        | []
        | { [key: string]: never };

      type AnyOf<T extends readonly any[]> = T[number] extends FalseUnion
        ? false
        : true;

    2. 빈객체를 확인하는 방법 Index Signature

      { [key: PropertyKey]: never };

*/

/* _____________ 여기에 코드 입력 _____________ */

type IsEmptyArray<T extends any[]> = T extends [any, ...any] ? false : true;
type IsEmptyObject<T extends {}> = [keyof T] extends [never] ? true : false;

type IsFalsy<T> = T extends 0 | '' | false | undefined | null
  ? true
  : T extends {}
    ? T extends Array<unknown>
      ? IsEmptyArray<T>
      : IsEmptyObject<T>
    : false;

type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? IsFalsy<F> extends false
    ? true
    : AnyOf<R>
  : false;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/949/answer/ko
  > 정답 보기: https://tsch.js.org/949/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
