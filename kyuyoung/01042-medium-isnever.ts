type IsNever<T> = [T] extends [never] ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

/*
  배운점
  - T extends never 은 에서 never extends never은 애초에 분배 대상이 없기에 never로써 판단된다
*/
