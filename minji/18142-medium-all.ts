/*
  18142 - All
  -------
  by cutefcc (@cutefcc) #medium #array

  ### Question

  Returns true if all elements of the list are equal to the second parameter passed in, false if there are any mismatches.

  For example

  ```ts
  type Test1 = [1, 1, 1]
  type Test2 = [1, 1, 2]

  type Todo = All<Test1, 1> // should be same as true
  type Todo2 = All<Test2, 1> // should be same as false
  ```

  > View on GitHub: https://tsch.js.org/18142
*/

/* _____________ Your Code Here _____________ */

type IsAny<T> = 0 extends 1 & T ? true : false

type All<T extends any[], U extends any> = T extends [infer F, ...infer R]
  ? [F] extends [U]
    ? [U] extends [F]
      ? IsAny<F> extends IsAny<U>
        ? All<R, U>
        : false
      : false
    : false
  : true

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<['1', '1', '1'], '1'>, true>>,
  Expect<Equal<All<['1', '1', '1'], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
  Expect<Equal<All<[never], never>, true>>,
  Expect<Equal<All<[any], any>, true>>,
  Expect<Equal<All<[unknown], unknown>, true>>,
  Expect<Equal<All<[any], unknown>, false>>,
  Expect<Equal<All<[unknown], any>, false>>,
  Expect<Equal<All<[1, 1, 2], 1 | 2>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/18142/answer
  > View solutions: https://tsch.js.org/18142/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. [] extends []로 비교하기

type All<T extends any[], U extends any> = T extends [infer F, ...infer R]
  ? [F] extends [U]
    ? All<R, U>
    : false
  : true


2. [F] extends [U] 방향을 반대로 바꿔서도 비교하기 => 마지막 케이스의 유니온은 잘 걸러지는데 unknwon 비교는 여전히 안되는 중

type All<T extends any[], U extends any> = T extends [infer F, ...infer R]
  ? [F] extends [U]
    ? [U] extends [F]
      ? All<R, U>
      : false
    : false
  : true

####################### 방법 1. Equal 사용 #######################

type All<T extends any[], U extends any> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? All<R, U>
    : false
  : true

####################### 방법 2. IsAny 트릭으로 any를 먼저 걸러내기 #######################
 0 extends 1 & T ? true : false는 T가 any일 때만 true
- 1 & any = any
- 1 & unknwon = 1

type IsAny<T> = 0 extends 1 & T ? true : false

type All<T extends any[], U extends any> = T extends [infer F, ...infer R]
  ? [F] extends [U]
    ? [U] extends [F]
      ? IsAny<F> extends IsAny<U>
        ? All<R, U>
        : false
      : false
    : false
  : true

*/
