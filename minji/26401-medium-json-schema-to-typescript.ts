/*
  26401 - JSON Schema to TypeScript
  -------
  by null (@aswinsvijay) #medium #JSON

  ### Question

  Implement the generic type JSONSchema2TS which will return the TypeScript type corresponding to the given JSON schema.

  Additional challenges to handle:
  * additionalProperties
  * oneOf, anyOf, allOf
  * minLength and maxLength

  > View on GitHub: https://tsch.js.org/26401
*/

/* _____________ Your Code Here _____________ */
// // Primitive types
// type ChangePrimitiveType<P> = P extends 'string' 
//   ? string
//   : P extends 'number'
//     ? number
//     : P extends 'boolean'
//       ? boolean
//       : never

// // Enums
// type ChangeEnumsToUnion<E extends any[]> = E[number]

// type JSONSchema2TS<T extends Record<'type', string> & Partial<Record<'enum', any[]> & Record<"properties", object>>> = T['enum'] extends any[]
//   ? ChangeEnumsToUnion<T["enum"]>
//   : T["properties"] extends object
//     ? T["properties"]
//     : T["type"] extends 'string' | 'number' | 'boolean'
//       ? ChangePrimitiveType<T["type"]>
//       : T["type"] extends 'object'
//         ? Record<string, unknown>
//         : never

// Primitive 타입
type Primitives = { string: string; number: number; boolean: boolean }

// Object 타입 
type HandleObject<T> = T extends { properties: infer P extends Record<string, unknown> } // properties가 있을 때
  ? T extends { required: infer R extends readonly string[] } // required array에 존재하는 프로퍼티 분리
    ? Omit< // 아무 키도 빼지 않고 모든 키를 다시 순회해 평탄화 => &를 없앰 
        { [K in keyof P as K extends R[number] ? K : never]: JSONSchema2TS<P[K]> } & // K가 R (required array)에 있으면 놔두고 (required), 없으면 never 처리
        { [K in keyof P as K extends R[number] ? never : K]?: JSONSchema2TS<P[K]> }, // K가 R (required array)에 있으면 never 처리하고, 없으면 그대로 놔둠 (optional)
        never
      >
    : { [K in keyof P]?: JSONSchema2TS<P[K]> } // Optional 타입으로 넣어주기
  : Record<string, unknown> // properties 없이 type만 존재하는 object일 때

// Array 타입
type HandleArray<T> = T extends { items: infer I } ? JSONSchema2TS<I>[] : unknown[] // items가 있으면 재귀 돌려 items.type[]으로 만들고, items가 없으면 unknown[] 반환

type JSONSchema2TS<T> = T extends { enum: infer E extends readonly unknown[] } // enum 있을 때 여부 먼저 걸러내기 - enum이 존재하면 type이 뭐든 결과가 enum값들의 유니온으로 정해지기 때문
  ? E[number] // 유니온 만들기
  : T extends { type: infer Ty }
    ? Ty extends keyof Primitives
      ? Primitives[Ty]
      : Ty extends 'object'
        ? HandleObject<T>
        : Ty extends 'array'
          ? HandleArray<T>
          : never
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// + Primitive types
type Type1 = JSONSchema2TS<{
  type: 'string'
}>
type Expected1 = string
type Result1 = Expect<Equal<Type1, Expected1>>

type Type2 = JSONSchema2TS<{
  type: 'number'
}>
type Expected2 = number
type Result2 = Expect<Equal<Type2, Expected2>>

type Type3 = JSONSchema2TS<{
  type: 'boolean'
}>
type Expected3 = boolean
type Result3 = Expect<Equal<Type3, Expected3>>
// - Primitive types

// + Enums
type Type4 = JSONSchema2TS<{
  type: 'string'
  enum: ['a', 'b', 'c']
}>
type Expected4 = 'a' | 'b' | 'c'
type Result4 = Expect<Equal<Type4, Expected4>>

type Type5 = JSONSchema2TS<{
  type: 'number'
  enum: [1, 2, 3]
}>
type Expected5 = 1 | 2 | 3
type Result5 = Expect<Equal<Type5, Expected5>>
// - Enums

