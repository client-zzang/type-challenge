/*
  21106 - Combination key type
  -------
  by Nauxscript (@Nauxscript) #medium

  ### Question

  1. Combine multiple modifier keys, but the same modifier key combination cannot appear.
  2. In the `ModifierKeys` provided, the priority of the previous value is higher than the latter value; that is, `cmd ctrl` is OK, but `ctrl cmd` is not allowed.

  > View on GitHub: https://tsch.js.org/21106
*/

// 🚀 시작: 2026-10-17 14:43
// ✅ 종료: 2026-10-17
// 🥺 정답 확인 여부:

/*
  🤔 접근
    🔴 접근 1. ...

  😆 배움
    1. 튜플의 number 프로퍼티 유니온 접근

      type Combs<T extends string[] = ModifierKeys> = T extends [
        infer F extends string,
        ...infer R extends string[],
      ]
        ? `${F} ${R[number]}` | Combs<R>
        : never;

*/

/* _____________ Your Code Here _____________ */

// 实现 Combs
type Combs<T extends string[] = ModifierKeys> = T extends [
  infer F extends string,
  ...infer R extends string[],
]
  ? `${F} ${R[number]}` | Combs<R>
  : never;

type A = Combs<ModifierKeys>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn'];
type CaseTypeOne =
  | 'cmd ctrl'
  | 'cmd opt'
  | 'cmd fn'
  | 'ctrl opt'
  | 'ctrl fn'
  | 'opt fn';

type cases = [Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21106/answer
  > View solutions: https://tsch.js.org/21106/solutions
  > More Challenges: https://tsch.js.org
*/
