## 💻 CPU 만들기

### 📌 반가산기

1비트 두 개를 더할 때는 올림을 표현하는 carry와 합을 의미하는 sum 이 필요
carry: AND 게이트
sum: XOR

> 1비트의 두 값만 더할 수 있기 때문에, 다비트 연산에서는 LSB 자리에만 쓰고, 나머지 자리에서는 전가산기를 써야 한다

### 📌 전가산기

전압은 물리적으로 방해를 받을 수도 있기 때문에 출력을 제어할 수 있게 된다.

출처: [만들면서 쉽게 배우는 컴퓨터 구조](https://www.inflearn.com/course/%EB%A7%8C%EB%93%A4%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EC%BB%B4%ED%93%A8%ED%84%B0-%EA%B5%AC%EC%A1%B0/dashboard)
