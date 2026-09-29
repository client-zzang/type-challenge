/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by leetcode 387)

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */
type GetDuplicatedUnion<T extends string, U = never, D = never> = T extends `${infer F}${infer R}`
  ? GetDuplicatedUnion<R, U | F, F extends U ? D | F : D>
  : D

type FirstUniqueCharIndex<T extends string, Origin extends string = T, N extends unknown[] = []> = T extends `${infer F}${infer R}`
  ? F extends GetDuplicatedUnion<Origin>
    ? FirstUniqueCharIndex<R, Origin, [...N, 1]>
    : N['length']
  : -1

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. Object로 관리하기 -> 마지막 반환값으로 Obj에서 가장 작은 value를 뽑아야 한다 -> 가능한가? 모르겠다 -> 유니온으로 판단해볼까?
type FirstUniqueCharIndex<T extends string, Obj extends Record<string, number> = {}, I extends number[] = []> = T extends `${infer F}${infer R}`
  ? Obj[F] extends number
    ? FirstUniqueCharIndex<R, Exclude<Obj, F>, [...I, 1]>
    : FirstUniqueCharIndex<R, Obj & {F: I['length']}, [...I, 1]>
  : Obj

2. 유니온으로 풀어보기 => 결과도 유니온으로 나온다 어떻게 최소값만 분리하지?
type FindIndex<S extends string, W extends string, N extends number[] = []> = S extends `${infer F}${infer R}`
  ? F extends W
    ? N['length']
    : FindIndex<R, W, [...N, 1]>
  : -1

// E: 이미 나온 것들
// U: 중복된 건 제거, E에 없는 것만 추가하기
type FirstUniqueCharIndex<T extends string, U extends string = never, E = never, Word extends string = T> = T extends `${infer F}${infer R}`
  ? F extends U
    ? F extends E
      ? FirstUniqueCharIndex<R, Exclude<U, F>, E, Word> // U, E 모두 있는 것 = 중복
      : never // 없는 케이스
    : F extends E
      ? FirstUniqueCharIndex<R, U, E, Word>
      : FirstUniqueCharIndex<R, U | F, E | F, Word> // U와 E 모두 없는, 처음 나온 케이스
  : U extends U ? FindIndex<Word, U> : never


3. 뒤에서부터 접근하기 => 첫 번째 문자가 중복X인 경우 -1가 나온다 (문자열 인덱싱 때문 - 0부터 시작하니까)
type ReverseString<T extends string, Res extends string=''> = T extends `${infer F}${infer R}`
 ? ReverseString<R, `${Res}${F}`>
 : Res

type GetArrays<T extends string, N extends number[] = []> = T extends `${infer F}${infer R}`
  ? GetArrays<R, [...N, 0]>
  : N extends [infer NF, ...infer NR]
    ? NR
    : N

type FirstUniqueCharIndex<T extends string, N extends number[] = GetArrays<T>, Flag extends boolean = false, U extends string = never, I extends number = -1> = ReverseString<T> extends `${infer F}${infer R}`
  ? FirstUniqueCharIndex<R, N extends [infer NF, ...infer NR] ? NR : [], N extends [infer NF, ...infer NR] ? false : true, F extends U ? U : U | F, F extends U ? I : N['length']>
  : Flag extends true ? -1 : I

4. (힌트, 정답) 문자열 유니온, 중복값 유니온 만들기 
type GetDuplicatedUnion<T extends string, U = never, D = never> = T extends `${infer F}${infer R}`
  ? GetDuplicatedUnion<R, U | F, F extends U ? D | F : D>
  : D

type FirstUniqueCharIndex<T extends string, Origin extends string = T, N extends unknown[] = []> = T extends `${infer F}${infer R}`
  ? F extends GetDuplicatedUnion<Origin>
    ? FirstUniqueCharIndex<R, Origin, [...N, 1]>
    : N['length']
  : -1

*/
