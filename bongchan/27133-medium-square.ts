/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

// 🚀 시작: 2026-10-27 20:35
// ✅ 종료: 2026-10-27 23:27
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    🔴 접근 1.
      🔵 1-1. 음수를 양수로 바꿔주는 절댓값 유틸 타입

        type ToAbsolute<T extends number> = `${T}` extends `-${infer N extends number}`
          ? N
          : T;

      🔵 1-2. 제네릭 N의 수만큼 반복하면서 제네릭 N의 수만큼의 길이를 갖는 중첩배열 만들기

        type Square<
          N extends number,
          I extends number[] = [],
          R extends number[] = [],
          T extends number[] = [],
        > =
          I['length'] extends ToAbsolute<N>
            ? R['length']
            : T['length'] extends ToAbsolute<N>
              ? Square<N, [...I, 1], [...R, ...T], []>
              : Square<N, I, R, [...T, 1]>;

        - ❌ 100, 101, -50 케이스에서 "형식 인스턴스화는 깊이가 매우 깊으며 무한할 수도 있습니다. ts(2589)" 에러 발생

      🔵 1-3. 🤖 (AI 힌트 받음) 재귀 없이 내부 배열을 채울 유틸 타입

        type BuildTuple<
          N extends number,
          T extends number[] = [],
        > = T['length'] extends N ? T : BuildTuple<N, [...T, 1]>;

        type Square<
          N extends number,
          T extends number[] = BuildTuple<ToAbsolute<N>>,
          I extends number[] = [],
          R extends number[] = [],
        > =
          I['length'] extends ToAbsolute<N>
            ? R['length']
            : Square<N, T, [...I, 1], [...R, ...T]>;

        - ❌ 100, 101 케이스에서 "형식이 너무 커서 표시할 수 없는 튜플 형식을 생성합니다. ts(2799)" 에러 발생

      🔵 1-4. AI 도움을 받아도 매우 어려움...

  😆 배움
    -

*/

/* _____________ Your Code Here _____________ */

type ToAbsolute<T extends number> = `${T}` extends `-${infer N extends number}`
  ? N
  : T;

type BuildTuple<
  N extends number,
  T extends number[] = [],
> = T['length'] extends N ? T : BuildTuple<N, [...T, 1]>;

// 단계 1. 문자열 뒤집기
type Reverse<S extends string> = S extends `${infer F}${infer R}`
  ? `${Reverse<R>}${F}`
  : '';

// 한 자리 합(S)이 10 이상이면 10개를 떼고 올림 [1]을 다음 자리로 넘긴다
type AddDigit<
  S extends unknown[],
  A extends string,
  B extends string,
> = S extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer Rest]
  ? `${Rest['length']}${AddReversed<A, B, [1]>}`
  : `${S['length']}${AddReversed<A, B>}`;

// 단계 2. 뒤집힌 숫자 문자열끼리 더하기 (결과도 뒤집힌 상태)
type AddReversed<
  A extends string,
  B extends string,
  Carry extends unknown[] = [],
> = A extends `${infer a extends number}${infer AR}`
  ? B extends `${infer b extends number}${infer BR}`
    ? AddDigit<[...BuildTuple<a>, ...BuildTuple<b>, ...Carry], AR, BR>
    : AddDigit<[...BuildTuple<a>, ...Carry], AR, ''>
  : B extends `${infer b extends number}${infer BR}`
    ? AddDigit<[...BuildTuple<b>, ...Carry], '', BR>
    : Carry extends [1]
      ? '1'
      : '';

// 단계 3. 0에 |N|을 |N|번 더하기
type Square<N extends number, I extends number[] = [], R extends string = '0'> =
  I['length'] extends ToAbsolute<N>
    ? Reverse<R> extends `${infer X extends number}`
      ? X
      : never
    : Square<N, [...I, 1], AddReversed<R, Reverse<`${ToAbsolute<N>}`>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,
  Expect<Equal<Square<101>, 10201>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27133/answer
  > View solutions: https://tsch.js.org/27133/solutions
  > More Challenges: https://tsch.js.org
*/
