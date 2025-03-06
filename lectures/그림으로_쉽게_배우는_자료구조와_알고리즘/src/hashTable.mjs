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

    set(key, value) {
        this.arr[this.hashFunction(key)].insertAt(0, new HashData(key, value));
    }

    get(key) {
        let currentNode = this.arr[this.hashFunction(key)].head;

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
