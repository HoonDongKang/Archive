## 💻 CPU 스케줄링

### 📌 CPU 스케줄링 개요

1. 프로그램들이 실행되면 메모리에 올라가 프로세서가 되고
2. 프로세서들은 1개 이상의 쓰레드가 있으며
3. CPU를 차지하기 위해 운영체제의 명령을 기다린다.

✅ **CPU 스케줄링 고려사항**

1. 어떤 프로세스에게 CPU 사용권을 줘야 하나?
2. CPU를 할당받은 프로세스가 얼마의 시간동안 CPU를 사용할 수 있는가?

CPU Burst: 프로세스가 CPU를 할당받아 연속적으로 실행하는 구간
I/O Burst: 프로세스가 입출력(I/O) 작업을 수행하는 구간

### 📌 다중큐

✅ **프로세스 실행 과정**

1. 프로세스가 생성되면 **준비** 상태로 전환
2. 준비 상태에서 CPU 사용권을 받으면 **실행** 상태
3. 실행 중 I/O 요청은 **대기** 상태, 할당시간을 초과하면 **준비** 상태
4. 작업이 끝난다면 **완료** 상태로 전환된다.

✅ **준비 & 대기 상태 관리**

1. PCB 정보 내에 우선순위 정보를 탐색하여 **준비 상태 다중 큐(Ready Queue)** 에 넣는다.
2. 준비 상태 다중 큐에서 운영체제는 적당한 PCB를 선택하여 **실행** 상태로 전환시킨다. (적당한 - 스케쥴링 정책에 따라)
3. I/O 요청으로 **대기** 상태가 된다면 **I/O 작업에 따라 분류된 큐**에 들어간다.
4. I/O 작업이 마무리되면 **인터럽트**를 발생시켜 **실행** 상태로 전환한다.
   준비 & 대기 상태 -> Queue로 관리

### 📌 스케줄링 목표

**1. 리소스 사용률**

-   CPU, I/O device

**2. 오버헤드 최소화**

-   스케쥴링 계산, 컨텍스트 스위칭의 빈도

**3. 공평성**

-   모든 프로세스 공평하게 할당
-   프로세스의 중요도에 따라 상대적으로 공평하게 할당

**4. 처리량**

-   같은 시간 내 더 많은 처리

**5. 대기 시간**

-   작업 요청부터 작업 실행 전까지 대기 시간을 짧게

**6. 응답 시간**

-   작업 응답 시간을 짧게

모든 목표를 동시에 달성할 수는 없다.
**사용자가 사용하는 시스템에 따라 목표를 다르게 설정한다.**

-   터치 스크린 -> 응답시간이 중요
-   과학 계산 -> 처리량이 중요
-   일반 목족 -> 밸런스 유지

### 📌 FIFO

FIFO(First In First Out): 스케줄링 큐에 들어온 프로세스 순서대로 먼저 실행된다.

✅ **특징**

1. 한 프로세스가 완전히 끝나야 다른 프로세스가 시작함.
2. 짧은 작업의 프로세스가 긴 작업의 프로세스를 대기할 수도 있음.
3. I/O 작업을 대기하는 동안 CPU는 다른 작업을 하지 않음 => CPU 사용률 저하

✅ **평균대기시간**
프로세스가 여러 개 실행될 때 모두가 실행되기까지의 평균 대기 시간

-   프로세스\_1 (Burst Time: 25초) - **대기 시간: 0초**
-   프로세스\_2 (5초) - **대기 시간: 25초**
-   프로세스\_3 (4초) - **대기 시간: 30초**

❗️평균 대기 시간: 55 / 3 = 18.3초

-   프로세스\_3 (4초) - **대기 시간: 0초**
-   프로세스\_2 (5초) - **대기 시간: 4초**
-   프로세스\_1 (Burst Time: 25초) - **대기 시간: 9초**

❗️ 평균 대기 시간: 13 / 3 = 4.3초

프로세스 실행 순서에 따라 평균 대기 시간의 편차가 크기 때문에, 현대 운영체제에서는 사용 X
일괄처리시스템에서 주로 사용

