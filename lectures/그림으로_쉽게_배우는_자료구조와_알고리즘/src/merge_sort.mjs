function mergeSort(arr, leftIndex, rightIndex) {
    if (leftIndex < rightIndex) {
        let midIndex = parseInt((leftIndex + rightIndex) / 2);
        mergeSort(arr, leftIndex, midIndex);
        mergeSort(arr, midIndex + 1, rightIndex);

        merge(arr, leftIndex, midIndex, rightIndex);
    }
}

function merge(arr, leftIndex, midIndex, rightIndex) {
    let leftAreaIndex = leftIndex;
    let rightAreaIndex = midIndex + 1;

    let tempArea = Array.from({ length: rightIndex + 1 }).fill(0);

    // let tempArea = [];
    // tempArea.length = rightIndex + 1;
    // tempArea.fill(0, 0, rightIndex + 1);

    let tempAreaIndex = leftIndex;
    while (leftAreaIndex <= midIndex && rightAreaIndex <= rightIndex) {
        if (arr[leftAreaIndex] <= arr[rightAreaIndex]) {
            tempArea[tempAreaIndex] = arr[leftAreaIndex++];
        } else {
            tempArea[tempAreaIndex] = arr[rightAreaIndex++];
        }
        tempAreaIndex++;
    }

    if (leftAreaIndex > midIndex) {
        for (let i = rightAreaIndex; i <= rightIndex; i++) {
            tempArea[tempAreaIndex++] = arr[i];
        }
    } else {
        for (let i = leftAreaIndex; i <= midIndex; i++) {
            tempArea[tempAreaIndex++] = arr[i];
        }
    }

    for (let i = leftIndex; i <= rightIndex; i++) {
        arr[i] = tempArea[i];
    }
}

let arr = [3, 5, 2, 4, 1, 7, 8, 6];

mergeSort(arr, 0, arr.length - 1);

console.log(arr);
