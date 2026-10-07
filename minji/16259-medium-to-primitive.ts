/*
  16259 - ToPrimitive
  -------
  by 前端子鱼 (@mwc) #medium

  ### Question

  Convert a property of type literal (label type) to a primitive type.

  For example

  ```typescript
  type X = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }

  type Expected = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }
  type Todo = ToPrimitive<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/16259
*/

/* _____________ Your Code Here _____________ */

type ToPrimitive<T> = {[key in keyof T]: T[key] extends string 
  ? string
  : T[key] extends number
    ? number
    : T[key] extends boolean
      ? boolean
      : T[key] extends Function
        ? Function
        : T[key] extends string[]
          ? T[key] extends [infer _T, ...infer _R]
            ? ToPrimitive<T[key]>
            : []
          : ToPrimitive<T[key]>
}

type a = ToPrimitive<PersonInfo>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16259/answer
  > View solutions: https://tsch.js.org/16259/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. 하나씩 모두 대응하기 => Object, readonly 대응이 안됨

type ToPrimitive<T> = {[key in keyof T]: T[key] extends string 
  ? string
  : T[key] extends number
    ? number
    : T[key] extends boolean
      ? boolean
      : T[key] extends Function
        ? Function
        : T[key] extends string[]
          ? T[key] extends [infer _T, ...infer _R]
            ? ToPrimitive<T[key]>
            : []
          : T[key] extends Object
            ? {[K in keyof T[key]]: ToPrimitive<T[key][K]>}
            : any
}
- readonly는 T[key] extends Object로 떨어짐 (string[]에서 안걸러진다)
- Object도 ToPrimitive에 T[key][K]처럼 원시타입 string을 넘겨주면 아무데도 안 걸러지고 바로 value 그대로 나오게 된다 ex. {home:string}이 아닌 {home: '123456'}이 나옴

=> 해결방법: Object 조건문을 없애고 바로 재귀 돌리기

*/
