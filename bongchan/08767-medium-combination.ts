/*
  8767 - Combination
  -------
  by Homyee King (@HomyeeKing) #medium #array #application #string

  ### Question

  Given an array of strings, do Permutation & Combination.
  It's also useful for the prop types like video [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)

  ```ts
  // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
  type Keys = Combination<['foo', 'bar', 'baz']>
  ```

  > View on GitHub: https://tsch.js.org/8767
*/

// 🚀 시작: 2026-09-12 19:11
// ✅ 종료: 2026-09-12 19:40
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 배열을 유니온으로 변환

      type ArrayToUnion<Arr extends unknown[]> = Arr extends [infer F, ...infer R]
        ? F | ArrayToUnion<R>
        : never;

      type Combination<
        T extends string[],
        U extends string = ArrayToUnion<T>,
        K extends string = ArrayToUnion<T>,
      > = K extends K ? `${K}` : never;

    2. Exclude 하면서 유니온으로 합치기

      type ArrayToUnion<Arr extends unknown[]> = Arr extends [infer F, ...infer R]
        ? F | ArrayToUnion<R>
        : never;

      type Combination<
        T extends string[],
        U extends string = ArrayToUnion<T>,
        K extends string = U,
      > = K extends K ? K | `${K} ${Combination<T, Exclude<U, K>>}` : never;

  😆 배움
    - number를 이용한 배열을 유니온화

      type Combination<
        T extends string[],
        All = T[number],
        Item = All,
      > = Item extends string
        ? Item | `${Item} ${Combination<[], Exclude<All, Item>>}`
        : never;

*/

/* _____________ Your Code Here _____________ */

type ArrayToUnion<Arr extends unknown[]> = Arr extends [infer F, ...infer R]
  ? F | ArrayToUnion<R>
  : never;

type Combination<
  T extends string[],
  U extends string = ArrayToUnion<T>,
  K extends string = U,
> = K extends K ? K | `${K} ${Combination<T, Exclude<U, K>>}` : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<
      Combination<['foo', 'bar', 'baz']>,
      | 'foo'
      | 'bar'
      | 'baz'
      | 'foo bar'
      | 'foo bar baz'
      | 'foo baz'
      | 'foo baz bar'
      | 'bar foo'
      | 'bar foo baz'
      | 'bar baz'
      | 'bar baz foo'
      | 'baz foo'
      | 'baz foo bar'
      | 'baz bar'
      | 'baz bar foo'
    >
  >,
  Expect<
    Equal<
      Combination<['apple', 'banana', 'cherry']>,
      | 'apple'
      | 'banana'
      | 'cherry'
      | 'apple banana'
      | 'apple cherry'
      | 'banana apple'
      | 'banana cherry'
      | 'cherry apple'
      | 'cherry banana'
      | 'apple banana cherry'
      | 'apple cherry banana'
      | 'banana apple cherry'
      | 'banana cherry apple'
      | 'cherry apple banana'
      | 'cherry banana apple'
    >
  >,
  Expect<
    Equal<
      Combination<['red', 'green', 'blue', 'yellow']>,
      | 'red'
      | 'green'
      | 'blue'
      | 'yellow'
      | 'red green'
      | 'red blue'
      | 'red yellow'
      | 'green red'
      | 'green blue'
      | 'green yellow'
      | 'blue red'
      | 'blue green'
      | 'blue yellow'
      | 'yellow red'
      | 'yellow green'
      | 'yellow blue'
      | 'red green blue'
      | 'red green yellow'
      | 'red blue green'
      | 'red blue yellow'
      | 'red yellow green'
      | 'red yellow blue'
      | 'green red blue'
      | 'green red yellow'
      | 'green blue red'
      | 'green blue yellow'
      | 'green yellow red'
      | 'green yellow blue'
      | 'blue red green'
      | 'blue red yellow'
      | 'blue green red'
      | 'blue green yellow'
      | 'blue yellow red'
      | 'blue yellow green'
      | 'yellow red green'
      | 'yellow red blue'
      | 'yellow green red'
      | 'yellow green blue'
      | 'yellow blue red'
      | 'yellow blue green'
      | 'red green blue yellow'
      | 'red green yellow blue'
      | 'red blue green yellow'
      | 'red blue yellow green'
      | 'red yellow green blue'
      | 'red yellow blue green'
      | 'green red blue yellow'
      | 'green red yellow blue'
      | 'green blue red yellow'
      | 'green blue yellow red'
      | 'green yellow red blue'
      | 'green yellow blue red'
      | 'blue red green yellow'
      | 'blue red yellow green'
      | 'blue green red yellow'
      | 'blue green yellow red'
      | 'blue yellow red green'
      | 'blue yellow green red'
      | 'yellow red green blue'
      | 'yellow red blue green'
      | 'yellow green red blue'
      | 'yellow green blue red'
      | 'yellow blue red green'
      | 'yellow blue green red'
    >
  >,
  Expect<
    Equal<Combination<['one', 'two']>, 'one' | 'two' | 'one two' | 'two one'>
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8767/answer
  > View solutions: https://tsch.js.org/8767/solutions
  > More Challenges: https://tsch.js.org
*/