### 📌 SJF

SJF(Shortest Job First): Burst Time이 가장 짧은 작업부터 우선 실행

✅ **특징**

1. FIFO의 단점이었던 '실행 순서에 따른 평균 대기 시간 차이'를 극복하기 위해 설계
2. 프로세스의 종료 시간를 예측하기 어려움 (Burst Time 파악이 힘듦)
3. Burst Time이 긴 프로세스는 계속 뒤로 밀려가서 대기 시간이 점차 길어진다.
4. 2,3 의 문제점으로 CPU 스케쥴링으로 채택되지 않음.
5.

### 📌 RR

RR(Round Robin): 일정 시간동안만 프로세스를 실행하고 다음 프로세스를 실행

✅ **특징**

1. **타임 슬라이스(`Time Slice`)** : CPU가 할당되는 일정한 시간

✅ **평균대기시간**
타임 슬라이스 : 10s

-   프로세스\_1 (Burst Time: 25초) - **대기 시간: 0 + 14 + 0초**
-   프로세스\_2 (4초) - **대기 시간: 10초**
-   프로세스\_3 (10초) - **대기 시간: 14초**

❗️평균 대기 시간: 38 / 3 = 12.67초

FIFO 알고리즘과 평균 대기 시간이 비슷하다면 RR 알고리즘이 더 비효율적

RR 알고리즘은 Context Switching이 일어나기 때문에 자원의 사용이 더 필요.

-   **타임 슬라이스가 큰 경우**
    -   먼저 들어온 프로세스가 실행되니 FIFO 알고리즘과 동일 (타임 슬라이스: 무한대)
    -   웹 브라우저, 음악 플레이어가 5초마다 끊김(타임 슬라이스: 5s)
-   **타임 슬라이스가 작은 경우**
    -   여러 프로세스가 동일하게 실행되는 것처럼되지만 Context Switching 처리량의 증가로 오버헤드가 너무 크다(1ms)

**최적의 타임 슬라이스**

1. 여러 프로세스가 버벅이지 않고 동시에 실행하는 것 같은
2. 오버헤드가 너무 크지 않은

**운영체제 타임 슬라이스**

1. Windows: 20ms
2. Unix: 100ms

### 📌 MLFQ

MLFQ(Multi Level Feedback Queue):

✅ **가정**

-   `CPU Bound Prcess`(P1): CPU 연산만 하는 프로세스 - CPU 사용률, 처리량 중요
-   `I/O BOund Process`(P2): 대부분 I/O 작업만 진행 - 응답 속도

**1. Time Slice가 100초일 때**
P2 (1초) 작업 후 I/O 작업 요청
P1 (100초) 실행
P1 10초 정도 작업 중, P2의 작업이 완료되어 인터럽트 발생 후 준비 큐에 삽입
P1 90초 나머지 실행
P2 1초 실행 I/O 작업
...

**2. Time Slice가 1초일 때**
P2 (1초) 작업 후 I/O 작업 요청
P1 (1초) 실행
P2 I/O 작업이 마무리되지 않았기 때문에 P1 준비 큐에 삽입되었다가 바로 실행
10 번 과정
P2 I/O 작업 완료 후, 인터럽트 실행, 준비 큐 삽입
P2 1초 실행 후 I/O작업

-   1번 **CPU 사용률**을 **100%** 지만 **I/O 사용률**은 10/101 (I/O 작업 시간 / 두 프로세스 총 실행시간) = **약 10%**
-   2번 **CPU 사용률**을 **100%** 지만 **I/O 사용률**은 10/11 (I/O 작업 시간 / 두 프로세스 총 실행시간) = **약 90%**
    -   1번에 비해서 CPU와 I/O 이용률이 높아 효율적이지만
    -   컨텍스트 스위칭을 자주하기 때문에 P1은 손해
    -   P2는 이득

✅ **특징**

