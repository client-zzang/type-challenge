/* _____________ Your Code Here _____________ */

type TupleToObject<T extends readonly any[]> = {
  [k in T[number]]: k
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1, 2: 2, 3: 3, 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1, [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1, '2': '2', 3: 3, '4': '4', [sym1]: typeof sym1 }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

/*
  배운점
  - Array[number] number 연산자를 통해 배열을 union 타입을 바꿀 수 있다는 건 알고 있었는데 k in 뒤에 활용할 생각을 못했다
  - any[] 가 왜 ts-expect-error를 충족하지 못하는지 몰랐음. object의 키 값이 될 수 있는 string, number, symbol로 타입을 제한하기 위함이란 점을 배움. (답안에는 몰랐어서 any 유지했습니다)
*/
