import { Deque } from "./deque.mjs";

let deque = new Deque();

console.log("=======First Output=======");
console.log(`isEmpty: ${deque.isEmpty()}`);
deque.addFirst(1);
deque.addFirst(2);
deque.addFirst(3);
deque.addFirst(4);
deque.addFirst(5);

deque.printAll();

console.log(`isEmpty: ${deque.isEmpty()}`);

console.log("======Second Output========");
deque.removeFirst();
deque.printAll();
deque.removeFirst();
deque.printAll();
deque.removeFirst();
deque.printAll();
deque.removeFirst();
deque.printAll();
deque.removeFirst();
deque.printAll();

console.log("=======Third Output=======");
console.log(`isEmpty: ${deque.isEmpty()}`);
deque.addLast(1);
deque.addLast(2);
deque.addLast(3);
deque.addLast(4);
deque.addLast(5);

deque.printAll();

console.log("======Fourth Output========");
deque.removeLast();
deque.printAll();
deque.removeLast();
deque.printAll();
deque.removeLast();
deque.printAll();
deque.removeLast();
deque.printAll();
deque.removeLast();
deque.printAll();

console.log(`isEmpty: ${deque.isEmpty()}`);
