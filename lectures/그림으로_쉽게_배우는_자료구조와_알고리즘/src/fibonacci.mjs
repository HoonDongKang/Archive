function fibonacci(n) {
    if (n == 0 || n == 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacci2(n, memo) {
    if (n == 0 || n == 1) return n;

    if (memo[n] == null) {
        memo[n] = fibonacci2(n - 2, memo) + fibonacci2(n - 1, memo);
    }

    return memo[n];
}

function fibonacci3(n, memo) {
    if (n == 0 || n == 1) return n;

    let table = [0, 1];
    for (let i = 2; i <= n; i++) {
        table[i] = table[i - 2] + table[i - 1];
    }

    return table[n];
}

console.time("first fibonacci");
console.log(fibonacci(40));
console.timeEnd("first fibonacci");

console.time("second fibonacci");
console.log(fibonacci2(40, {}));
console.timeEnd("second fibonacci");

console.time("third fibonacci");
console.log(fibonacci3(40, {}));
console.timeEnd("third fibonacci");