// + Object types
type Type6 = JSONSchema2TS<{
  type: 'object'
}>
type Expected6 = Record<string, unknown>
type Result6 = Expect<Equal<Type6, Expected6>>

type Type7 = JSONSchema2TS<{
  type: 'object'
  properties: {}
}>
type Expected7 = {}
type Result7 = Expect<Equal<Type7, Expected7>>

type Type8 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
    }
  }
}>
type Expected8 = {
  a?: string
}
type Result8 = Expect<Equal<Type8, Expected8>>
// - Object types

// + Arrays
type Type9 = JSONSchema2TS<{
  type: 'array'
}>
type Expected9 = unknown[]
type Result9 = Expect<Equal<Type9, Expected9>>

type Type10 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'string'
  }
}>
type Expected10 = string[]
type Result10 = Expect<Equal<Type10, Expected10>>

type Type11 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
  }
}>
type Expected11 = Record<string, unknown>[]
type Result11 = Expect<Equal<Type11, Expected11>>
// - Arrays

// + Mixed types
type Type12 = JSONSchema2TS<{
  type: 'object'
  properties: {
    a: {
      type: 'string'
      enum: ['a', 'b', 'c']
    }
    b: {
      type: 'number'
    }
  }
}>
type Expected12 = {
  a?: 'a' | 'b' | 'c'
  b?: number
}
type Result12 = Expect<Equal<Type12, Expected12>>

type Type13 = JSONSchema2TS<{
  type: 'array'
  items: {
    type: 'object'
    properties: {
      a: {
        type: 'string'
      }
    }
  }
}>
type Expected13 = {
  a?: string
}[]
type Result13 = Expect<Equal<Type13, Expected13>>
// - Mixed types

// + Required fields
type Type14 = JSONSchema2TS<{
  type: 'object'
  properties: {
    req1: { type: 'string' }
    req2: {
      type: 'object'
      properties: {
        a: {
          type: 'number'
        }
      }
      required: ['a']
    }
    add1: { type: 'string' }
    add2: {
      type: 'array'
      items: {
        type: 'number'
      }
    }
  }
  required: ['req1', 'req2']
}>
type Expected14 = {
  req1: string
  req2: { a: number }
  add1?: string
  add2?: number[]
}
type Result14 = Expect<Equal<Type14, Expected14>>
// - Required fields

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/26401/answer
  > View solutions: https://tsch.js.org/26401/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 케이스 분류 => 6번 케이스가 undefined에 걸리지 않는다.

// Primitive types
type ChangePrimitiveType<P> = P extends 'string' 
  ? string
  : P extends 'number'
    ? number
    : P extends 'boolean'
      ? boolean
      : never

// Enums
type ChangeEnumsToUnion<E extends any[]> = E[number]

type JSONSchema2TS<T extends Record<'type', string> & Partial<Record<'enum', any[]> & Record<"properties", object>>> = T['enum'] extends any[]
  ? ChangeEnumsToUnion<T["enum"]>
  : T["properties"] extends object
    ? T["properties"] extends undefined
      ? unknown
      : T["properties"]
    : T["type"] extends 'string' | 'number' | 'boolean'
      ? ChangePrimitiveType<T["type"]>
      : true                                    // 여기에 걸리게 되어 true가 나옴


type Type6 = JSONSchema2TS<{
  type: 'object'
}>
type Expected6 = Record<string, unknown>


=> 해결 방법: object를 따로 두기 => properties에 object가 나오는 케이스부터 실패.... 정답 보기 
type JSONSchema2TS<T extends Record<'type', string> & Partial<Record<'enum', any[]> & Record<"properties", object>>> = T['enum'] extends any[]
  ? ChangeEnumsToUnion<T["enum"]>
  : T["properties"] extends object
    ? T["properties"]
    : T["type"] extends 'string' | 'number' | 'boolean'
      ? ChangePrimitiveType<T["type"]>
      : T["type"] extends 'object' // 여기 

        ? Record<string, unknown>
        : never

*/
