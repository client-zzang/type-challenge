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

/* _____________ Your Code Here _____________ */
// 중첩된 튜플 없애기
// type DupTupleToTuple<T extends any[]> = T extends [infer F, ...infer R]
//   ? F extends [infer F2, ...infer R2]
//     ? [F2, ...DupTupleToTuple<R2>]
//     : [F, ...DupTupleToTuple<R>]
//   : T

// // 유니온 얻기
// type GetUnion<T extends any[], U = never> = T extends [infer F, ...infer R]
//   ? GetUnion<R, U | F>
//   : U

// // 유니온으로 객체 만들기
// type GetObject<U extends number | string> = {[key in U]: []}

// // 개수 세기 
// type GetCounts<Obj extends Record<number | string, number[]>, T extends (number | string)[]> = T extends [infer F extends number | string, ...infer R extends (number | string)[]]
//   ? Obj[F] extends number[]
//     ? GetCounts<Obj & Record<F, [...Obj[F], 1]>, R>
//     : never
//   : Obj

// // 평탄화
// type Flatten<T> = {[key in keyof T]: T[key]}

// type CountElementNumberToObject<T extends (string | number)[]> = Flatten<GetCounts<GetObject<GetUnion<DupTupleToTuple<T>>>, T>>
// type a = CountElementNumberToObject<[1, 2, 3, 4, 5]>

type Flat<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[] ? [...Flat<F>, ...Flat<R>] : [F, ...Flat<R>]
  : []

type CountOf<T extends any[], X, N extends 1[] = []> =
  T extends [infer F, ...infer R]
    ? CountOf<R, X, F extends X ? [...N, 1] : N>
    : N['length']

type CountElementNumberToObject<T extends any[], L extends any[] = Flat<T>> = {
  [K in L[number]]: CountOf<L, K>
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 전부 flat하게 돌린 뒤 개수 세기
- 중첩된 튜플을 풀어주는 타입 필요
- 개수 세어주는 타입 필요

// 유니온 얻기
type GetUnion<T extends any[], U = never> = T extends [infer F, ...infer R]
  ? GetUnion<R, U | F>
  : U

// 유니온으로 객체 만들기
type GetObject<U extends PropertyKey> = {[key in U]: []}
type b = GetObject<GetUnion<[1,2,[1,2]]>>

-> 유니온 타입을 never로 지정해두니 type b 에서 타입 오류가 난다 (PropertyKey)


2. b에서 DupTupleToTuple을 씌우고 GetObject 인자 타입을 PropertyKey 대신 number | string으로 넘기기 

// 유니온 얻기
type GetUnion<T extends any[], U = never> = T extends [infer F, ...infer R]
  ? GetUnion<R, U | F>
  : U

// 유니온으로 객체 만들기
type GetObject<U extends number | string> = {[key in U]: []}
type b = GetObject<GetUnion<DupTupleToTuple<[1,2,[1,2]]>>>

=> 평탄화 필요


3. Flatten해도 value가 never로 오는 문제...

// 중첩된 튜플 없애기
type DupTupleToTuple<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends [infer F2, ...infer R2]
    ? [F2, ...DupTupleToTuple<R2>]
    : [F, ...DupTupleToTuple<R>]
  : T

// 유니온 얻기
type GetUnion<T extends any[], U = never> = T extends [infer F, ...infer R]
  ? GetUnion<R, U | F>
  : U

// 유니온으로 객체 만들기
type GetObject<U extends number | string> = {[key in U]: []}

// 개수 세기 
type GetCounts<Obj extends Record<number | string, number[]>, T extends (number | string)[]> = T extends [infer F extends number | string, ...infer R extends (number | string)[]]
  ? Obj[F] extends number[]
    ? GetCounts<Obj & Record<F, [...Obj[F], 1]>, R>
    : never
  : Obj

// 평탄화
type Flatten<T> = {[key in keyof T]: T[key]}

type CountElementNumberToObject<T extends (string | number)[]> = Flatten<GetCounts<GetObject<GetUnion<DupTupleToTuple<T>>>, T>>

- 원인: &는 덮어쓰기가 아니라 교차
=> Flatten시켜도 value 타입이 [] & [1]이 됨 => never가 됨

4. (정답 확인)

type Flat<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[] ? [...Flat<F>, ...Flat<R>] : [F, ...Flat<R>]
  : []

type CountOf<T extends any[], X, N extends 1[] = []> =
  T extends [infer F, ...infer R]
    ? CountOf<R, X, F extends X ? [...N, 1] : N>
    : N['length']

type CountElementNumberToObject<T extends any[], L extends any[] = Flat<T>> = {
  [K in L[number]]: CountOf<L, K>
}

 ====> 다시 풀기!!
*/
