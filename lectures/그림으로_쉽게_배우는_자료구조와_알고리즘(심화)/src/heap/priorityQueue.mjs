import { Heap } from "./heap.mjs";

class PriorityQueue {
    constructor() {
        this.heap = new Heap();
    }

    enqueue(data) {
        return this.heap.insert(data);
    }
    dequeue(data) {
        return this.heap.remove(data);
    }
}

class Monster {
    constructor(name, health) {
        this.name = name;
        this.health = health;
        this.priority = health;
    }
}

let priorityQueue = new PriorityQueue();

priorityQueue.enqueue(new Monster("슬라임", 100));
priorityQueue.enqueue(new Monster("슬라임", 87));
priorityQueue.enqueue(new Monster("슬라임", 21));
priorityQueue.enqueue(new Monster("슬라임", 47));
priorityQueue.enqueue(new Monster("주황버섯", 200));

console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
