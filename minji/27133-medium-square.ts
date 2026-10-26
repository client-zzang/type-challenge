/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */

// 부호 제거: -5 -> '5', 5 -> '5'
type Abs<N extends number> = `${N}` extends `-${infer R}` ? R : `${N}`

// 길이 N 튜플 (꼬리 재귀)
type Tuple<N extends number, C extends 1[] = []> = C['length'] extends N ? C : Tuple<N, [...C, 1]>

// '123' -> [3, 2, 1]  (일의 자리부터)
type ToDigits<S extends string, R extends number[] = []> =
  S extends `${infer H extends number}${infer T}` ? ToDigits<T, [H, ...R]> : R

// [3, 2, 1] -> 123
type FromDigits<D extends number[], S extends string = ''> =
  D extends [infer H extends number, ...infer T extends number[]]
    ? FromDigits<T, `${H}${S}`>
    : S extends `${infer M extends number}` ? M : never

// 세 숫자의 합(최대 19)을 [자리값, 올림]으로 분해
type Sum3<A extends number, B extends number, C extends number> =
  [...Tuple<A>, ...Tuple<B>, ...Tuple<C>] extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer Rest]
    ? [Rest['length'], 1]
    : [[...Tuple<A>, ...Tuple<B>, ...Tuple<C>]['length'], 0]

// 뒤집힌 자릿수 배열 두 개를 더함
type AddDigits<A extends number[], B extends number[], Carry extends number = 0, R extends number[] = []> =
  A extends [infer AH extends number, ...infer AT extends number[]]
    ? B extends [infer BH extends number, ...infer BT extends number[]]
      ? Sum3<AH, BH, Carry> extends [infer D extends number, infer C extends number] ? AddDigits<AT, BT, C, [...R, D]>
: never
      : Sum3<AH, 0, Carry> extends [infer D extends number, infer C extends number] ? AddDigits<AT, [], C, [...R, D]>
: never
    : B extends [infer BH extends number, ...infer BT extends number[]]
      ? Sum3<0, BH, Carry> extends [infer D extends number, infer C extends number] ? AddDigits<[], BT, C, [...R, D]>
: never
      : Carry extends 0 ? R : [...R, Carry]

// |N| 을 |N| 번 더함
type Repeat<D extends number[], Times extends string, Acc extends number[] = [0], C extends 1[] = []> =
  `${C['length']}` extends Times ? Acc : Repeat<D, Times, AddDigits<Acc, D>, [...C, 1]>

type Square<N extends number> = FromDigits<Repeat<ToDigits<Abs<N>>, Abs<N>>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

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
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27133/answer
  > View solutions: https://tsch.js.org/27133/solutions
  > More Challenges: https://tsch.js.org
*/

/*
제곱 구하기

1. 재귀 ? => 스택 깊이 오류 Excessive stack depth comparing types '[...A, ...MakeArray<N, []>]' and 'number[]'.(2321)

type MakeArray<N extends number, C extends number[] = []> = C['length'] extends N
  ? []
  : [1, ...MakeArray<N, [...C, 1]>]

type Square<N extends number, A extends number[] = [], C extends number[] = []> = C['length'] extends N
  ? A
  : Square<N, [...A, ...MakeArray<N>], [...C, 1]>


2. Array의 Length가 처리되지 않는 문제 발생

type MakeArray<N extends number, C extends number[] = []> = C['length'] extends N
  ? []
  : [1, ...MakeArray<N, [...C, 1]>]

type Square<N extends number, A extends number = 0, C extends number[] = []> = C['length'] extends N
  ? A
  : Square<N, [...MakeArray<A>, ...MakeArray<N>]['length'], [...C, 1]> // Type '[...MakeArray<A, []>, ...MakeArray<N, []>]["length"]' does not satisfy the constraint 'number'.(2344)

원인: A와 N은 아직 타입 매개변수로 인식 => MakeArray<A>는 평가가 미뤄져 조건부 타입으로 남음 => ['length']가 number라고 보장되지 않게 됨
해결 방법:   
  : [...MakeArray<A>, ...MakeArray<N>]['length'] extends infer L extends number
    ? Square<N, L, [...C, 1]>
    : never

3. 여전히 20부터는 처리가 안되는 문제
=> 자릿수로 바꿔 풀기
=> 정답 보자!
*/
