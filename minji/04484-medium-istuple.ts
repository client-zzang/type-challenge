/*
  4484 - IsTuple
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple

  ### Question

  Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.

  For example:

  ```typescript
  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false
  ```

  > View on GitHub: https://tsch.js.org/4484
*/

/* _____________ Your Code Here _____________ */

type IsTuple<T> = [T] extends [never] ? false : T extends readonly any[] ? number extends T['length'] ? false : true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4484/answer
  > View solutions: https://tsch.js.org/4484/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 분해 방식으로 접근해보기
type IsTuple<T> = [T] extends [never] ? false : T extends [] ? true : T extends [infer F, ...infer R] ? true : false
=> readonly가 걸러지지 않는다

2. (힌트) number[]와 [1] 구분점: 'length' 씌워보기
- number[]['length'] = number
- [1]['length'] = 1

3. type IsTuple<T> = T extends readonly any[] ? T['length'] extends number ? false : true : false
=> 1,2,3,6 케이스가 오답
=> T['length'] extends number 비교를 뒤집기 (T['length']는 number의 서브타입이기 때문)

ex. []['length'] = 0       // 0 extends number (true)
ex. [number]['length'] = 1 // 1 extends number (true)
=> T['length'] extends number는 항상 true

반대로 뒤집으면:
number extends []['length'] // number extends 0 (false)
number extends number       // number extends number (true)

4. (정답)
type IsTuple<T> = [T] extends [never] ? false : T extends readonly any[] ? number extends T['length'] ? false : true : false
*/
