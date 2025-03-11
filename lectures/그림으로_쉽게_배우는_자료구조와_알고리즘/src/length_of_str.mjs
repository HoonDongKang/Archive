function strLength(arr) {
    if (!arr[0]) return 0;
    return strLength(arr.slice(0, -1)) + 1;
}

console.log(strLength("abcde"));
