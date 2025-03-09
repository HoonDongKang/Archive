import { LinkedList } from "./linkedList.mjs";

class Stack {
    constructor() {
        this.list = new LinkedList();
    }

    push(data) {
        this.list.insertAt(0, data);
    }

    pop() {
        try {
            return this.list.deleteAt(0);
        } catch (error) {
            return null;
        }
    }

    peek() {
        return this.list.getNodeAt(0);
    }

    isEmpty() {
        return this.list.count === 0;
    }

    printAll() {
        this.list.printAll()
    }

}

class ReverseStack {
    constructor() {
        this.list = new LinkedList();
    }

    push(data){
        this.list.insertLast(data);
    }

    pop() {
        try {
            return this.list.deleteLast();
        } catch (error) {
            return null;
        }
    }

    peek() {
        return this.list.getNodeAt(this.list.count-1)
    }

    isEmpty() {
        return this.list.count === 0;
    }

    printAll() {
        this.list.printAll()
    }

}

export { Stack, ReverseStack };
