import { Heap } from "./heap.mjs";

class CharacterNode {
    constructor(char, frequency, left = null, right = null) {
        this.char = char;
        this.frequency = frequency;
        this.priority = frequency;
        this.left = left;
        this.right = right;
    }
}

class HuffmanCoding {
    constructor() {
        this.root = null;
        this.frequency = new Map();
    }

    mergingNodes() {
        const heap = new Heap();

        for (let char of this.frequency.keys()) {
            const node = new CharacterNode(char, this.frequency.get(char));
            heap.insert(node);
        }
        while (heap.getSize() > 1) {
            const left = heap.remove().getData();
            const right = heap.remove().getData();

            const merged = new CharacterNode(null, left.frequency + right.frequency, left, right);

            heap.insert(merged);
        }

        this.root = heap.remove().getData();

        return this.root;
    }

    generateCodes(node = this.root, code = "", result = new Map()) {
        if (node === null) return result;

        if (node.left === null && node.right === null) {
            result.set(node.char, code || "0");

            return result;
        }

        this.generateCodes(node.left, code + "0", result);
        this.generateCodes(node.right, code + "1", result);

        return result;
    }

    formatResult(result) {
        const formattedResult = [];
        for (let [char, code] of result.entries()) {
            formattedResult.push([char, code]);
        }

        return formattedResult;
    }

    compress(str) {
        for (let char of str) {
            this.frequency.set(char, (this.frequency.get(char) || 0) + 1);
        }

        this.mergingNodes();
        const result = this.generateCodes();

        return this.formatResult(result);
    }
}

const huffmanCoding = new HuffmanCoding();
const str =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.";
let result = huffmanCoding.compress(str);
console.log(result);
