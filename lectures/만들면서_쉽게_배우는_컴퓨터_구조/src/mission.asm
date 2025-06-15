LOADA 15    // A값 로드
SUB 14      // A-B 계산
JMPC 7      // A<B면 7번지로
JMPZ 9      // A==B면 9번지로
LOADA 12    // A>B: 값 1 출력
OUT
HLT
LOADA 13    // A<B: 값 2 출력
OUT
LOADA 11    // A==B: 값 0 출력
OUT
0          // A==B 출력값
1          // A>B 출력값
2          // A<B 출력값
7          // B값
7          // A값
