import { Node, LinkedList } from "./linkedList.mjs";

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);

node1.next = node2;
node2.next = node3;

console.log(node1.data);
console.log(node1.next.data);
console.log(node1.next.next.data);

let list = new LinkedList();

console.log("=======Call InsertAt=======");
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
list.insertAt(3, 3);
list.insertAt(4, 4);

list.printAll();

console.log("=======Call Clear=======");
list.clear();
list.printAll();

console.log("=======Call insertLast=======");
list.insertLast(0);
list.insertLast(1);
list.insertLast(2);
list.printAll();

console.log("=======Call deleteAt=======");
list.deleteAt(0);
list.deleteAt(1);
list.printAll();

console.log("=======Call deleteLast=======");
list.insertLast(5);
list.deleteLast();
list.printAll();

console.log("=======Call getNodeAt=======");
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);
list.insertLast(4);
list.insertLast(5);

let secondNode = list.getNodeAt(2);
console.log(secondNode);
