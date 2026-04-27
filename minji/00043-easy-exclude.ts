/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #easy #built-in #union

  ### Question

  Implement the built-in `Exclude<T, U>`

  > Exclude from `T` those types that are assignable to `U`

  For example:

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > View on GitHub: https://tsch.js.org/43
*/

/* _____________ Your Code Here _____________ */

type MyExclude<T extends any, U> = T extends U ? never : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/

/*
배운 점
- Omit과 Exclude 차이점
  - Omit: interface 객체에서 특정 프로퍼티를 제외한 나머지 프로퍼티들의 타입 생성
  - Exclude: union type에서 특정 유니온 멤버를 제외한 나머지 유니온 멤버들의 타입 생성 => 이 문제에서는 Exclude 적용
- never 타입은 유니온에서 자동으로 사라짐 (필터링 패턴)
- 분배 패턴: T extends U => T를 그대로 사용 (naked) => T를 분배하여 각 원소들을 비교함
  - 만약 [T] extends [U] 형태로 사용한다면 => [T]는 naked가 아니므로 분배가 적용되지 않음 => [T]와 [U]를 그대로 비교하게 됨
    ex. 분배 패턴 적용) 'a' | 'b' | 'c'의 각각의 유니온 타입과 'a'를 비교
    ex. 분배 패턴 미적용) ['a' | 'b' | 'c']와 ['a'] 자체를 비교
*/
