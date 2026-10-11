/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #medium #template-literal #string

  ### Question

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > View on GitHub: https://tsch.js.org/21104
*/

// 🚀 시작: 2026-10-11 21:44
// ✅ 종료: 2026-10-11 22:28
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1-1. 찾는 문자가 공백('')일 경우 early return

      type FindAll<T extends string, P extends string> = P extends '' ? [] : false;

    1-2. infer를 활용하여 T에 P가 있는지 확인

      type FindAll<T extends string, P extends string> = P extends ''
        ? []
        : T extends `${string}${P}${string}` // ➡️ T에 P가 없다면 빈배열 반환
          ? true
          : [];

    1-3. T에서 P를 찾을 때 앞에 문자열의 길이로 P의 index 찾기

      type StringToArray<
        T,
        R extends unknown[] = [],
      > = T extends `${infer Head}${infer Tail}`
        ? StringToArray<Tail, [...R, Head]>
        : R;

      type FindAll<
        T extends string,
        P extends string,
        H extends string = '',
        R extends number[] = [],
      > = P extends ''
        ? []
        : T extends `${infer Head}${P}${infer Tail}`
          ? FindAll<
              Tail,
              P,
              `${H}${Head}${P}`,
              [
                ...R,
                R['length'] extends 0
                  ? StringToArray<Head>['length']
                  : StringToArray<`${H}${Head}`>['length'],
              ]
            >
          : R;

      - ❌ FindAll<'AAAA', 'AA'> 해당 케이스가 대응되지 않음. 앞에서부터 하나씩 비교해야함

    2-1. 찾는 문자가 공백('')일 경우 early return

      type FindAll<T extends string, P extends string> = P extends '' ? [] : false;
    
    2-2. 인덱스를 계산할 Index 제네릭과 결과를 반환할 Result 제네릭 추가

      type FindAll<
        T extends string,
        P extends string,
        Index extends unknown[] = [],
        Result extends number[] = [],
      > = any;

    2-3. 찾는 문자가 문자열의 시작에 있는지 확인하는 타입 Find

      type Find<
        T extends string,
        P extends string,
        R extends boolean[] = [],
      > = P extends `${infer PHead}${infer PTail}`
        ? T extends `${infer THead}${infer TTail}`
          ? Find<TTail, PTail, [...R, THead extends PHead ? true : false]>
          : false // ➡️ P가 남아있는데 T가 없을 경우 찾는 문자열이 없다고 판단
        : R[number] extends true // ➡️ 모두 true 일 때만 찾는 문자가 있다고 판단
          ? true
          : false;

    2-4. 대상인 제네릭 T에서 

      type Find<
        T extends string,
        P extends string,
        R extends boolean[] = [],
      > = P extends `${infer PHead}${infer PTail}`
        ? T extends `${infer THead}${infer TTail}`
          ? Find<TTail, PTail, [...R, THead extends PHead ? true : false]>
          : false
        : R[number] extends true
          ? true
          : false;

      type FindAll<
        T extends string,
        P extends string,
        Index extends unknown[] = [],
        Result extends number[] = [],
      > = P extends ''
        ? []
        : T extends `${infer Head}${infer Tail}`
          ? Find<T, P> extends true
            ? FindAll<Tail, P, [...Index, Head], [...Result, Index['length']]> // ➡️ 찾았을 때는 Result에 Index 넣어주기
            : FindAll<Tail, P, [...Index, Head], Result>
          : Result;

  😆 배움
    - 찾는 문자로 시작하는지 여부를 `${찾는 문자}${string}` 형태로 해결한 풀이

      type NormalFindAll<
        T extends string,
        S extends string,
        P extends any[] = [],
        R extends number[] = [],
      > = T extends `${string}${infer L}`
        ? T extends `${S}${string}`
          ? NormalFindAll<L, S, [...P, 0], [...R, P['length']]>
          : NormalFindAll<L, S, [...P, 0], R>
        : R;

      type FindAll<T extends string, P extends string> = P extends ''
        ? []
        : NormalFindAll<T, P>;

*/

/* _____________ Your Code Here _____________ */

type Find<
  T extends string,
  P extends string,
  R extends boolean[] = [],
> = P extends `${infer PHead}${infer PTail}`
  ? T extends `${infer THead}${infer TTail}`
    ? Find<TTail, PTail, [...R, THead extends PHead ? true : false]>
    : false
  : R[number] extends true
    ? true
    : false;

type FindAll<
  T extends string,
  P extends string,
  Index extends unknown[] = [],
  Result extends number[] = [],
> = P extends ''
  ? []
  : T extends `${infer Head}${infer Tail}`
    ? Find<T, P> extends true
      ? FindAll<Tail, P, [...Index, Head], [...Result, Index['length']]>
      : FindAll<Tail, P, [...Index, Head], Result>
    : Result;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>
  >,
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>
  >,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21104/answer
  > View solutions: https://tsch.js.org/21104/solutions
  > More Challenges: https://tsch.js.org
*/
