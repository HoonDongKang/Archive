hanoi(3, "A", "C", "B");

function hanoi(count, from, to, temp) {
    if (count === 0) return;
    hanoi(count - 1, from, temp, to);

    console.log(`Move ${count} block from ${from} to ${to}`);

    hanoi(count - 1, temp, to, from);
}
