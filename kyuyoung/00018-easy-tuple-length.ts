/* _____________ Your Code Here _____________ */

type Length<T extends readonly string[]> = T['length'];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

/* _____________ Further Steps _____________ */
/*
  배운점
  - readonly 가 꼭 붙어야 하나 했는데, 그렇지 않으면 배열이 변할 수 있어서 특정 숫자 타입이 아닌 number 타입으로 반환됨을 배움
*/
