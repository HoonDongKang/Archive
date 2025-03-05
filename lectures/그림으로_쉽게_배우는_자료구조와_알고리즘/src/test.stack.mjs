import { Stack } from "./stack.mjs";

let stack = new Stack();

console.log("=======First Output========");

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack.pop().data);
console.log(stack.pop().data);
console.log(stack.pop().data);
console.log(stack.pop().data);

console.log("=======Second Output========");

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack.peek().data);

stack.pop();

console.log(stack.peek().data);

console.log(`isEmpty: ${stack.isEmpty()}`);
stack.pop();
stack.pop();
stack.pop();
console.log(`isEmpty: ${stack.isEmpty()}`);
console.log(stack.pop());
