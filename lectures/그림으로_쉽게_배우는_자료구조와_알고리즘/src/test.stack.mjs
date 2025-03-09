import { Stack, ReverseStack } from "./stack.mjs";

// let stack = new Stack();

// console.log("=======First Output========");

// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.push(4);

// stack.printAll()

// console.log(stack.pop().data);
// console.log(stack.pop().data);
// console.log(stack.pop().data);
// console.log(stack.pop().data);

// console.log("=======Second Output========");

// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.push(4);

// console.log(stack.peek().data);

// stack.pop();

// console.log(stack.peek().data);

// console.log(`isEmpty: ${stack.isEmpty()}`);
// stack.pop();
// stack.pop();
// stack.pop();
// console.log(`isEmpty: ${stack.isEmpty()}`);
// console.log(stack.pop());

let reverseStack = new ReverseStack();
let stack = new Stack();

console.log("=======Stack input=======");

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

stack.printAll();

console.log(stack.pop().data);
console.log(stack.pop().data);
console.log(stack.pop().data);
console.log(stack.pop().data);


console.log("=======ReverseStack input=======");
reverseStack.push(1);
reverseStack.push(2);
reverseStack.push(3);
reverseStack.push(4);

reverseStack.printAll();

console.log(reverseStack.pop().data);
console.log(reverseStack.pop().data);
console.log(reverseStack.pop().data);
console.log(reverseStack.pop().data);
