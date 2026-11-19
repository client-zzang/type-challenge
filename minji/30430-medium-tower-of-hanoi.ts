/*
  30430 - Tower of hanoi
  -------
  by null (@aswinsvijay) #medium #array

  ### Question

  Simulate the solution for the Tower of Hanoi puzzle. Your type should take the number of rings as input an return an array of steps to move the rings from tower A to tower B using tower C as additional. Each entry in the array should be a pair of strings `[From, To]` which denotes ring being moved `From -> To`.

  [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
  [GeeksForGeeks](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi)

  > View on GitHub: https://tsch.js.org/30430
*/

/* _____________ Your Code Here _____________ */
// 튜플로 비교하기
type GetTuple<N extends number, A extends unknown[] = []> = A['length'] extends N
  ? A
  : GetTuple<N, [...A, 1]>

type HanoiTuple<T extends unknown[], From, To, Intermediate> = T extends [infer _, ...infer Rest] ? [...HanoiTuple<Rest, From, Intermediate, To>, [From, To], ...HanoiTuple<Rest, Intermediate, To, From>] : []

type Hanoi<N extends number, From = 'A', To = 'B', Intermediate = 'C'> = HanoiTuple<GetTuple<N>, From, To, Intermediate>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Tests = [
  Expect<Equal<Hanoi<0>, []>>,
  Expect<Equal<Hanoi<1>, [['A', 'B']]>>,
  Expect<Equal<Hanoi<2>, [['A', 'C'], ['A', 'B'], ['C', 'B']]>>,
  Expect<Equal<Hanoi<3>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
  Expect<Equal<Hanoi<5>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['B', 'C'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['C', 'A'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30430/answer
  > View solutions: https://tsch.js.org/30430/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근

하노이의 탑: 재귀
## Python 코드 참고 ##
def hanoi(n, start, target, via):
  # 기저 조건: 원판이 1개일 때
  if n == 1:
    print(f'원판 1을 {start}에서 {target}로 이동')
    return

  # 1. N-1개를 start에서 via로 이동 (target을 보조로 활용)
  hanoi(n - 1, start, via, target)

  # 2. 가장 큰 N번째 원판을 start에서 target으로 이동
  print(f'원판 {n}을 {start}에서 {target}로 이동')

  # 3. N-1개를 via에서 target으로 이동 (start를 보조로 활용)
  hanoi(n - 1, via, target, start)


*/