-   MLFQ는 기본적으로 CPU 사용률과 I/O 사용률이 좋게 나오는 타임 슬라이스를 가진다.
-   `CPU Bound Process`는 큰 타임슬라이스를 준다.
-   주어진 타임 슬라이스 내에 작업이 완료되면 `I/O Bound Process`, 초과하면 `CPU Bound Process`로 추측
-   우선순위가 매겨진 여러 큐를 준비하여 우선순위가 높을 수록 타임 슬라이스가 크게 설정한다.
-   타임슬라이스가 초과될수록 점처 우선순위가 낮은 큐로 이동
-   결국 FIFO처럼 프로세스 연속적으로 작업이 가능

### 📌 더 찾아본 점

**❓선점형(preemptive) VS 비선점형(non-preemptive)?**

✅ **선점형** 스케쥴링은 하나의 프로세스가 현재 사용중인 CPU의 사용권을 점유할 수 있다.
반대로 **비선점형** 스케쥴링은 하나의 프로세스가 마무리되어야 CPU의 사용권을 할당받을 수 있다.

**❓추가적인 스케쥴링 방식?**

✅
![process_scheduling](./public/process_scheduling.png)

1. **SRTF**(Shortest-Remaining-Time First)

    - SJF의 단점 "100초짜리 A가 실행 중에 1초, 2초의 B,C 프로세서가 준비 상태라면, 100 초를 기다려야 한다"
    - SJF는 **비선점형**이기 때문에 작업을 기다려야 하지만, STCF는 큐의 남아있는 작업 시간을 계산하여 CPU의 점유를 뺏는 **선점형**이다.
    - 100초 A작업 도중 2초 작업 B가 도착하면, A의 남은 작업 시간과 비교하여 짧은 B가 먼저 실행된다.

2. **Priority**

    - **비선점형**: 도착한 프로세스마다 우선순위가 부여되고 동시에 도착한 프로세스의 경우 우선순위로 실행
        - 만약 우선순위가 낮더라도 먼저 실행 중이라면 작업이 종료될 때까지 대기
    - **선점형**: 도착한 순서가 다르더라도 프로세스의 priority에 따라 높은 우선순위 별로 CPU 점유

3. **MLQ**(Multi-Level Queue)

    - 여러 개의 우선순위가 부여된 큐로 관리되며 프로세스의 우선순위에 따라 각 큐에 삽입
    - 프로세스의 타입, 특징, 중요도에 따라 우선순위가 부여 - I/O 작업은 백업과 같은 배치 작업보다 높은 우선순위를 갖는다.
    - 각 큐의 요구조건마다 다른 CPU 스케쥴링 알고리즘을 사용한다.

    1. **고정 우선순위 선점 스케쥴링** (선점형)
        - 큐별로 우선순위가 고정되어 있고, 가장 하위 큐는 상위 큐에 프로세스가 없을 때만 동작이 가능하다.
        - 하위 큐의 프로세스가 동작하는 도중, 상위 큐의 프로세스가 들어오면 CPU 사용권을 빼앗긴다.
    2. **타임 슬라이싱** (비선점형)
        - 큐의 우선순위 별로 CPU 사용 시간의 점유율을 산출한다. > 1순위 50% / 2순위 30% / 3순위 20%

    - 프로세스의 큐 간 이동이 불가하여 유연성이 떨어진다.
    - 특정 큐에 프로세스가 몰리거나 우선순위 큐에 의해 하위 우선순위의 프로세스 대기 시간이 길어질 수 있음(기아 현상)

4. **MFLQ**(Multi-Level Feedback Queue)
    - `MLQ`에서 큐 간 이동이 불가하여 유연성이 부족한 문제 극복
    - 우선순위에 따른 여러 큐가 존재하며 프로세스의 우선순위는 동적으로 변경된다.
    - CPU 점유 시간을 초과하면 우선 순위가 낮아지며, 점유 시간 이내에 작업이 마무리된다면 우선 순위 유지
    - **에이징** - 모든 프로세스를 일정 주기마다 최상위 큐로 이동 / 오래 기다린 프로세스 상위 큐로 승격 (기아 현상 방지)

출처: [그림으로 쉽게 배우는 운영체제](https://www.inflearn.com/course/%EB%B9%84%EC%A0%84%EA%B3%B5%EC%9E%90-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C/dashboard)
