import { DoublyLinkedList } from "./DoublylinkedList.mjs";

class HashData {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class HashTable {
    constructor() {
        this.arr = [];
        for (let i = 0; i < 10; i++) {
            this.arr[i] = new DoublyLinkedList();
        }
    }

    hashFunction(number) {
        return number % 10;
    }

    hashNameFunction(name) {
        // 1. 이름의 첫 자 유니코드로만 설정
        // return name.charCodeAt(0) % 10;

        // 2. 이름의 각 유니코드를 더한 값
        // return [...name].reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 10;

        // 3. 첫 자의 유니코드의 각 숫자를 합친 값
        return [...(name.charCodeAt(0) + '')].reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 10;
    }

    getDuplicateFrequency(arr) {
        let array = arr.map((name) => this.hashNameFunction(name));
        const frequency = array.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {});

        let duplicatedCount = 0;
        let totalCount = array.length;

        for (let key in frequency) {
            if (frequency[key] > 1) {
                duplicatedCount += frequency[key];
            }
        }

        console.log(Math.round((duplicatedCount / totalCount) * 100 * 10) / 10);
    }

    set(key, value) {
        let insertValue = value ? value : key;
        console.log(this.hashNameFunction(key))
        this.arr[this.hashNameFunction(key)].insertAt(0, new HashData(key, insertValue));
    }

    get(key) {
        let currentNode = this.arr[this.hashNameFunction(key)].head;

        while (currentNode != null) {
            if (currentNode.data.key === key) {
                return currentNode.data.value;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    remove(key) {
        let list = this.arr[this.hashFunction(key)];
        let currentNode = list.head;
        let deleteIndex = 0;

        while (currentNode != null) {
            if (currentNode.data.key === key) {
                return list.deleteAt(deleteIndex);
            }

            currentNode = currentNode.next;
            deleteIndex++;
        }

        return null;
    }
}

class HashTableWithLinearProbing {
    constructor() {
        this.arr = [];
    }

    hashFunction(number) {
        return number % 10;
    }

    set(key, value) {
        let index = this.hashFunction(key);
        while (this.arr[index] && this.arr[index] !== "DELETED") {
            index++;
        }

        this.arr[index] = new HashData(key, value);
    }

    get(key) {
        let index = this.hashFunction(key);
        while (this.arr[index] && this.arr[index] !== "DELETED") {
            if (this.arr[index].key === key) return this.arr[index].value;

            index++;
        }

        return null;
    }

    remove(key) {
        let index = this.hashFunction(key);
        while (this.arr[index]) {
            if (this.arr[index].key === key && this.arr[index] !== "DELETED") {
                const deletedData = this.arr[index];
                this.arr[index] = "DELETED";

                return deletedData;
            }

            index++;
        }

        return null;
    }
}

export { HashTable, HashTableWithLinearProbing };
