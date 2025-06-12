## 💻 가중 그래프

### 📌 개념

간선의 크기를 저장한다.

-   크기는 사용자가 정하기 나름(정점 간의 거리나 비용이 될 수 있음)

간선은 방향도 있으며 방향에 따라 가중치가 달리질 수도 있음

### 📌 다익스트라 알고리즘

최적의 경로를 찾을 때 최적의 알고리즘

1. `shorted_path_table`에 목표 정점과 거리를 초기화
2. `visited`와 `unvisited` 배열로 구분
3. `unvisited`에서 차례로 `visited`로 이동하면서 표 업데이트
    1. 인접도시의 거리들을 `shorted_path_table`에 저장하고
    2. 가까운 거리의 정점을 선택하여 `visited`로 이동
    3. 표의 값 + 인접 도시 거리 > 표의 값이면 표 수정 X

출처: [만들면서 쉽게 배우는 컴퓨터 구조](https://www.inflearn.com/course/%EB%A7%8C%EB%93%A4%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EC%BB%B4%ED%93%A8%ED%84%B0-%EA%B5%AC%EC%A1%B0/dashboard)
