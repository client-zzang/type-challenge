type Tup<N extends number, A extends 0[] = []> =
  A['length'] extends N ? A : Tup<N, [...A, 0]>

type AddDigit<A extends number, B extends number, C extends number> =
  [...Tup<A>, ...Tup<B>, ...Tup<C>]['length'] & number

type Reverse<S extends string> =
  S extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : ''

type AddRev<A extends string, B extends string, C extends number = 0> =
  A extends `${infer a extends number}${infer AR}`
    ? B extends `${infer b extends number}${infer BR}`
      ? Carry<AddDigit<a, b, C>, AR, BR>
      : Carry<AddDigit<a, 0, C>, AR, ''>
    : B extends `${infer b extends number}${infer BR}`
      ? Carry<AddDigit<0, b, C>, '', BR>
      : C extends 0 ? '' : `${C}`

type Carry<S extends number, AR extends string, BR extends string> =
  `${S}` extends `1${infer D extends number}`
    ? `${D}${AddRev<AR, BR, 1>}`
    : `${S}${AddRev<AR, BR, 0>}`

type Times<A extends string, D extends number, Acc extends string = '0', I extends 0[] = []> =
  I['length'] extends D ? Acc : Times<A, D, AddRev<Acc, A>, [...I, 0]>

type MulRev<A extends string, B extends string, Shift extends string = '', Acc extends string = '0'> =
  B extends `${infer b extends number}${infer BR}`
    ? MulRev<A, BR, `${Shift}0`, AddRev<Acc, `${Shift}${Times<A, b>}`>>
    : Acc

type Abs<N extends number> = `${N}` extends `-${infer P}` ? P : `${N}`

type Square<N extends number> = N extends 0
  ? 0
  : Reverse<MulRev<Reverse<Abs<N>>, Reverse<Abs<N>>>> extends `${infer R extends number}`
    ? R
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,
  Expect<Equal<Square<101>, 10201>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
]
