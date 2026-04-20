/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #쉬움 #tuple

  ### 질문

  배열(튜플)을 받아 길이를 반환하는 제네릭 `Length<T>`를 구현하세요.

  예시:

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > GitHub에서 보기: https://tsch.js.org/18/ko
*/

// 🚀 시작: 2026-04-20 22:30
// ✅ 종료: 2026-04-20 22:41
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    T['length'] 이렇게 배열 메서드에 접근하면 되지 않을까?
    제네릭 T를 extends로 타입을 좁히면 될 것 같은 느낌

    처음에 아래와 같이 접근 했는데 "'readonly ["tesla", "model 3", "model X", "model Y"]' 형식이 'string[]' 제약 조건을 만족하지 않습니다." 에러가 발생했다.
    type Length<T extends Array<string>> = T['length'];

    readonly Array 형태는 없을까 싶어서 구글에 typescript readonly Array 검색한 결과 ReadonlyArray 타입 발견

    참조: https://velog.io/@nearworld/ReadonlyArray-%ED%83%80%EC%9E%85-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EB%B0%B0%EC%97%B4-%EC%84%A0%EC%96%B8%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%97%B4-%EB%B6%88%EB%B3%80%ED%95%98%EA%B2%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0

  😆 배움
    1. ReadonlyArray
      - 읽기 전용 배열을 나타내는 타입
      - 배열에 as const 를 붙여서 readonly tuple이 되어 Array<string> 이면 "readonly 배열을 mutable 배열에 할당할 수 없다" 에러 발생
        - mutable 은 변경 할 수 있다는 의미로 const arr: string[] = ['a', 'b']; 와 같은 배열을 의미
      - 세 가지 표기법
        - ReadonlyArray<string>
        - readonly string[]
        - readonly [string, string]  // tuple 형태
      - Array<T>의 상위 타입으로 readonly, mutable 모두 받을 수 있다.
 */

/* _____________ 여기에 코드 입력 _____________ */

type Length<T extends ReadonlyArray<string>> = T['length'];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT',
] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/18/answer/ko
  > 정답 보기: https://tsch.js.org/18/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
