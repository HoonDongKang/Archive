## Event Loop in NodeJS

원문: [Event Loop in NodeJS](https://medium.com/@manikmudholkar831995/event-loop-in-nodejs-999f6db7eb04)

### 이벤트 루프

이벤트 루프는 활성화된 핸들이나 요청이 없는 한 계속 실행되기에 **"반 영구 루프(Semi-Infinite Loop)"** 라고 불린다.

> 핸들: 타이머, 시그널, TCP/UDP같은 소켓처럼 long-lived하는 객체
> 요청: 파일 읽기/쓰기 나 네트워크 연결 등 short-lived하는 작업

1. 루프 반복이 시작마다 `now`를 계산하여 해당 반복의 전체 참조값으로 사용. 시스템 콜 빈도를 줄이기 위해 캐싱

2. 만약 루프가 `UV_RUN_DEFAULT`로 실행된다면 타이머 실행.
    1. `setTImeOut`이나 `setInterval`같은 함수들의 예약된 콜백들이 별도의 큐에 쌓여 실행
    2. `UV_RUN_DEFAULT`: libuv 라이브러리의 상수로, 등록된 작업이 다 끝날 때 까지 이벤트 루프를 실행. (`uv_run(loop, UV_RUN_DEFAULT)`)
3. 참조 혹은 종료된 핸들이나 활성화된 요청이 있는지를 통해 루프가 살아있는 지 확인
4. 대기(pending)중인 콜백을 호출하고 I/O 콜백은 I/O 확인 후 바로 호출되지만 상황에 따라 다른 루프로 연기되는 콜백이 있을 수 있다. 이전 루프에서 연기된 I/O 콜백이 있다면 이 단계에서 실행
5. idle 핸들 콜백이 호출. 활성화되어 있다면 각 루프 반복마다 실행. 이벤트 루프가 시급한 작업을 처리하지 않을 때, 낮은 우선순위의 작업을 처리하기 위해 호출.
    1. idle 핸들은 즉각적인 액션이나 특정 이벤트보다 정기적으로 실행되어야 하는 작업에 유용
    2. idle은 이벤트 루프가 놀고 있을 때 실행되느 콜백(아무 것도 안 하고 있을 때)
6. I/O 폴링 이전에 자료구조나 설정을 업데이트하는 필수 작업을 수행하기 위한 prepare handle 콜백을 실행
7. I/O 블로킹 전에 poll 타임아웃이 계산.
    1. timeout = 0
        1. `UV_RUN_NOWAIT`으로 실행되거나 루프가 정지될 예정이거나(`uv_stop()`),
        2. 활성화된 idle 핸들이 없거나
        3. 활성화된 핸들이나 요청이 없거나,
        4. 종료 대기 중인 핸들이 있거나
    2. 의 경우에 해당하지 않을 때 타임아운은 가장 가까운 타이머가 만료될 때까지로 설정되며
    3. 활성화된 타이머가 없으면 무한대로 설장
8. I/O 처리를 위해 루프는 블로킹된다. 이전 단계에서 계산된 만큼 I/O를 기다리고 특정 파일 디스크립터의 읽기나 쓰기 작업을 감시하던 모든 I/O 관련 핸들의 콜백들은 이때 실행.
9. I/O 폴링 이후에 핸들 콜백이 즉시 실행되어 `setImmediate`콜백을 처리
10. close 콜백이 실행
    1. `close`: 핸들 작업 후 자원을 해제하기 위한 콟백
11. 루프 `now`갱신
12. 반복 종료

### `process.nextTick` and `promise callbacks`

`process.nextTick()`은 이벤트 루프의 일부가 아니지만 `nextTickQueue`는 이벤트 루프 현재 단계와 상관없이 현 작업이 마무리 된 후에 실행.

`process.nextTick()`은 현재 작업이 완료된 직후 이벤트 루프가 다음 단계로 넘어가기 전 콜백 함수를 바로 실행시켜주는 함수.

하지만 재귀적으로 실행시키면 이벤트 루프가 poll 단계에 도달하는 것을 지연시켜가며 I/O를 starving시키는 상황이 될 수 있음

사용 시기

1. 다른 대기 중인 작업을 기다리지 않고 즉시 실행하거나 높은 우선순위의 작업을 빠르게 처리
2. 이벤트 루프가 계속되기 전에 에러를 처리하고 불필요한 자원을 정리하거나 요청을 다시 시도해야하는 경우
3. 콜 스택이 모두 해제된 뒤 이벤트 루프가 다음 단계로 넘어가기 전에 콜백 실행

출력 순서 측면에서, `process.nextTick()`의 콜백들은 항상 `Promise 콜백`들보다 먼저 실행

### I/O polling

예제 1

```js
const fs = require("fs");

setTimeout(() => {
    console.log("hello");
}, 0);
fs.readFile("./AWS Migration.txt", () => {
    console.log("world");
});
setImmediate(() => {
    console.log("immediate");
});

for (let index = 0; index > 2000000000; index++) {}
```

```md
hello
immediate
world
```

1. `for` 루프 실행
2. timer 콜백 실행으로 `hello` 출력
3. I/O 콜백으로 넘어가서 readFile의 파일 읽기 작업은 완료되었지만 I/O 콜백은 I/O 폴링 단계에서만 큐에 추가되기 때문에 큐에는 아직 아무 것도 없음
4. immediate 콜백 실행 `immediate` 출력
5. 이벤트 루프 처음부터 다시 시작하여 “Call pending callback stage” 단계에서 readfile 콜백 실행 `world`출력

예제 2

```js
const fs = require("fs");
const now = Date.now();
setTimeout(() => {
    console.log("hello");
}, 50);
fs.readFile(__filename, () => {
    console.log("world");
});
setImmediate(() => {
    console.log("immediate");
});
while (Date.now() - now < 2000) {} // 2 second block
```

```md
hello
immediate
world
```

1. `while` 문으로 2초 볼로킹
2. 타이머 콜백에서 `hello` 출력
3. I/O callback 단계에서 다직 큐에 담겨있지않음
4. I/O 폴링에서 readFile 콜백이 큐에 추가
5. setImmediate 실앻 `immediate`출력
6. 다음 루프에 `world` 출력

만약 `while`문이 없었더라면

```md
immediate
world
hello
```
