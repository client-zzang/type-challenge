/*
  9989 - Count Element Number To Object
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  // return {
  //   1: 1,
  //   2: 1,
  //   3: 1,
  //   4: 1,
  //   5: 1
  // }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  // return {
  //   1: 2,
  //   2: 2,
  //   3: 2,
  //   4: 1,
  //   5: 1
  // }
  ~~~

  > View on GitHub: https://tsch.js.org/9989
*/

// 🚀 시작: 2026-09-26 20:33
// ✅ 종료: 2026-09-26 21:33
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 도전했던 접근
      - 재귀를 돌면서 제네릭 T의 앞요소가 배열일 때와 아닐 때 분기해서 재귀
      - 출력물을 담당하는 제네릭 O 추가

      type CountElementNumberToObject<
        T extends PropertyKey[],
        O extends { [key: PropertyKey]: unknown[] } = {
          [key: PropertyKey]: unknown[];
        },
      > = T extends [
        infer First extends PropertyKey,
        ...infer Rest extends PropertyKey[],
      ]
        ? First extends PropertyKey[]
          ? CountElementNumberToObject<First, O>
          : CountElementNumberToObject<
              Rest,
              { [P in keyof O as P extends First ? never : P]: O[P] } & {
                [P in First]: [...O[First], 1];
              }
            >
        : {
            [P in keyof O]: O[P]['length'];
          };

  😆 배움
    1. AI 힌트를 받은 풀이

      type CountElementNumberToObject<
        T extends unknown[],
        O extends { [key: PropertyKey]: unknown[] } = {},
      > = T extends [infer First, ...infer Rest]
        ? [First] extends [never]
          ? CountElementNumberToObject<Rest, O>
          : First extends unknown[]
            ? CountElementNumberToObject<[...First, ...Rest], O>
            : CountElementNumberToObject<
                Rest,
                { [P in keyof O as P extends First ? never : P]: O[P] } & {
                  [P in First & PropertyKey]: [
                    ...(First extends keyof O ? O[First] : []),
                    1,
                  ];
                }
              >
        : {
            [P in keyof O]: O[P]['length'];
          };

    2. 다른 풀이
      
      type Flatten<T, R extends any[] = []> = T extends [infer F, ...infer L]
        ? [F] extends [never]
          ? Flatten<L, R>
          : F extends any[]
            ? Flatten<L, [...R, ...Flatten<F>]>
            : Flatten<L, [...R, F]>
        : R;

      type Count<T, R extends Record<string | number, any[]> = {}> = T extends [
        infer F extends string | number,
        ...infer L,
      ]
        ? F extends keyof R
          ? Count<L, Omit<R, F> & Record<F, [...R[F], 0]>>
          : Count<L, R & Record<F, [0]>>
        : {
            [K in keyof R]: R[K]['length'];
          };

      type CountElementNumberToObject<T> = Count<Flatten<T>>;

*/

/* _____________ Your Code Here _____________ */

type CountElementNumberToObject<
  T extends unknown[],
  O extends { [key: PropertyKey]: unknown[] } = {},
> = T extends [infer First, ...infer Rest]
  ? [First] extends [never]
    ? CountElementNumberToObject<Rest, O>
    : First extends unknown[]
      ? CountElementNumberToObject<[...First, ...Rest], O>
      : CountElementNumberToObject<
          Rest,
          { [P in keyof O as P extends First ? never : P]: O[P] } & {
            [P in First & PropertyKey]: [
              ...(First extends keyof O ? O[First] : []),
              1,
            ];
          }
        >
  : {
      [P in keyof O]: O[P]['length'];
    };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<['1', '2', '0']>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<['a', 'b', ['c', ['d']]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
