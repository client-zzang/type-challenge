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

// 🚀 시작: 2026-10-05 22:24
// ✅ 종료: 2026-10-05 22:42
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Mapped Types로 key, value 타입 변경

      type Flip<T extends Record<PropertyKey, PropertyKey>> = {
        [P in keyof T as T[P]]: P;
      };

      - ❌ Flip<{ pi: 3.14; bool: true }> 여기에서 boolean 타입 대응이 되지 않음

    2. Record의 value 타입을 테스트 케이스의 value 타입으로 제한

      type MyPropertyKey = string | number | boolean;

      type Flip<T extends Record<PropertyKey, MyPropertyKey>> = {
        [P in keyof T as `${T[P]}`]: P;
      };

  😆 배움
    - 

*/

/* _____________ Your Code Here _____________ */

type MyPropertyKey = string | number | boolean;

type Flip<T extends Record<PropertyKey, MyPropertyKey>> = {
  [P in keyof T as `${T[P]}`]: P;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<
    Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4179/answer
  > View solutions: https://tsch.js.org/4179/solutions
  > More Challenges: https://tsch.js.org
*/
