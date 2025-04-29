## MCP의 모든 것을 알아봅시다.

원문: [MCP의 모든 것을 알아봅시다.](https://velog.io/@k-svelte-master/what-is-mcp)

MCP(Model Context Protocol)

-   기존에는 LLM과 연결하는 API 구조와 인증 방식이 상이하였지만 MCP는 규격화된 프로토콜 제공
-   동일한 방식의 API 구현 및 연결 - AI 도구의 표준화

기존에는 `Function Call`을 통해 LLM은 외부 세계와 상호작용을 수행하였다.
사용자가 프롬프트를 전달하면 LLM은 해당 대화가 '일반 대화' 혹은 '함수 호출'의 필요를 구분하고, 함수 호출(function call)이 필요하다고 느껴지면 외부 API를 통해 데이터를 가져와서 결과를 사용자에게 응답한다.

MCP는 `JSON-RPC 2.0`프로토콜을 기반으로 요청과 응답을 보냄

```json
// 요청
{
  "jsonrpc": "2.0",
  "id": "unique-request-id",
  "method": "메서드 이름",
  "params": { /* 매개변수 */ }
}

//응답
{
  "jsonrpc": "2.0",
  "id": "unique-request-id",
  "result": { /* 결과 데이터 */ }
}
```

`tools/list`를 통해 MCP서버에서 호출 가능한 도구 목록을 조회하고 `tools/call`을 통해 특정 도구를 호출한다.

표준화된 인터페이스를 통해서 서로 상이한 LLM 호출을 동일한 메서드와 형식을 통해 요청 /응답할 수 있다.

**MCP는 일괄된 인터페이스만 제공할 뿐, LLM은 직접 연결하여 구현하여야 한다.**

-   MCP 클래스에서 LLM 리스트를 관리
-   MCP의 도구 목록을 LLM이 인지
-   LLM의 도구 호출 시, MCP가 도구 결과 전달
-   LLM의 사용자에게 결과 제공

모든 도구를 호출하여 LLM에 인지하는 것은 비효율적이다. (자원 낭비, 선택 혼란)

모든 도구 중에서 요청에 따라 필요한 도구들의 범위를 좁혀서 사용하는 **LLM 워크플로우** 설정이 필요

`ReAct Pattern`

-   Reasoning + Actng
-   대표적인 워크플로우 중 하나

추론 -> 행동 -> 관찰을 반복해가며 도구 사용에 대한 정확성을 높이는 방식

-   추론(Reasoning) : 도구 사용 결정 및 이유 설명
-   행동(Acting): 선택 도구 호출 및 작업 수행
-   관찰(Obesrvation): 도구 실행 결과 분석 및 다음 단계 계획

MCP는 매우 유용한 표준화 프로토콜이지만, 진정한 가치는 이를 활용하는 호스트 앱의 워크플로우 설계에 있다. LLM의 능력을 최대한 활용하려면, 단순히 도구를 연결하는 것을 넘어서 지능적인 워크플로우를 설계해야 함.

`tools/list`나 `tools/call`을 넘어 MCP는 다양한 메서드를 제공

```
**프롬프트 관련**
* `prompts/get`: 특정 프롬프트 가져오기
* `prompts/list`: 사용 가능한 프롬프트 목록 조회

**리소스 관련**
* `resources/list`: 리소스 목록 조회
* `resources/templates/list`: 리소스 템플릿 목록 조회
* `resources/read`: 리소스 읽기
* `resources/subscribe`: 리소스 변경 구독
* `resources/unsubscribe`: 리소스 구독 취소
```

도구를 제공하는 것을 넘어 `prompts`까지 제안하여 새로운 LLM 생성에 기여할 수도 있음.

예를 들어,

1. MCP가 LLM에 프롬프트로 접근하는 것을 사용자에게 요청
2. 사용자는 프롬프트를 통한 접근을 수락, 거절할 수 있음
3. LLM의 응답 또한 사용자가 검토하여 MCP 서버 전달 결정 가능

이처럼 AI와 사용자가 결과를 도출하는 loop에 함께 기여하는 `human in the loop`를 형성할 수 있음

-   `Human in the Loop`학습과 조정, 검수가 포함된 선순환 루프를 통해 인공지능 모델이 정확한 작업을 수행할 수 있도록 하는 것을 의미

결국 MCP는 점차 단순한 프로토콜을 넘어서 더 많은 영역으로 확장될 것이고, AI 앱보다는 AI를 어떻게 활용할 것인지에 대한 **워크플로우 형성**에 집중될 것으로 전망
