# ☺️ 오늘도 성장했어

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
