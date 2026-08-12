/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type StringToTuple<S extends string, T extends string[] = []> = S extends `${infer F}${infer Rest}` ? StringToTuple<Rest, [...T, F]> : T
type LongerThan<A extends string[], B extends string[]> = A extends [infer F, ...infer R extends string[]] 
  ? B extends [infer FB, ...infer RB extends string[]]
    ? LongerThan<R, RB> 
    : true // 왼쪽이 더 길 때
  : B extends [infer FB2, ...infer RB2] // 오른쪽만 남았을 때
    ? false 
    : false // 둘다 안남았을 때

// 길이 비교
type nums = ['9','8','7','6','5','4','3','2','1','0']
type CompareNum<A extends string[], B extends string[], N extends string[] = nums> = A extends [infer FA, ...infer RA extends string[]]
  ? B extends [infer FB,... infer RB extends string[]]
    ? N extends [infer FN, ...infer RN extends string[]] 
      ? FA extends FN
        ? FB extends FN
          ? CompareNum<RA, RB> // FA, FB 모두 FN 충족하니 초기화
          : true
        : FB extends FN
          ? false
          : CompareNum<A, B, RN> // FA, FB 모두 FN 충족하지 않으니 A, B만 초기화
      : never
    : never
  : false

type GreaterThan<T extends number, U extends number> = StringToTuple<`${T}`>['length'] extends StringToTuple<`${U}`>['length'] 
  ? CompareNum<StringToTuple<`${T}`>, StringToTuple<`${U}`>> // 길이가 같을 때
  : LongerThan<StringToTuple<`${T}`>, StringToTuple<`${U}`>> // 길이 다를 때 (길이만 비교)

type b = GreaterThan<1, 0>
type a = GreaterThan<1234567891011, 1234567891010>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 대소 비교 어떻게...? - 숫자를 직접 비교하긴 무리, 먼저 배열 길이를 만족하는 값이 있는지부터 확인해보기
type GreaterThan<T extends number, U extends number, A extends number[] = [], B extends number[] = []> = T extends A['length'] 
  ? U extends B['length']
    ? false // 같을 때
    : false // T가 더 먼저 도달
  : U extends B['length'] 
    ? true // U가 더 먼저 도달
    : GreaterThan<T, U, [...A, 1], [...B, 1]>
=> 마지막 케이스가 Infinite 판정이 됨



2. (힌트) 재귀 한계는 문자열로 풀기, 문자열 길이 비교 후 같다면 앞에서부터 한 글자씩 보기
type StringToTuple<S extends string, T extends string[] = []> = S extends `${infer F}${infer Rest}` ? StringToTuple<Rest, [...T, F]> : T
type LongerThan<A extends string[], B extends string[]> = A extends [infer F, ...infer R] ? B extends [infer FB, ...infer RB] ? LongerThan<R, RB> : true : B extends [infer FB2, ...infer RB2] ? false : false
=> LongerThan<R, RB>에서 R이 unknwon[]으로 추론되는 문제 발생
=> extends로 타입 좁혀주기

2-1. 참고) 아래의 경우 number로 추론된다
`${T}`['length']
=> Tuple로 만든 뒤 length 비교하기



3. 1,2,마지막 케이스 미통과
type StringToTuple<S extends string, T extends string[] = []> = S extends `${infer F}${infer Rest}` ? StringToTuple<Rest, [...T, F]> : T
type LongerThan<A extends string[], B extends string[]> = A extends [infer F, ...infer R extends string[]] 
  ? B extends [infer FB, ...infer RB extends string[]]
    ? LongerThan<R, RB> 
    : true // 왼쪽이 더 길 때
  : B extends [infer FB2, ...infer RB2] // 오른쪽만 남았을 때
    ? false 
    : false // 둘다 안남았을 때

// 길이 비교
type nums = [9,8,7,6,5,4,3,2,1,0]
type CompareNum<A extends string[], B extends string[], N extends number[] = nums> = A extends [infer FA, ...infer RA extends string[]]
  ? B extends [infer FB,... infer RB extends string[]]
    ? N extends [infer FN, ...infer RN extends number[]] 
      ? FA extends FN
        ? FB extends FN
          ? CompareNum<RA, RB, RN>
          : true
        : FB extends FN
          ? false
          : CompareNum<RA, RB, RN>
      : never
    : never
  : false

type GreaterThan<T extends number, U extends number> = StringToTuple<`${T}`>['length'] extends StringToTuple<`${U}`>['length'] 
  ? CompareNum<StringToTuple<`${T}`>, StringToTuple<`${U}`>> // 길이가 같을 때
  : LongerThan<StringToTuple<`${T}`>, StringToTuple<`${U}`>> // 길이 다를 때 (길이만 비교)


4. (정답)

// 길이 비교
type nums = ['9','8','7','6','5','4','3','2','1','0']
type CompareNum<A extends string[], B extends string[], N extends string[] = nums> = A extends [infer FA, ...infer RA extends string[]]
  ? B extends [infer FB,... infer RB extends string[]]
    ? N extends [infer FN, ...infer RN extends string[]] 
      ? FA extends FN
        ? FB extends FN
          ? CompareNum<RA, RB> // FA, FB 모두 FN 충족하니 초기화
          : true
        : FB extends FN
          ? false
          : CompareNum<A, B, RN> // FA, FB 모두 FN 충족하지 않으니 A, B만 초기화
      : never
    : never
  : false

초기화해주는 타이밍 맞추기
*/
