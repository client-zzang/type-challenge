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

// 🚀 시작: 2026-10-03 21:32
// ✅ 종료: 2026-10-03 21:52
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. primitive 타입을 체크하는 타입을 만들어보자

      type ToPrimitiveImpl<T> = T extends string
        ? string
        : T extends number
          ? number
          : T extends boolean
            ? boolean
            : T extends Function
              ? Function
              : never;

      - 반환되는 타입이 never 일 때는 unknown[]로 타입 검사

      type ToPrimitiveInArray<T, R = []> = T extends [infer F, ...infer R]
        ? ToPrimitiveInArray<R, [...R, ToPrimitiveImpl<F>]>
        : R;

      - unknown[]으로 타입이 좁혀지지 않으면 객체 타입으로 toPrimitive 진행

      type ToPrimitive<T> = {
        [P in keyof T]: [ToPrimitiveImpl<T[P]>] extends [never]
          ? T[P] extends unknown[]
            ? ToPrimitiveInArray<T[P]>
            : ToPrimitive<T[P]>
          : ToPrimitiveImpl<T[P]>;
      };

    

  😆 배움
    1. ToPrimitiveInArray가 없어도 됨
      - Homomorphic Mapped Type(동형 매핑 타입)으로 형태 유지 

      type ToPrimitive<T> = {
        [P in keyof T]: [ToPrimitiveImpl<T[P]>] extends [never]
          ? ToPrimitive<T[P]>
          : ToPrimitiveImpl<T[P]>;
      };

    2. 다른 풀이

      type ToPrimitive<T> = T extends Function
        ? Function
        : T extends object
          ? { [K in keyof T]: ToPrimitive<T[K]> }
          : T extends { valueOf(): infer R }
            ? R
            : T;

*/

/* _____________ Your Code Here _____________ */

type ToPrimitiveImpl<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Function
        ? Function
        : never;

type ToPrimitive<T> = {
  [P in keyof T]: [ToPrimitiveImpl<T[P]>] extends [never]
    ? ToPrimitive<T[P]>
    : ToPrimitiveImpl<T[P]>;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type PersonInfo = {
  name: 'Tom';
  age: 30;
  married: false;
  addr: {
    home: '123456';
    phone: '13111111111';
  };
  hobbies: ['sing', 'dance'];
  readonlyArr: readonly ['test'];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16259/answer
  > View solutions: https://tsch.js.org/16259/solutions
  > More Challenges: https://tsch.js.org
*/
