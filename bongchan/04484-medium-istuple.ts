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

// 🚀 시작: 2026-08-13 00:30
// ✅ 종료: 2026-08-13 00:40
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 배열['length'] 의 결과는 number, 튜플['length'] 의 결과는 number literal 임을 활용
      1-1.

        type IsTuple<T> = [T] extends [never]
          ? false
          : T extends Array<unknown>
            ? number extends T['length']
              ? false
              : true
            : false;
        
        - ❌ IsTuple<readonly [1]> 해당 케이스에서 실패
        - T extends Array<unknown> 이 구문에서 타입에 좁혀지지 않아서 false 반환

      1-2.

        type IsTuple<T> = [T] extends [never]
          ? false
          : T extends readonly unknown[] // ✅ Array<unknown> 을 readonly unknown 으로 변경하니까 해결
            ? number extends T['length']
              ? false
              : true
            : false;

  😆 배움
    1. readonly Array<unknown> 이 되지 않는 이유
      - 문법 제약 readonly 타입 한정자는 배열/튜플 리터럴 문법(T[], [A, B]] 에만 붙일 수 있다.
      - 만약 제네릭 문법으로 readonly 타입을 쓰고 싶다면 ReadonlyArray 사용

*/

/* _____________ Your Code Here _____________ */

type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly unknown[]
    ? number extends T['length']
      ? false
      : true
    : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4484/answer
  > View solutions: https://tsch.js.org/4484/solutions
  > More Challenges: https://tsch.js.org
*/
