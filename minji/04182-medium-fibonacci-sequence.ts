/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */
type Fibonacci<T extends number, CurrentIndex extends number[] = [1], Current extends number[] = [1], Prev extends number[] = []> = CurrentIndex['length'] extends T 
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], [...Prev, ...Current], Current>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 야매로 풀기
type Sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
type Fibonacci<T extends number> = Sequence[T]
=> 이게 맞나 싶어서 정답 찾아봄,,
*/
