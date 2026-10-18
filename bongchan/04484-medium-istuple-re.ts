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

// 🚀 시작: 2026-10-18 17:31
// ✅ 종료: 2026-10-18 17:40
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. never 가드
          - 테스트 케이스에서 제네릭 T에 never가 들어오는 케이스 대응

            type IsTuple<T> = [T] extends [never] ? false : 0;

      🔵 1-2. 튜플의 경우에는 length 프로퍼티 접근 시 number literal 값이 반환되는 점을 활용
        
          type IsTuple<T> = [T] extends [never]
            ? false
            : T extends unknown[]
              ? number extends T['length']
                ? false
                : true
              : false;

          - ❌ Expect<Equal<IsTuple<readonly [1]>, true>> 케이스 실패
            
      🔵 1-3. unknown[]으로 타입을 좁힐 때 readonly까지 검증해보기

        type IsTuple<T> = [T] extends [never]
          ? false
          : T extends readonly unknown[]
            ? number extends T['length']
              ? false
              : true
            : false;


  😆 배움
    - 

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
