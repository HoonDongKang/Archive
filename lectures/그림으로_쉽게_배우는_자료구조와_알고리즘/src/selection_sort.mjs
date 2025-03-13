function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minValueIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minValueIndex]) {
                minValueIndex = j;
            }
        }
        [arr[i], arr[minValueIndex]] = [arr[minValueIndex], arr[i]];
    }

    return arr;
}

let arr = [4, 2, 3, 1];

console.log(selectionSort(arr));
