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

/* _____________ Your Code Here _____________ */
type IsUnion<S extends string, Copy = S> = S extends S
  ? [Copy] extends [S]
    ? false
    : true
  : never

type IsFixedStringLiteralType<S extends string> = IsUnion<S> extends true
  ? false
  : {} extends Record<S, 1>
    ? false
    : true

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

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
  | true

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30970/answer
  > View solutions: https://tsch.js.org/30970/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 문자열만 있는 케이스와 boolean을 어떻게 분리?
type TrueType = true | false | null | undefined

type IsFixedStringLiteralType<S extends string> = [S] extends [never]
  ? false
  : S extends `${TrueType}`
    ? true
    : S extends `${string}${TrueType}${string}`
      ? true
      : false


2. (AI 힌트) 유니온 판별 + 객체로 판별해보기

// 유니온 판별
type IsUnion<S extends string> = S extends S
  ? [S] extends [S]
    ? false
    : true
  : never

// 객체로 판별
// Record<'string', 1>에는 {} 할당 불가능
// Record<string, 1>은 인덱스 시그니처가 되어 {} 할당 가능 
type IsFixedStringLiteralType<S extends string> = IsUnion<S> extends true
  ? false
  : Record<S, 1> extends {}
    ? false
    : true

- IsUnion이 항상 false를 반환하게 됨 ([S] extends [S]는 항상 true (멤버 하나를 자기 자신과 비교하는 것) => Copy 복사본을 둬야 함)
- Record<S, 1> extends {}에서, {}은 거의 모든 타입을 받아들임 => 어떤 Record든 {}에 할당됨 => 방향을 바꿔보기

*/
