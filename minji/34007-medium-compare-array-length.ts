/*
  34007 - Compare Array Length
  -------
  by alviner (@ScriptBloom) #medium #recursion #array

  ### Question

  Implement `CompareArrayLength` to compare two array length(T & U).

  If length of T array is greater than U, return 1;
  If length of U array is greater than T, return -1;
  If length of T array is equal to U, return 0.

  > View on GitHub: https://tsch.js.org/34007
*/

/* _____________ Your Code Here _____________ */

type CompareArrayLength<T extends unknown[], U extends unknown[]> = T['length'] extends U['length'] // 길이가 같으면 true
  ? 0
  : `${U['length']}` extends keyof T ? 1 : -1;
  
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CompareArrayLength<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength<[], []>, 0>>,
  Expect<Equal<CompareArrayLength<[1, 2, 3], [4, 5, 6]>, 0>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/34007/answer
  > View solutions: https://tsch.js.org/34007/solutions
  > More Challenges: https://tsch.js.org
*/

/*
(내가 쓴 답)
type CompareArrayLength<T extends any[], U extends any[]> = T['length'] extends 0
  ? U['length'] extends 0
    ? 0
    : -1
  : U['length'] extends 0
    ? 1
    : CompareArrayLength<T extends [infer _, ...infer R] ? R : T, U extends [infer _, ...infer R] ? R : U>

(다른 답)
type CompareArrayLength<T extends unknown[], U extends unknown[]> = T['length'] extends U['length'] // 길이가 같으면 true
  ? 0
  : `${U['length']}` extends keyof T ? 1 : -1; // keyof T는 인덱스 | "length" | "push" ... => keyof [1,2]라면 "0" | "1" | "length" | "push" | ...가 되는 것임
=> U의 길이가 keyof T에 속한다 === T가 길이가 더 길다는 뜻

*/
