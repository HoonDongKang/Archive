## Child Processes: Multitasking in NodeJS

원문: [Child Processes: Multitasking in NodeJS](https://medium.com/@manikmudholkar831995/child-processes-multitasking-in-nodejs-751f9f7a85c8)

NodeJS는 싱글 쓰레드이지만 동기적으로 CPU 집약적입 작업을 독립적으로 할 때 멀티 프로세스가 필요할 때가 있음
이 때 `node:child_process`를 통해 자식 프로세스가 생성되고 IPC와 같은 통신 채널을 생성할 수 있다.

-   이 모듈은 OS와 소통하거나 쉘 커맨드 실행 가능
-   JS 뿐만 아니라 다른 프로그래밍 언어를 실행시킬 수 있다.

### 왜 필요?

워커 쓰레드로 CPU 집약적인 작업을 다룰 수 있게 되었는데 자식 프로세스가 왜 필요하냐?
워커 쓰레드는 힙 영역, v8인스턴스, 이벤트 루프 등을 다로 갖고 있지만 별도의 sub-process가 필요한 작업들이 있다.

1. 외부 프로그램 실행
    1. 별도의 프로세스로 스크립트나 외부 프로그램 실행이 가능하다
2. 개선된 격리성
    1. 워커 스레드와 달리 Node.js 런타임 인스턴스를 제공한다.
    2. 각각의 메모리 영역이 있으며 IPC를 통해 메인 프로세스와 소통 가능
    3. 자원 충돌이나 분리가 되어야 하는 종속성들을 관리하는데 이점
3. 개선된 확장성
    1. 작업을 여러 프로세스에 분산시켜 멀티 코어 시스템 성능 활용
    2. 동시에 더 많은 요청 처리, 확장성 개선
4. 개선된 견고성
    1. 자식 프로세스가 터졌을 때, 메인 프로세스가 다운되지는 않음
    2. 장애가 발생하여도 애플리케이션 안정성과 복원력 유지

### 자식 프로세스 생성

`child_process`모듈을 통해 자식 프로세스 내부에서 시스템 명령을 실행시키면 OS 접근 가능

-   동기, 비동기적으로 가능
-   `const { spawn, fork, exec, execFile } = require(‘child_process’);` 비동기적 하위 프로세스 생성 메서드

각 메서드는 `ChildProcess`인스턴스 반환

-   `EventEmitter` API를 통해 부모 프로세스에 리스너 함수 등록 가능
    -   `disconnect`: 부모, 자식 프로세스에서 실행 시 호출
    -   `error`: 생성 불가, 프로세스 죽음, 메세지 전달 실패 등 에러
    -   `close`: 자식 프로세스의 `stdio` 스트림 닫힐 때.
    -   `exit`: 자식 프로세스가 끝날 때
    -   `message` : 자식 프로세스가 `process.send()`로 메세지를 전달할 때 부모/자식 통신
    -   `spawn`: 자식 프로세스가 성공적으로 생성되었을 때

### .spawn()으로 프로세스 생성

`.spawn()` 메서드는 실행 명령을 전달하는 자식 프로세스 생성 가능

-   명령, 문자열 배열, 옵션 객체 등으로 명령 전달 가능
-   `env` `shell` `detached` `signal` 등

다른 프로세스 생성 메서드와 다른 점은 새로운 프로세스에서 외부 애플리케이션을 생성하고 I/O에 대한 스트리밍 인터페이스 반환

-   대용량 데이터를 다루거나 해당 데이터를 읽기 좋음
    -   적은 메모리 사용
    -   자동 백프레셔 처리
    -   버퍼링된 청크에서 데이터 지연
    -   이벤트 기반, 논 블로킹
    -   버퍼를 통한 v8 힙 메모리 제한 극복

각 자식 프로세스는 3가지 기본 `stdio` 스트림을 가진다. - `child.stderr`, `child.stdout`: 읽기 스트림 - `child.stdin`: 쓰기 스트림

### .fork()로 프로세스 생성

`.fork()`는 새로운 프로세스에서 Node.js 스크립트를 실행하고 두 개의 프로세스 간 IPC 채널을 원할 때 유용하다.

`ChildProcess`객체 반환하며 부모, 자식 양방향으로 메세지 전달이 가능한 통신 채널 빌트인이 제공된다.

-   자식 프로세스가 `process.on('message')`를 하고 `process.send('message to parent')`를 하면 데이터를 주고 바들 수 있음
-   부모 프로세스는 `child.on('message')`, `child.send('message to child')` 하면 사용 가능

### .exec()를 통해 프로세스 생성

셸 구문 사용, 데이터 크기가 작은 경우 유리.
출력값을 버퍼링하고 콜백 함수에 전달 <-> `spawn`은 스트리밍

### .execFile()을 통해 프로세스 생성

셸을 사용하지 않고 파일 실행해야 할 경우

### 선택

1. 노드 애플리케이션인가? :`fork`
2. 스트림이 필요하거나 데이터가 큰가? : `spawn`
3. 셀이 필요한가: `Exec`
4. `ExecFile`

### Handling I/O between child and parent

`stdio`옵셥은 자식 프로세스로부터 I/O 목적지를 결정.
문자열 혹은 배열로 전달 -> 문자열이 단축

```md
stdio: 'pipe'
stdip: ['pipe', 'pipe', 'pipe']
```

자식 프로세스는 파일 디스크립터 0-2에 접근 가능한 스트림을 갖고 있음
`child.stdio[0], child.stdio[1], child.stdio[2]`

-   특정 파일 디스크립터 지정 혹은 무시 가능
