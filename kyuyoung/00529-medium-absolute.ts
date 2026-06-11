type NonNumber = '-' | 'n' | '_'
type Minus = '-'

// type Absolute<T extends number | string | bigint> = `${T}` extends `${NonNumber}${infer Rest}` ? Absolute<Rest> : `${T}`;
type Absolute<T extends number | string | bigint> = `${T}` extends `${Minus}${infer Rest}` ? Rest : `${T}`;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

/*
  배운점
  - Number, String 자동 변환 시 _, n은 알아서 사라짐
*/
