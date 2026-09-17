type Unique<T extends unknown[], R extends unknown[] = []> = T extends [
  infer A,
  ...infer Rest
]
  ? Unique<Rest, A extends R[number] ? R : [...R, A]>
  : R;

type StringToArr<T extends string, R extends string[] = []> = T extends `${infer First}${infer Rest}` ? StringToArr<Rest, [...R, First]> : R

type CheckRepeatedChars<T extends string> = true extends Equal<Unique<StringToArr<T>>['length'], StringToArr<T>['length']> ? false : true

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]
