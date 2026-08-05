/*
  4179 - Flip
  -------
  by Farhan Kathawala (@kathawala) #medium #object

  ### Question

  Implement the type of `just-flip-object`. Examples:

  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```

  No need to support nested objects and values which cannot be object keys such as arrays

  > View on GitHub: https://tsch.js.org/4179
*/

/* _____________ Your Code Here _____________ */

type Flip<T extends Record<string, any>> = {[key in keyof T as `${T[key]}`]: key}

/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi', true: 'bool' }, Flip<{ pi: 3.14, bool: true }>>>,
  Expect<Equal<{ val2: 'prop2', val: 'prop' }, Flip<{ prop: 'val', prop2: 'val2' }>>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4179/answer
  > View solutions: https://tsch.js.org/4179/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. values를 어떻게 뽑지?
=> keyof T 유니온을 순회하며 뽑아보자
type Flip<T extends Record<any, any>> = {[key in T[keyof T]]: keyof T}
=> 3번 예제가 이렇게 나옴 (true는 제거되는 문제 발생):
{
    3.14: "pi" | "bool";
}
4번 예제는 이렇게 나옴:
{
    val: "prop" | "prop2";
    val2: "prop" | "prop2";
}

2. true가 제거되는 것 해결하기: 문자열 리터럴로 순회
{[key in `${T[keyof T]}`]: keyof T}

3. (힌트) keyof T를 순회하고 as 단언하기
type Flip<T extends Record<any, any>> = {[key in keyof T as `${T[key]}`]: key}

3-1. 타입을 좀 더 좁히기
type Flip<T extends Record<string, any>> = {[key in keyof T as `${T[key]}`]: key}
*/
