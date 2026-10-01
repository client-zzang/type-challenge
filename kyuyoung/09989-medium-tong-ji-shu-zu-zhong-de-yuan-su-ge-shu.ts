type CountElementNumberToObject<T extends any[], U extends Record<PropertyKey, any[]> = {}> = T extends [infer First, ...infer Rest]
  ? [First] extends [never]
    ? CountElementNumberToObject<Rest, U>
    : First extends any[]
      ? CountElementNumberToObject<[...First, ...Rest], U>
      : CountElementNumberToObject<Rest, {
        [P in keyof U | First & PropertyKey]: P extends keyof U ? P extends First ? [...U[P], any] : U[P] : [any]
      }>
  : {
    [P in keyof U]: U[P]['length']
  }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

