function power(x, n) {
    if (!n) return 1;
    return power(x, n - 1) * x;
}

console.log(power(2, 5));
