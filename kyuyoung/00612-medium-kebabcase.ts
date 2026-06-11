// type Kebab<S extends string> = 
//   S extends `${infer First}${infer Rest}` 
//     ? First extends '-' | '_' | '' ? `${First}${Kebab<Rest>}`
//       : First extends Uppercase<First> ? `-${Lowercase<First>}${Kebab<Rest>}` : `${First}${Kebab<Rest>}`
//     : S
// type KebabCase<S extends string> = 
//   S extends `${infer First}${infer Rest}` 
//     ? `${Lowercase<First>}${Kebab<Rest>}`
//     : S

type KebabCase<S extends string> = 
  S extends `${infer First}${infer Rest}` 
    ? Rest extends Uncapitalize<Rest> ? `${Lowercase<First>}${KebabCase<Rest>}` : `${Lowercase<First>}-${KebabCase<Rest>}`
    : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/*
  배운점
  - Capitalize, UnCapitalize 타입
*/
