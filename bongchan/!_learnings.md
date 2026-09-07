# ☺️ 오늘도 성장했어

## 목차

1. [Omit을 활용한 평탄화](#omit을-활용한-평탄화)
2. [Uncapitalize를 활용한 첫 번째 문자 소문자 변환](#uncapitalize를-활용한-첫-번째-문자-소문자-변환)
3. [빈객체를 확인하는 방법](#빈객체를-확인하는-방법)
4. [배열을 유니온으로 변환](#배열을-유니온으로-변환)
5. [재사용 가능한 infer 변수를 추출과 extends 분기](#재사용-가능한-infer-변수를-추출과-extends-분기)
6. [숫자로 구성된 string 타입을 number 타입으로 변환](#숫자로-구성된-string-타입을-number-타입으로-변환)
7. [never를 활용한 유니온 흡수(소멸)](#never를-활용한-유니온-흡수소멸)
8. [타입스크립트의 재귀 깊이 제한](#타입스크립트의-재귀-깊이-제한)

## Omit을 활용한 평탄화

타입챌린지에서 `Equal` 비교를 할 때, `A & B`(Intersection Types) 형태면 에러 발생

예) 02757-medium-partialbykeys

```ts
type A = {
  a: 1;
};

type B = {
  b: 2;
};

type IntersectionValue = A & B; // A & B

type Flatten<T> = {
  [P in keyof T]: T[P];
};

type FlattenValue = Flatten<IntersectionValue>; // type D = { a: 1; b: 2; }

type OmitValue = Omit<IntersectionValue, never>; // type E = { a: 1; b: 2; }

type ExpectedValue = {
  a: 1;
  b: 2;
};

type cases2 = [
  Expect<Equal<ExpectedValue, IntersectionValue>>, // ❌ 에러 발생
  Expect<Equal<ExpectedValue, FlattenValue>>, // ✅
  Expect<Equal<ExpectedValue, OmitValue>>, // ✅
];
```

## Uncapitalize를 활용한 첫 번째 문자 소문자 변환

예) 00612-medium-kebabcase

```ts
type A = Uncapitalize<'HelloWorld'>; // helloWorld
```

## 빈객체를 확인하는 방법

예) 00949-medium-anyof-re

```ts
type A = {} extends {} ? true : false; // ✅ true
type B = { bong: true } extends {} ? true : false; // ❌ true

type IsEmptyObject<T> = T extends { [key: PropertyKey]: never } ? true : false;

type C = IsEmptyObject<{}> extends true ? true : false; // ✅ true
type D = IsEmptyObject<{ bong: true }> extends true ? true : false; // ✅ false

// 빈배열 확인
type E = [] extends [] ? true : false; // true
type F = [1] extends [] ? true : false; // false

// extends {} 형태는 배열을 구분하지 못 함
type G = [] extends {} ? true : false; // ❌ true
type H = [1] extends {} ? true : false; // ❌ true

// extends { [key: PropertyKey]: never } 형태는 빈객체 뿐만 아니라 배열도 구분함
type I = IsEmptyObject<[]> extends true ? true : false; // ✅ false
type J = IsEmptyObject<[1]> extends true ? true : false; // ✅ false
```

## 배열을 유니온으로 변환

예) 05117-medium-without

```ts
type ToUnion<T> = T extends unknown[] ? T[number] : T;

type A = ToUnion<[1, 2, 3]>; // 1 | 2 | 3
```

## 재사용 가능한 infer 변수를 추출과 extends 분기

예) 01978-medium-percentage-parser

```ts
type CheckPrefix<T> = T extends '+' | '-' ? T : never; // ✅ never 반환이 핵심
type Check<T> = T extends `${CheckPrefix<infer F>}${infer R}` // ✅ + 또는 -를 담는 infer를 가지면서 never 반환으로 extends 분기
  ? [F, R]
  : ['', T];

type A = '+100';
type ResultA = Check<A>; // ["+", "100"]

type B = '100';
type ResultB = Check<B>; // ["", "100"]
```

## 숫자로 구성된 string 타입을 number 타입으로 변환

예) 02257-medium-minusone

```ts
type ToNumber<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never;

type A = ToNumber<'1'>; // ✅ 1
type B = ToNumber<'01'>; // ❌ number
type C = ToNumber<'a1'>; // ❌ never
```

## never를 활용한 유니온 흡수(소멸)

예) 05821-medium-maptypes

```ts
type Mapper<
  T,
  R extends { mapFrom: unknown; mapTo: unknown },
> = T extends R['mapFrom']
  ? R extends { mapFrom: T }
    ? R['mapTo']
    : never
  : T;

type A = string;

type Result = Mapper<
  string,
  { mapFrom: string; mapTo: number } | { mapFrom: Date; mapTo: string } // ✅ number
>;
```

## 타입스크립트의 재귀 깊이 제한

예) 08640-medium-number-range

타입스크립트에서 꼬리 재귀 최적화(TCO, Tail Call Optimization)가 적용되면 재귀를 최대 ~1000회까지 허용

꼬리 재귀 최적화가 되지 않으면 ~50회까지 제한된다.

**꼬리 위치(tail position)** = 재귀 호출의 결과를 받아서 더 할 일이 없는 자리.
조건부 타입의 분기가 곧 재귀 호출이면 TS는 스택을 쌓지 않고 내부 루프로 돌린다.
반대로 재귀 호출 위에 한 겹이라도 얹히면(유니온, 튜플, 인덱스 접근 등)
결과가 돌아올 때까지 모든 단계를 기억해야 하므로 스택이 그대로 쌓인다.

```ts
// ✅ 꼬리 재귀: 분기가 곧 재귀 호출 → 최대 999회
type Tail<N extends number, C extends any[] = []> = C['length'] extends N
  ? C
  : Tail<N, [...C, 1]>;

type A = Tail<999>; // ✅
type B = Tail<1000>; // ❌ ts(2589)

// ❌ 비꼬리 재귀: 재귀 호출 위에 유니온이 한 겹 얹힘 → 최대 47회
//    (`C['length'] | ...` 를 만들려면 재귀 결과를 "받아서" 합쳐야 함)
type NonTail<N extends number, C extends any[] = []> = C['length'] extends N
  ? never
  : C['length'] | NonTail<N, [...C, 1]>;

type C = NonTail<47>; // ✅
type D = NonTail<50>; // ❌ ts(2589)

// 💡 해결: 조립 작업을 "인자"로 옮기면(누적자 패턴) 다시 꼬리 위치가 된다
//    올라오면서 유니온을 만들지 말고, 내려가면서 만들어 넘긴다
type Acc<
  N extends number,
  C extends any[] = [],
  R = never,
> = C['length'] extends N ? R : Acc<N, [...C, 1], R | C['length']>;

type E = Acc<999>; // ✅
```
