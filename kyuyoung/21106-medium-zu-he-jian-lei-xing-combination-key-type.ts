type Combs<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]] 
  ? `${F} ${R[number]}` | Combs<R> 
  : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']
type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>,
]
