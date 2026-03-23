# The Three Pillars of JavaScript Bloat

- 원문 : [The Three Pillars of JavaScript Bloat](https://43081j.com/2026/03/three-pillars-of-javascript-bloat)

최근 몇년 간 [e18e](https://e18e.dev/) 커뮤니티가 눈에 띄이도록 설장하였고 이로 인해, 성능 향상에 초점을 둔 여러 기여가 증가하고 있다. 그 중 많은 부분을 차지하고 있는 것이 "cleanup"에 해당하는데, 이는 관리되지 않거나 오래된 수많은 패키지들은 정리하는 것이다.

이와 관련해서 자주 언급되는 주제 중 하나는 "dependency bloat(의존성 증가)"인데, 이는 npm 의존성 트리가 시간이 지날수록 점차 커지며 현대의 플랫폼에서 기본적으로 제공하는 기능들이 오래 전에 중복되어 불필요해진 코드들이 여전히 의존성에 포함되고 있다는 것이다.

이번 포스트에서는 의존성 트리 증가가 왜 발생하고 어떻게 해결하는 지에 대해 3가지 주요 관점을 통해 살펴보려 한다.

## 1. 오래된 런타임 지원

![](https://velog.velcdn.com/images/d159123/post/e0b1dbab-4d61-4e23-b144-907663052b58/image.png)

위 그래프는 대부분의 npm 의존성 트리에서 흔하게 볼 수 있는 구조다. 기본적으로 제공되는 간단한 유틸 함수가 존재하며 그 뒤에는 작은 의존성들이 줄줄이 이어져 있다.

왜 이런 현상이 발생할까? 왜 `is-string` 패키지를 `typeof` 체크 대신에 사용해야할까? 왜 `Object.hasOwn(또는 Object.prototype.hasOwnProperty)` 대신 `hasown`이 필요할까?

1. 매우 오래된 엔진을 지원하기 위해
2. 전역 네임스페이스 변조로부터 보호하기 위해
3. "Cross-realm" - 서로 다른 자바스크립트 환경

### 오래된 엔진 지원

IE6/7이나 굉장히 오래된 버전의 Node.js를 운영하기 위해 ES3를 지원해야하는 사람들이 존재할 수도 있다.

이러한 사람들에게는 현재 당연하게 사용하는 기능들이 존재하지 않는다.

- `Array.prototype.forEach`
- `Array.prototype.reduce`
- `Object.keys`
- `Object.defineProperty`

위와 같은 기능들은 ES5에 등장하였기 때문에 ES3에는 존재하지 않는다는 의미다.

오래된 엔진을 아직 실행시켜야하는 사람들에게 이러한 기능들은 직접 재구현을 해야 하거나 polyfill을 제공받아야 한다.

혹은, 버전을 업그레이드하는 게 가장 좋을 것이다.

### 전역 네임스페이스 변조 방지

두 번째 이유는 "안정성"이다.

기본적으로 Node에는 **["primordials"](https://github.com/nodejs/node/blob/7547e795ef700e1808702fc2851a0dcc3395a065/doc/contributing/primordials.md)** 라는 개념이 존재한다. 이는 전역 객체들을 프로그램이 시작되기 전에 미리 감싸서 저장해두고, 이후에 전역에서 직접 가져오는 것이 아닌 해당 값들을 사용하는 방식이다. 이로 인해 전역 네임스페이스가 변경되더라도 Node 실행에 영향을 주지 않게 된다.

예를 들어, Node에서 사용하는 `Map`을 우리가 재정의하여 사용한다면 Node 실행에 영향을 끼칠 것이다. 이를 방지하기 위해서 Node는 전역 객체에 직접 접근하기보다, 미리 확보해둔 원본 `Map` 참조를 사용할 수 있다.

엔진 입장에서는 어떠한 스크립트로 오염된 전역 네임스페이스가 프로그램 실행에 영향을 끼치면 안되기 때문에 이와 같은 방식은 매우 합리적이다.

패키지를 관리하는 사람들 또한 이러한 방식이 올바른 패키지 빌드 방식이라 생각한다. `intrincsics` 같은 패키지에서도 네임스페이스 오염을 막기위해 `Math.*` 를 다시 export하며 사용한다.

### Cross-realm values

마지막으로 cross-realm values가 있다. 이는 기본적으로 하나의 realm에서 다른 realm으로 전달되는 값들을 의미한다. 예를 들어, 웹 페이지에서 자식 `<iframe>`으로 값을 넘기거나 그 반대에 해당한다.

iframe 속 `new RegExp(pattern)`은 부모 페이지 속의 `RegExp`클래스와는 다르다. `window.RegExp !== iframeWindow.RegExp`에 해당하는 것이며 당연히 `val instanceof RegExp` 또한 `false`에 해당한다.

예를 들어, 내가 [chai](https://www.chaijs.com/)의 관리자고 동일한 문제를 직면했다고 쳐보자. 다른 realm(VM과 iframe와 같은 환경)에서의 assertion(“이 값은 반드시 이 상태여야 한다”라고 검증하는 것)을 지원해야할 때, 단순히 `instanceof` 검사에만 의존할 수 없다. 우리는 `Object.prototype.toString.call(val) === '[object RegExp]'`와 같이 생성자에 의존하지 않고 정규식인지 확인해야 한다.

위 그래프에서 등장한 `is-string` 또한 기본적으로 `new String(val)`을 전달하여 다른 realm에서도 안전하게 문자열을 비교하기 위한 것이다.

### 이게 왜 문제일까?

위의 내용들은 소수의 사람들에게만 해당하는 이야기다. 매우 오래된 엔진을 지원하거나, 다른 realm에 값을 전달하거나 혹은 전역 네임스페이스의 오염을 방지해야 한다면 이러한 패키지들을 사용하는 것이 맞다.

하지만 대부분의 사람들은 이에 해당하지 않다는 것이다. 우리는 지난 10년 내의 Node 버전을 사용하거나 최신 브라우저를 사용한다. 또한 ES5 이전 버전을 지원할 필요도 없으며 frame을 넘어 값을 전달하거나 환경을 깨트리는 패키지는 그냥 제거할 수도 있다.

하지만 이런 특수적인 호환성을 위한 레이어들이 대부분이 사용하는 일반적인 패키지들의 핵심 경로(hot path)까지 사용되고 있다. 이러한 기능들이 필요한 소수의 사람들을 위해서 사용되어야 할 패키지들이 관계가 역전되어 모두가 그 비용을 감당하고 있는 것이다.

## 2. 원자적 구조

[일부 사람들은 atomic하게 패키지를 쪼개야 한다고 말한다.](https://sindresorhus.com/blog/small-focused-modules) 이러한 방식은 조그만한 요소들로 구성하여 재사용성을 높이는 방식으로 사용된다.

이러한 방식의 구조는 다음과 같은 그래프를 보인다.

![](https://velog.velcdn.com/images/d159123/post/3339bd16-30d7-4b7f-9d1a-4f584bf79c17/image.png)

위와 같이 아주 작은 코드 조각들이 각각의 하나의 패키지로 존재한다. 예를 들어, `shebang-regex` 은 작성일 기준으로 다음과 같다.

```ts
const shebangRegex = /^#!(.*)/;
export default shebangRegex;
```

atomic한 단계까지 코드를 쪼갬으로써 더 높은 수준의 패키지를 작은 조각들의 조합을 통해 쉽게 만들 수 있다.

이러한 atomic한 패키지들이 얼마나 세분화되어있는 지 확인해볼 수 있다.

- `arrify` - Converts a value to an array (Array.isArray(val) ? val : [val])
- `slash` - Replace backslashes in a file-system path with /
- `cli-boxes` - A JSON file containing the edges of a box
- `path-key` - Get the PATH environment variable key for the current platform (PATH on Unix, Path on Windows)
- `onetime` - Ensure a function is only called once
- `is-wsl` - Check if process.platform is linux and os.release() contains microsoft
- `is-windows` - Check if process.platform is win32

만약 새로운 CLI를 만든다고 할 때, 우리는 새로운 구현없이 위의 기능들을 끌어다가 사용하면 된다. 또한 `env['PATH'] || env['Path']` 와 같이 사용할 필요가 없어지며 이 또한 위 패키지를 끌어 사용하면 된다.

### 이게 왜 문제인가

현실에서는 대부분 혹은 모든 패키지들이 그들이 의도한대로 재사용이 가능한 조각들로 분리되어 사용되지 않는다. 오히려 더 큰 트리에서 다양한 버전으로 넓은 범위에 중복되거나 다른 하나의 패키지를 위한 일회성 패키지가 되기도 한다.

#### 일회성 패키지

가장 세분화된 패키지를 살펴보자면

- `shebang-regex`: 거의 동일한 메인테이너의 shebang-command에서만 사용
- `cli-boxes`: 거의 동일한 메인테이너의 boxen과 ink에서만 사용
- `onetime`: 거의 동일한 메인테이너의 restore-cursor에서만 사용

이러한 패키지들은 하나의 사용처만 존재하며 inline 코드와 동일한 효과를 발생하지만 더 큰 비용이 발생된다.(npm 요청, tar 압축 해제, 대역폭 등..)

#### 중복

[nuxt 의존성 트리](https://npmgraph.js.org/?q=nuxt@4.4.2) 에서도 몇몇 중복된 조각들을 발견할 수 있다.

- `is-docker` (2 versions)
- `is-stream` (2 versions)
- `is-wsl` (2 versions)
- `isexe` (2 versions)
- `npm-run-path` (2 versions)
- `path-key` (2 versions)
- `path-scurry` (2 versions)

이 코드를 인라인으로 넣는다고 중복이 사라지는 것은 아니지만 버전 해결, 충돌 혹은 패키지를 가져오는 것들에 대해 부담이 줄어든다.

인라인 코드 작성으로 인한 중복은 비용이 거의 없는 반면, 패키지 분리에 대한 비용은 비싸다.

#### 더 커지는 패키지 공급망(Supply chain area)

(여기서 supply chain은 잘게 쪼개져서 이어지는 패키지들의 chain을 의미하는 듯)

패키지가 많아질수록 우리의 패키지 공급망이 길어지고, 각각의 패키지들은 유지 보수성, 보안 등에서 잠재적으로 에러가 발생될 수 있다.

예를 들어, 작년에 이런 작은 패키지를 관리하는 관리자 계정이 탈취되는 사건이 발생하였었다. 이로 인해 수백 개의 작은 패키지 조각들이 영향을 받았고 이를 통해 구축된 더 높은 단계의 패키지들 또한 영향을 받게 되었다.

사실 `Array.isArray(val) ? val : [val]`와 같이 단순한 로직은 패키지가 필요하지 않다. 단순히 인라인으로 작성하여 손상될 위험을 피하는 것이 더 낫다.

앞서 말한 문제와 비슷하게 특정 상황을 위한 철학이 일반적인 패키지의 hot path까지 도달한 상황이다. 이 또한 결국 일반 사용자들이 부담하게 된다.

## 3. 오래된 Ponyfill 사용

![](https://velog.velcdn.com/images/d159123/post/5e561375-7e90-4c18-b054-674b69a1c662/image.png)

당신이 만약 앱을 만든다면 당신이 선택한 엔진이 아직 지원하지 않는 어떠한 기능을 사용하고 싶을 수 있다. 이런 경우에 polyfill이 유용한데, 이는 대체적으로 구현을 해주기 때문에 원래 지원이 되는 것처럼 해당 기능을 사용할 수 있다.

예를 들어, [temporal-polyfill](https://npmx.dev/package/temporal-polyfill)을 사용하면 새로운 Temporal API를 polyfill로 제공하여 엔진 지원 여부와 상관없이 `Temporal` 사용이 가능하다.

**만약 라이브러리를 만드는 경우라면 어떻게 해야 하나?**

일반적으로 라이브러리는 polyfill을 로드하지 않는다. 이는 사용자의 관점이지 라이브러리는 환경을 오염시키면 안된다. 대안적으로 몇몇 관리자들은 ponyfill이라는 것을 사용하기도 한다.

ponfill은 기본적으로 polyfill이지만 전역 객체를 변경하지 않고 import해서 사용한다.

사용하는 엔진에 이미 구현되어 있다면 해당 기능을 사용하고 존재하지 않다면 직접 구현한 polyfill로 대체되어 사용된다. 이는 환경을 오염시키지 않고 라이브러리들의 더 안전한 사용을 가능하게 한다.

예를 들어, [@fastly/performance-observer-polyfill](https://github.com/fastly/performance-observer-polyfill/tree/455bd5eb62c1e07af3309e4c212f73c414e2a7d8?tab=readme-ov-file#usage-as-a-ponyfill)은 `PerformanceObserver`에 대해 polyfill과 ponyfill을 모두 제공한다.

### 이게 왜 문제인가

이 Polyfill들은 그 시점에는 의도한대로 잘 작동한다. 환경을 오염시키지 않거나 어떤 polyfill을 설치해야 하는지 알지 않아도 대체 기술들을 사용할 수 있게 해준다.

하지만 문제는 polyfill이 오랫동안 패키지에 살아남았을 때 발생한다. 대체되어 사용했던 기술들이 이제 모든 엔진에서 지원된다고 하였을 때, ponyfill은 제거되어야 한다. 하지만 이러한 작업이 가끔 수행되지 않은 체, ponyfill이 여전히 필요 이상으로 그 자리를 대체하고 있다.

그 결과, 이미 10년이 지난 지금에서도 정말 많은 패키지들이 ponyfill에 의존하고 있다.

- `globalthis` - ponyfill for `globalThis` (widely supported in 2019, 49M downloads a week)
- `indexof` - ponyfill for `A`rray.prototype.indexOf` (widely supported in 2010, 2.3M downloads a week)
- `object.entries` - ponyfill for `Object.entries` (widely supported in 2017, 35M downloads a week)

이 패키지들이 Pillar 1 때문에 유지되는 것이 아니라면, 대부분 아무도 제거할 생각을 하지 않은 체 사용되고 있다.

장기적으로 지원되는 모든 엔진에서는 대체되었던 기능이 지원되기 시작한다면 ponyfill은 제거되어야 합니다.

## 어떻게 해야 하나?

대부분의 이런 문제들은 의존성 트리 깊게 존재하기에, 이를 모두 풀어내고 깔끔하게 정리하기에는 큰 작업이다. 이것은 또한 관리자와 사용자들이 많은 시간과 노력을 쏟아야만 하는 작업이다.

하지만 나는 모두 함께 작업을 시작한다면 의미있는 진전을 이룰 것이라 생각한다.

스스로에게 먼저 물어봐라. "내가 왜 이 패키지가 필요한가" 혹은 "정말 내가 이 패키지가 필요한가?"

만약 당신이 많은 문제들을 갖고 있는 의존성을 직접적으로 마주한다면 대체할 방안을 찾아봐라. 그 출발점으로 [module-replacements](https://e18e.dev/docs/replacements/) 프로젝트를 참고할 수 있다.

### knip을 통해 사용하지 않는 의존성 제거하기

[knip](https://knip.dev/)은 사용하지 않는 의존성, 죽은 코드 등을 탐색하고 제거해주는 프로젝트다. 이 경우에 당신이 사용하지 않는 의존성을 찾아 제거할 수 있는 도구로 사용할 수 있다.

이 방법이 위에 언급된 문제들을 무조건적으로 해결해주진 않지만 작업을 시작하기 전에 의존성 트리를 정리하는 것은 훌륭한 시작점이 될 수 있다.

[문서 참고](https://knip.dev/typescript/unused-dependencies)

### e18e CLI를 통해 대체 가능한 의존성 찾기

[e182 cli](https://github.com/e18e/cli)은 `analyze` 모드를 통해 더이상 필요하지 않는 의존성을 찾아내거나 더 좋은 대체 방안을 제공해주는 커뮤니티가 존재한다.

```
$ npx @e18e/cli analyze

...

│  Warnings:
│    • Module "chalk" can be replaced with native functionality. You can read more at
│      https://nodejs.org/docs/latest/api/util.html#utilstyletextformat-text-options. See more at
│      https://github.com/es-tooling/module-replacements/blob/main/docs/modules/chalk.md.

...
```

이렇게 사용한다면 어떤 의존성을 정리할 지 직접적으로 빠르게 식별할 수 있다. 또한`migrate` 명렁으를 통해 의존성에 대해 자동적으로 마이그레이션이 가능하다.

```
$ npx @e18e/cli migrate --all

e18e (cli v0.0.1)

┌  Migrating packages...
│
│  Targets: chalk
│
◆  /code/main.js (1 migrated)
│
└  Migration complete - 1 files migrated.
```

이 경우에는 `chalk`에서 동일한 기능의 더 작은 패키지를 제공하는 `picocolors`로 마이그레이션을 진행했다.

미래에는 이러한 CLI가 사용자 환경 기반으로 추천해줄 것이다. 예를 들어, 노드 버전이 충분하다면 특정 색깔 라이브러리보다 기본적으로 제공되는 `styleText`를 사용하도록 제안한는 방식이다.

### npmgrpah를 통해 의존성 트리를 조사하기

[npmgraph](https://npmgraph.js.org/)은 의존성 트리를 시각화하여 볼 수 있고, 어디서 문제가 발생했는 지 탐색이 가능하다.

예를 들어 [ES lint](https://npmgraph.js.org/?q=eslint@10.1.0#select=find-up%405.0.0)의 의존성 그래프는 다음과 같다.

![](https://velog.velcdn.com/images/d159123/post/e529930e-d55c-46e8-9f41-8bf772eb9cc9/image.png)

이 그래프에서 `find-up` 브랜치는 다른 깊은 의존성을 갖지 않은 체 분리되어 있다. 상위 디렉토리로 파일을 탐색하는 정도의 간단한 기능이라면 [`empathic`](https://npmgraph.js.org/?q=empathic@2.0.0#select=empathic%402.0.0) 같은 대안적인 패키지를 사용해볼 수 있다.

### module-replacements

[module-replacements](https://github.com/es-tooling/module-replacements)는 커뮤니티 전체를 위해 어떤 패키지를 본래 제공하는 기능으로 대체하거나 더 좋은 성능의 대안을 모색할 수 있는 중앙 데이터 셋으로 이용되고 있다.

대안이 필요하거나 의존성을 확인해보기 위해서는 이 데이터 셋을 참고하기 좋다.

비슷하게 기본적으로 제공하는 기능으로 어떠한 의존성을 대체하거나, 더 안정적인 대안을 발견한다면 해당 프로젝트에 기여하여 다른 사람들에게 공유할 수 있다.

[codemods project](https://github.com/es-tooling/module-replacements-codemods)와 같은 프로젝트 또한 대안책으로의 패키지 마이그레이션을 자동적으로 제공해준다.

## 마무리

우리는 소수의 사람들이 좋아하는 특정 아키텍쳐를 유지하거나 필요로 하는 낮은 호환성을 위해 그 대가를 감당하고 잇다.

패키지는 각자 만드록 싶은 대로 만드는 것이기에 오로지 이 패키지를 만든 사람들만의 잘못은 아니다. 대부분의 패키지 제작자들은 현재에서 제공되는 API나 크로스 호환성 등의 기능들이 존재하지 않았던 시대에 패키지를 만든 구세대 Javascript 개발자들이다. 그렇기에 패키지를 그렇게 만든 이유는 분명 그 때에서의 최선의 선택이었기 때문이다.

문제는 우리가 그 때로부터 앞으로 나아가지 못했다는 점이다. 이미 수년 전부터 지원되었던 기능임에도 여전히 우리는 의존성을 설치하고 있다.

하지만 나는 이를 역으로 생각하여 해결할 수 있다고 믿는다. 소수의 사람들만이 특정 구조를 사용함으로써 비용을 감당하고 나머지 대부분의 사람들은 현대적이고 가벼우며 널리 지원되는 코드를 사용하는 것이다.

다행히 `e18e`나 `npmx`는 문서나 도구 등을 통해 도움을 주고 있다. 당신 또한 이유에 집착하며 의존성을 더 가까이 살펴보고 의심함으로써 도움을 줄 수 있다. 당신의 의존성에 대해 왜 필요한 지, 그리고 어떻게 대체할 수 있는지 문제를 제기해봐라

우리는 이 문제를 해결할 수 있습니다.
