## 💻 알고리즘

### 📌 재귀

✅ **재귀** : 어떠한 것을 정의할 때 자기 자신을 참조하는 것

✅ **콜스택** : 함수가 호출되면서 올라가는 메모리 영역 (메모리 스택 영역) - FILO(First In Last Out)

-   함수를 호출하면 콜스택에 올라가고 종료되면 콜스택에서 제거된다.

1. **다른 함수 2개를 호출하는 상황**
    1. A가 실행되고 콜스택에 올라간다
    2. A가 종료되고 콜스택에서 제거된다
    3. B가 실행되고 콜스택에 올라간다
    4. B가 종료되고 콜스택에서 제거된다
2. **하나의 함수에서 다른 함수를 호출하는 상황**
    1. A가 실행되고 콜스택에 올라간다.
    2. A 실행 중, B를 실행하고 콜스택에 올라간다.
    3. B가 종료되고 콜스택에서 제거된다.
    4. A가 종료되고 콜스택에서 제거된다.
3. **재귀함수**
    1. A-1이 실행되고 콜스택에 올라간다.
    2. 내부에서 기저 조건을 확인하고 거짓이라면 다음 문장을 실행시킨다.
    3. 재귀에 의해 A-2가 실행하고 콜스택에 올라간다.
    4. ...
    5. 기저 조건에 의해 함수가 종료된다.
    6. 가장 상위 함수부터 콜스택에서 제거된다.
    7. 만약 기저조건이 없었다면 무한으로 콜스택에 올라가 메모리 부족 현상 발생

### 📌 재귀적으로 생각하기

    1. 반복문을 재귀함수로 대체하는 것은 더 나쁜 효율성을 갖는다. (콜스택 메모리 차지)
    2. 하위 문제를 기반으로 현재 문제를 계산한다.
    3. 하향식 계산은 재귀함수만 할 수 있다.

### 📌 버블 정렬

-   앞에 있는 데이터와 옆 데이터를 비교하여 자리를 바꾸고 정렬하는 방식
-   성능이 아쉬움(O(n^2))

### 📌 선택 정렬

-   정렬되지 않은 영역의 첫 원소를 마지막 원소까지 비교하여 정렬하는 방식
-   성능이 아쉬움(O(n^2))

### 📌 더 찾아본 점

**❓ 하노이 탑**

✅ 재귀적으로 생각해봐야할 부분

1. 마지막 원판(count) 위의 모든 원판은 temp로 가야한다. (to -> temp)
2. 마지막 원판은 to 로 간다
3. temp에 있는 모든 원판은 to로 가야한다.(from -> temp, temp -> from)

```javascript
{
    3 A C B
    // 1. 마지막 원판(count) 위의 모든 원판은 temp로 가야한다. (to -> temp)
    // hanoi(count - 1, from, temp, to);
    {
        2 A B C
        {
            1 A C B
            console.log( 1 block from A to C)
        }
        console.log( 2 block from A to B)
        {
            1 C B A
            console.log(1 block from C to B)
        }
    }
    //2. 마지막 원판은 to 로 간다
    console.log(3 block from A to C)

    //3. temp에 있는 모든 원판은 to로 가야한다.(from -> temp, temp -> from)
    // hanoi(count - 1, temp, to, from);
    {
        2 B C A
        {
            1 B A C
            console.log( 1 block from B to A)
        }
        console.log(2 block from B to C)
        {
            1 A C B
            console.log(1 block from A to C)
        }
    }
}
```

**❓ 하노이 탑 (count: 4) 진행과정**

```javascript
// 마지막 원판(count) 위의 모든 원판은 temp로 가야한다. (to -> temp)
// hanoi(count - 1, from, temp, to);
{
    4 A C B
    {
        3 A B C
        {
            2 A C B
            {
                1 A B C
                console.log(1 block from A to B)
            }
            console.log(2 block from A to C)
            {
                1  B C A
                console.log(1 block from B to C)
            }
        }
        console.log(3 block from A to B)
        {
            2 C B A
            {
                1 C A B
                console.log(1 block from C to A)
            }
            console.log(2 block from C to B)
            {
                1 A B C
                console.log(1 block from A to B)
            }
        }
    }
    console.log(4 block from A to C)
    {
        3 B C A
        {
            2 B A C
            {
                1 B C A
                console.log(1 block from B to C)
            }
            console.log(2 block from B to A)
            {
                1 C A B
                console.log(1 block from C to A)
            }
        }
        console.log(3 block from B to C)
        {
            2 A C B
            {
                1 A B C
                console.log(1 block from A to B)
            }
            console.log(2 block from A to C)
            {
                1 B C A
                console.log(1 block from B to C)
            }
        }
    }
}
```

출처: [그림으로 쉽게 배우는 자료구조와 알고리즘](https://www.inflearn.com/course/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B8%B0%EB%B3%B8/dashboard)
