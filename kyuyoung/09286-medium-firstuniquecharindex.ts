type FirstUniqueCharIndex<
  T extends string,
  Arr extends string[] = []
> = T extends ''
  ? -1
  : T extends `${infer First}${infer Rest}`
    ? First extends Arr[number]
      ? FirstUniqueCharIndex<Rest, [...Arr, First]>
      : Rest extends `${string}${First}${string}`
        ? FirstUniqueCharIndex<Rest, [...Arr, First]>
        : Arr['length']
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]
