/*
  29650 - ExtractToObject
  -------
  by Maxim Bazuev (@bazuka5801) #medium #object

  ### Question

  Implement a type that extract prop value to the interface. The type takes the two arguments. The output should be an object with the prop values.
    Prop value is object.

    For example

  ```ts
  type Test = { id: '1', myProp: { foo: '2' }}
  type Result = ExtractToObject<Test, 'myProp'> // expected to be { id: '1', foo: '2' }
  ```

  > View on GitHub: https://tsch.js.org/29650
*/

// 🚀 시작: 2026-11-10 23:38
// ✅ 종료: 2026-11-10 23:46
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 제네릭 Prop key를 제외한 객체와 제네릭 Prop key의 객체를 intersection type으로 합치기

        type ExtractToObject<T, U extends keyof T> = Omit<
          {
            [P in keyof T as P extends U ? never : P]: T[P];
          } & T[U],
          never
        >;

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type ExtractToObject<T, U extends keyof T> = Omit<
  {
    [P in keyof T as P extends U ? never : P]: T[P];
  } & T[U],
  never
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type test1 = { id: '1'; myProp: { foo: '2' } };

type testExpect1 = {
  id: '1';
  foo: '2';
};

type test2 = {
  id: '1';
  prop1: { zoo: '2' };
  prop2: { foo: '4' };
};

type testExpect2 = {
  id: '1';
  prop1: { zoo: '2' };
  foo: '4';
};

type test3 = {
  prop1: { zoo: '2'; a: 2; b: 4; c: 7 };
  prop2: { foo: '4'; v: 2; d: 4; g: 7 };
  k: 289;
};

type testExpect3 = {
  zoo: '2';
  a: 2;
  b: 4;
  c: 7;
  prop2: { foo: '4'; v: 2; d: 4; g: 7 };
  k: 289;
};

type test4 = { id: '1'; myProp: { foo: '2' } };

type testExpect4 = {
  id: '1';
  myProp: { foo: '2' };
};

type cases = [
  Expect<Equal<ExtractToObject<test1, 'myProp'>, testExpect1>>,
  Expect<Equal<ExtractToObject<test2, 'prop2'>, testExpect2>>,
  Expect<Equal<ExtractToObject<test3, 'prop1'>, testExpect3>>,
  // @ts-expect-error
  Expect<Equal<ExtractToObject<test4, 'prop4'>, testExpect4>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/29650/answer
  > View solutions: https://tsch.js.org/29650/solutions
  > More Challenges: https://tsch.js.org
*/
