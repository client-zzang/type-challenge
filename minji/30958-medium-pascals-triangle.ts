/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

/* _____________ Your Code Here _____________ */

type GetTuple<N extends number, A extends number[] = []> = N extends A['length']
  ? A
  : GetTuple<N, [...A, 1]>

type Add<A extends number, B extends number> = [...GetTuple<A>, ...GetTuple<B>]['length']

type AddTuple<A extends unknown[], B extends unknown[], R extends unknown[] = []> =
  A extends [infer AF extends number, ...infer AR extends number[]]
    ? B extends [infer BF extends number, ...infer BR extends number[]]
      ? AddTuple<AR, BR, [...R, Add<AF, BF>]>
      : R
    : R

type Pascal<N extends number, Prev extends unknown[] = [1], Rows extends unknown[][] = []> =
  Rows['length'] extends N
    ? Rows
    : AddTuple<[0, ...Prev], [...Prev, 0]> extends infer Next extends unknown[]
        ? Pascal<N, Next, [...Rows, Prev]>
        : never
    
type a = Pascal<3>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 튜플로 변환해 Prev 배열을 더하는 방식 => 무한 루프 발생 (어디서 꼬였는지는 모르겠음..)
type GetTuple<N extends number, A extends number[] = []> = N extends A['length']
  ? A
  : GetTuple<N, [...A, 1]>

type PascalArray<Prev extends number[], I extends number[]> = I['length'] extends 0
  ? [1, ...PascalArray<Prev, [...I, 1]>]
  : [...I, 1]['length'] extends Prev['length']
    ? [1]
    : [[...GetTuple<Prev[I['length']]>, ...GetTuple<Prev[I extends [infer F, ...infer R] ? R['length']: I['length']]>]['length'], ...PascalArray<Prev, [...I, 1]>]

type Pascal<N extends number, A extends 1[] = []> = PascalArray<[1], []>


2. (AI 힌트) Prev 앞 뒤에 패딩으로 0 넣기 => 재귀 오류
type GetTuple<N extends number, A extends number[] = []> = N extends A['length']
  ? A
  : GetTuple<N, [...A, 1]>

type Add<A extends number, B extends number> = [...GetTuple<A>, ...GetTuple<B>]['length']

type AddTuple<A extends number[], B extends number[]> = 
  A extends [infer AF extends number, ...infer AR extends number[]] 
    ? B extends [infer BF extends number, ...infer BR extends number[]] 
      ? [Add<AF, BF>, ...AddTuple<AR, BR>] << spread 형태에 재귀가 오게 되면 재귀가 배열인지 알아야 하는데 타입 평가가 되지 않아 자기 참조로 판정 => 무한 호출된다고 인식
      : []
    : []

type Pascal<N extends number, Prev extends number[] = [1], Rows extends number[][] = []> =
  Rows['length'] extends N
    ? Rows
    : Pascal<N, AddTuple<[0, ...Prev], [...Prev, 0]>, [...Rows, Prev]>
    

3. (AI 힌트) 누적으로 바꾸기
type AddTuple<A extends number[], B extends number[], R extends number[] = []> =
  A extends [infer AF extends number, ...infer AR extends number[]]
    ? B extends [infer BF extends number, ...infer BR extends number[]]
      ? AddTuple<AR, BR, [...R, Add<AF, BF>]> // 누적으로 더함 >> Type '[...R, Add<AF, BF>]' does not satisfy the constraint 'number[]' 오류!!
      : R
    : R

- 원인: Add<AF, BF>는 아직 평가되지 않은 조건부 타입이라 TS가 "이게 number다"를 증명하지 못함
=> 모든 제네릭을 unknown[]으로 두기 (R은 결과를 쌓는 역할만 하므로 number[] 제약을 걸지 않아도 됨)


4. extends infer Next extends unknown[] 판정 추가

type Pascal<N extends number, Prev extends unknown[] = [1], Rows extends unknown[][] = []> =
  Rows['length'] extends N
    ? Rows
    : AddTuple<[0, ...Prev], [...Prev, 0]> extends infer Next extends unknown[]
        ? Pascal<N, Next, [...Rows, Prev]>
        : never

*/
