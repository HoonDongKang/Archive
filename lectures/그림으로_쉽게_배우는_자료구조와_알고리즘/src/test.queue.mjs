import { Queue } from "./queue.mjs";

let queue = new Queue();

console.log("=======First Output========");

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.front().data);

console.log("=======Second Output========");

queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();

console.log(queue.isEmpty());
