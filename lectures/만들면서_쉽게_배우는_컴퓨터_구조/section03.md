## 💻 불 대수

### 📌 불 대수 개요

디지털 장치들은 불 대수 기반으로 작동
true - 1
false - 0

`if((a>b) && (b<c))` 불 대수를 통해 다양한 논리 연산이 가능하다
모든 수는 bit로 이루어져있는데, 비트에서 불 대수를 통해 다른 연산들도 가능하다.

### 📌 불 연산

1. 논리 연산(= 불 연산)
    1. `NOT`: 입력값의 반대
    2. `AND`: A와 B가 같을 때만 1 (논리곱)
    3. `OR`: A와 B중 하나만 1이면 1 (논리합)
    4. `NAND`: `AND` 연산의 반대
    5. `NOR`: 하나라도 1이면 1
    6. `XOR`: 하나만 1일 경우에만 1 (두 입력이 다를 때)

### 📌 불 대수의 성질과 법칙

#### 항등원 (Identity Law)

연산 결과가 자기 자신이 되는 수
| 연산 | 항등원 | 예시 |
|------|--------|------|
| AND (⋅) | 1 | A ⋅ 1 = A |
| OR (+) | 0 | A + 0 = A |

#### 교환법칙 (Commutative Law)

피연산자의 순서를 바꿔도 결과 동일
| 연산 | 예시 |
|------|------|
| AND | A ⋅ B = B ⋅ A |
| OR | A + B = B + A |
| XOR | A ⊕ B = B ⊕ A |

#### 결합법칙 (Associative Law)

괄호의 위치를 바꿔도 결과 동일
| 연산 | 예시 |
|------|------|
| AND | (A ⋅ B) ⋅ C = A ⋅ (B ⋅ C) |
| OR | (A + B) + C = A + (B + C) |
| XOR | (A ⊕ B) ⊕ C = A ⊕ (B ⊕ C) |

#### 분배법칙 (Distributive Law)

법칙 예시
A ⋅ (B + C) = A⋅B + A⋅C
A + (B ⋅ C) = (A + B) ⋅ (A + C)

※ XOR는 완전히 일반적인 분배법칙은 성립하지 않음.

#### 동일법칙 (Idempotent Law)

동일한 값을 두 번 연산해도 원래 값
| 연산 | 예시 |
|------|------|
| AND | A ⋅ A = A |
| OR | A + A = A |

#### 이중 부정법칙 (Double Negation)

두 번 부정하면 원래 값으로 돌아감

#### 흡수법칙

A(A + B)
= AA + AB ← 분배법칙
= A + AB ← AA = A (동일법칙)
= A(1 + B) ← A로 묶음 (결합법칙의 역)
= A(1) ← 1 + B = 1 (항등원)
= A

#### 드모르간 법칙

AND = NOT A OR NOT B
A NOR B = NOT A AND NOT B

### 📌 불 함수

**함수**: 입력 값에 따라 출력 값이 변하는 것

**불함수**: 입력 값과 출력 값 모두 boolean

### 📌 진리표를 변환하는 방법

1. 결과가 0인 행은 제외(Don't care 행)
2. 모든 행을 AND 연산으로 만들고
3. 결과값에 맞춰서 수정

### 📌 카르노 맵

불 방정식을 간소화하기 위해 만들어진 도구

출처: [만들면서 쉽게 배우는 컴퓨터 구조](https://www.inflearn.com/course/%EB%A7%8C%EB%93%A4%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EC%BB%B4%ED%93%A8%ED%84%B0-%EA%B5%AC%EC%A1%B0/dashboard)
