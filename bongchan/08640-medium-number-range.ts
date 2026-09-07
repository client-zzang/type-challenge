/*
  8640 - Number Range
  -------
  by AaronGuo (@HongxuanG) #medium

  ### Question

  Sometimes we want to limit the range of numbers...
  For examples.
  ```ts
  type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  ```

  > View on GitHub: https://tsch.js.org/8640
*/

// 🚀 시작: 2026-09-07 22:20
// ✅ 종료: 2026-09-07 22:46
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. number를 찍기 위한 제네릭 Index 추가

      type NumberRange<
        L extends number,
        H extends number,
        Index extends unknown[] = [],
      > = any;

    2. Index['length']를 L, H랑 비교하면서 재귀

      type NumberRange<
        L extends number,
        H extends number,
        Index extends unknown[] = [],
      > = Index['length'] extends H
        ? Index['length']
        : Index['length'] extends L
          ? Index['length'] | NumberRange<[...Index, 1]['length'], H, [...Index, 1]>
          : NumberRange<L, H, [...Index, 1]>;

      - ❌ NumberRange<0, 140> 형식 인스턴스화는 깊이가 매우 깊으며 무한할 수도 있습니다. ts(2589) 에러 발생

    3. 연산자 역할을 하는 제네릭 추라

      type NumberRange<
        L extends number,
        H extends number,
        Index extends unknown[] = [],
        Acc = never,
      > = Index['length'] extends H
        ? Acc | H
        : NumberRange<
            L,
            H,
            [...Index, 1],
            [Acc] extends [never]
              ? Index['length'] extends L
                ? L
                : never
              : Acc | Index['length']
          >;

  😆 배움
    1. 다른 풀이
      type Utils<L, C extends any[] = [], R = L> = C['length'] extends L
        ? R
        : Utils<L, [...C, 0], C['length'] | R>;

      type NumberRange<L, H> = L | Exclude<Utils<H>, Utils<L>>;

    2. 꼬리 재귀 최적화(TCO, Tail Call Optimization)

      - "접근 2"의 풀이를 살펴보면 재귀 호출이 유니온 안에 들어가 있어서 꼬리 재귀 최적화가 적용되지 않음

        type NumberRange<
          L extends number,
          H extends number,
          Index extends unknown[] = [],
        > = Index['length'] extends H
          ? Index['length']
          : Index['length'] extends L
            ? Index['length'] | NumberRange<[...Index, 1]['length'], H, [...Index, 1]> // ❌ 여기에서 꼬리 재귀 최적화 적용 안 됨
            : NumberRange<L, H, [...Index, 1]>; // ✅ 여기는 분기 전체가 재귀 호출로 꼬리 재귀 최적화 적용됨

        - 꼬리 재귀 최적화가 적용되면 최대 ~1000회까지 인스턴스화 깊이 제한이 가능한데 이를 벗어나면 ~50회까지 제한 걸린다.

      

*/

/* _____________ Your Code Here _____________ */

type NumberRange<
  L extends number,
  H extends number,
  Index extends unknown[] = [],
  Acc = never,
> = Index['length'] extends H
  ? Acc | H
  : NumberRange<
      L,
      H,
      [...Index, 1],
      [Acc] extends [never]
        ? Index['length'] extends L
          ? L
          : never
        : Acc | Index['length']
    >;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Result1 = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Result2 = 0 | 1 | 2;
type Result3 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128
  | 129
  | 130
  | 131
  | 132
  | 133
  | 134
  | 135
  | 136
  | 137
  | 138
  | 139
  | 140;
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8640/answer
  > View solutions: https://tsch.js.org/8640/solutions
  > More Challenges: https://tsch.js.org
*/
