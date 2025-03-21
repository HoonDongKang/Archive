## 💻 개요

### 📌 스택(Stack)

#### ✅ 개념

**FILO(First In Last Out)** 규칙을 갖고 있는 리스트
먼저 들어온 노드가 가장 나중에 나간다.

1. 엘리베이터에 줄을 서있는 상태 - 엘리베이터에서 내릴 때는 늦게 탄 사람이 먼저 내린다.
2. 설거지 - 씻어야 할 접시가 쌓이고 마지막에 쌓인 접시 먼저 설거지를 한다.
3. 되돌리기 작업 - 실행된 작업이 쌓이고 마지막 작업으로 되돌린다.
4. 문법 검사기 - 열린 괄호를 먼저 넣고 닫는 괄호가 올바르게 들어오는 지 확인

#### ✅ 구현

**스택의 추상자료형**

1. `push`: 데이터 삽입
2. `pop`: 데이터 제거
3. `peek`: 데이터 참조
4. `isEmpty`: 비었는지 체크

### 📌 큐(Queue)

#### ✅ 개념

**FIFO(First In First Out)** 규칙을 갖고 있는 리스트
먼저 들어간 노드가 먼저 나온다.

1. 마트에서 줄 설 떄 - 먼저 줄 선 사람이 계산을 먼저 한다.
2. 운영체제 프로세스 - 운영체제가 프로세스 순서대로 CPU 연산을 처리

**1. `tail`의 등장**

-   `head`만 있다면 처음 들어온 데이터를 제거하기 위해서 `head`부터 해당 노드까지 이동해야 함 - **O(n)**
-   `tail`을 저장하여 마지막 노드(처음 들어온 데이터)의 위치를 저장 - **O(1)**

**2. 단방향 연결리스트 보완**

-   `tail` 노드를 삭제해도 이전 노드를 참조할 수 없음(단방향으로 `head`부터 저장되기에) - **O(n)**
-   이중 연결리스트를 통해 각 노드는 이전 노드와 다음 노드의 위치를 저장한다 - **O(1)**

#### ✅ 구현

**큐의 추상자료형**

1. `enqueue`: 데이터 삽입
2. `dequeue`: 데이터 제거
3. `front`: 데이터 참조
4. `isEmpty`: 비었는지 체크

### 📌 덱(Deque)

#### ✅ 개념

데이터의 삽입과 제거를 `head`와 `tail`에서 자유롭게 가능하다.

#### ✅ 구현

**덱의 추상자료형**

1. `printAll`: 모든 데이터 출력
2. `addFirst`: `head`에 데이터 삽입
3. `removeFirst`: `head`에서 데이터 제거
4. `addLast`: `tail`에 데이터 삽입
5. `removeLast`: `tail`에 데이터 제거
6. `isEmpty`: 리스트 비었는지 체크

### 📌 해시테이블

#### ✅ 개념

-   해시(Hash), 맵(Map), 해시맵(HashMap), 딕셔너리(Dictionary)라고도 불린다.
-   해시와 테이블이 합쳐진 자료구조

**해시함수**
입력값(`key`)를 고유한 값(`index`)로 변환하는 함수.

-   데이터의 균등한 분포가 중요

해시 함수를 통해 반환된 `index`값과 `value`를 테이블에 저장하고 동일한 `index`를 반환한 다른 `value`는 연결 리스트를 통해 저장이 가능하다.

**장점**

1. 빠른 데이터 탐색, 삽입, 삭제가 가능 (`O(1)`)
    - 만약 동일한 인덱스의 연결 리스트로 조회 시, `O(n)`

**단점**

1. 해시 함수에 따라 메모리 공간 낭비가 발생할 수 있음
2. 좋은 해시 함수의 구현은 필수적이다.

#### ✅ 구현

**해시 테이블의 추상자료형**

1. `set`: 데이터 삽입
2. `get`: 해당 `key`의 `value` 조회
3. `remove`: 해당 `key`의 `value` 제거

### 📌 셋

#### ✅ 개념

-   셋(Set) : 데이터 중복을 허용하지 않는 자료구조

#### ✅ 구현

**셋의 추상자료형**

1. `add(data)`: 데이터 삽입
2. `isContain(data)`: 데이터 체크
3. `remove(data)`: 데이터 제거
4. `clear()`: 셋 비우기
5. `isEmpty()`: 셋 비었는지 체크
6. `printAll()`: 모든 데이터 출력

### 📌 더 찾아본 점

**❓ 해시 충돌에 대한 극복 방법**

✅ 해시 충돌(Hash Collision)을 극복하기 위해 다양한 방법들이 존재.

1. **분리 연결법(Separate Chaining)**: 해시 함수를 통해 동일한 버킷에 할당된 데이터들을 연결시켜 관리한다.
    - 간단한 구현으로 해시 테이블의 크기를 확장할 필요가 없다
    - 데이터의 양이 많아질 수록, 동일 버킷에 체이닝된 데이터가 많아진다. (쏠림 현상)
2. **개방 주소법(Open Addressing)**: 버킷에 하나의 데이터만 저장하고, 충돌 시에 비어있는 버킷에 할당
    - 동일한 규칙을 통해 비어있는 버킷을 찾아야 한다.
        1. **선형 탐색(Linear Probing)**: `index`로부터 `n`만큼 이동하여 빈 버킷 검색
        2. **제곱 탐색(Quadratic Probing)**: `index`로부터 제곱수만큼 이동하여 빈 버킷 검색(+1, +4, +9,,)
        3. **이중 해시(Doouble Hashing)**: 다른 해시함수를 한 번 더 적용
    - [선형 탐색으로 구현해본 해시 테이블](https://github.com/HoonDongKang/Archive/blob/main/lectures/%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C_%EC%89%BD%EA%B2%8C_%EB%B0%B0%EC%9A%B0%EB%8A%94_%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/src/hashTable.mjs)

출처: [그림으로 쉽게 배우는 자료구조와 알고리즘](https://www.inflearn.com/course/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B8%B0%EB%B3%B8/dashboard)
