/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #쉬움 #array

  ### 질문

  배열(튜플) `T`를 받아 첫 원소의 타입을 반환하는 제네릭 `First<T>`를 구현하세요.

  예시:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > GitHub에서 보기: https://tsch.js.org/14/ko
*/

// 🚀 시작: 2026-04-19 18:02
// ✅ 종료: 2026-04-19 18:31
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    튜플의 길이가 0일 때, never를 반환하는 삼항연산자를 사용하면 될 것 같다고 생각
    type First<T extends any[]> = T[0]; // 여기에서 튜플의 길이를 타입스크립트로 어떻게 체크할 지 모르겠음
    
    type Test = First<[]>; // undefined

    튜플은 배열 메서드도 포함하고 있기 때문에 length 프로퍼티가 존재하는 것으로 접근
    
    type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

    type Test = First<[]>; // 0

    참조: https://blog.cometkim.kr/posts/typescript-tuples/

  😆 배움
    튜플의 길이를 참조할 때 튜플['length'] 로 접근하면 튜플의 길이를 타입으로 가져올 수 있다.
    
 */

/* _____________ 여기에 코드 입력 _____________ */

type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

type Test = First<[]>;
type Test2 = First<[undefined]>;
type Test3 = First<[() => 123, { a: string }]>;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
];

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/14/answer/ko
  > 정답 보기: https://tsch.js.org/14/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
