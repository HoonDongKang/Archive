## What is the CAP theorem?

원문: [What is the CAP theorem?](https://www.ibm.com/think/topics/cap-theorem)

`CAP theorem`은 분산시스템이 세 가지 특성 중 두 가지만 제공해줄 수 있으며 일관성(consistency), 가용성(availablility), 분할 내성(partition tolerance)가 있다.

분산 시스템이란 하나의 노드 이상에 데이터를 저장하는 네트워크를 의미한다. 모든 cloud applications은 분산시스템이기에 자신의 application에 가장 필요한 데이터 관리 특성을 선택하기 위해 CAP theorem을 이해하는 것은 필수다

-   Consistency
    -   어떠한 노드에 연결되었든 모든 클라이언트는 동일한 데이터를 가져야함
    -   하나의 노드가 '쓰기' 모드일 때, 작업이 마무리되기 전까지 다른 모든 노드에게 즉시 전달하거나 복제해야 함.
-   Availability
    -   데이터를 요청하는 모든 클라이언트가 하나 이상의 노드가 다운되어도 응답을 받는 것을 의미
    -   분산시스템의 모든 노드는 예외없이 어떠한 요청에도 유효한 응답을 반환한다.
-   Partition tolerance
    -   파티션은 분산 시스템 내에서 통신 중단이다. 두 노드 간 연결이 끊어지거나 일시적으로 지연된다.
    -   분할 내성은 노드 간 통신 중단이 아무리 많아도 클러스터가 계속 작동해야 함을 의미

#### NoSQL애서 CAP theorem=

관계형 SQL은 수직적으로 확장 가능한 성격을 가진 반면, NoSQL은 수평적으로 확장가능하며 설계상 분산되어 있어, 분산형 네트워크 어플리케이션에 이상적이다.

즉, 상호 연결된 여러 노드로 구성되어있는 네트워크에서 빠르게 확장 가능

-   CP
    -   두 개의 노드 간 분할이 발생하면 해결될 때까지 일관성 없는 노드를 종료
-   AP
    -   불할이 발생하면 모든 노드를 계속 사용할 수 있지만 분할을 일으킨 노드는 다른 노드보다 이전 버전의 데이터를 반환 (불일치)
-   CA
    -   분할이 발생 시, 작업 수행 불가 - 내부 결함성 제공

분산 시스템에서 분할을 발생할 수 밖에 없음. 그렇기 때문에 CA 분산 DB는 실질적으로 존재할 수 없음.

#### MongoDB에서 CAP theorem

MongoDB 는 BSON 문서로 데이터를 저장하는 NoSQL DB 관리 시스템이다.

-   CP 데이터 저장소 타입 - 일관성과 네트워크 분할 / 가용성 저하
-   단일 마스터 시스템
    -   각 레플리카 셋은 쓰기 작업을 수신하는 기본 노드 하나만 있음
    -   다른 모든 노드는 기본 노드의 작업 로그를 복제하여 자신의 데이터 셋에 적용
    -   클라이언트는 기본적으로 기본 노드에서 읽지만 보조 노드에서 읽을 수도 있음
    -   기본 노드가 사용할 수 없게 되면 보조노드가 새 기본 노드로 선택
    -   다른 보조 노드가 새로운 기본 노드를 따라자기 전까지 쓰기 요청 불가 - 일관성 유지

#### Cassandra에서 CAP theorem

-   Apache Cassandra는 Apache 소프트웨어 재단에서 유지하는 오픈 소스 NoSQL DB이다
-   분산 네트워크에서 wide-column DB로 데이터 저장.
-   MnogoDB와 달리 masterless 아키텍쳐로 단일 지점이 아닌 여러 지점에서 실패가 발생할 수 있음

-   AP 데이터
    -   master node가 없어서 모든 노드가 연속적으로 가용가능하다.
    -   클라이언트가 언제든지 노드에 글을 쓰고 최대한 빠르게 불일치를 조정하여 최종 일관성을 제공
    -   네트워크 분할에서 일관성을 제공하지 못하며, 문제가 극복되면 일관성을 제공하기 위해 "수리" 기능을 제공
    -   지속적인 가용성은 트레이드 오프의 가치가 있을 정도로 높은 성능을 보여줌

#### Microservices에서 CAP theorem

마이크로 서비스는 자체 데이터베이스 및 데이터베이스 모델을 포함하여 자체 스택을 통합 한 느슨하게 결합되고 독립적으로 배포 가능한 응용 프로그램 구성 요소이며 네트워크를 통해 서로 통신.

-   Microservice 기반 application은 다수의 지역에서 동작시키기 위해서 최적의 DB를 고를 때 CAP theorem을 이해하는 것이 좋음.
    -   신속하게 반복하고 수평적으로 스케일링 => AP DB
    -   전자상거래 처럼 데이터 일관성이 중요 => PostgreSQL 같은 관계형 DB
