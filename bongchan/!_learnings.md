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
