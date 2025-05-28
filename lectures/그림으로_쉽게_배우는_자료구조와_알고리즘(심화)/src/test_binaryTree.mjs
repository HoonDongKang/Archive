import { BinaryTree } from "./binaryTree.mjs";

let tree1 = new BinaryTree(1);
let tree2 = new BinaryTree(2);
let tree3 = new BinaryTree(3);
let tree4 = new BinaryTree(4);
let tree5 = new BinaryTree(5);
let tree6 = new BinaryTree(6);
let tree7 = new BinaryTree(7);

tree1.setLeftSubTree(tree2);
tree1.setRightSubTree(tree3);
tree2.setLeftSubTree(tree4);
tree2.setRightSubTree(tree5);
tree3.setLeftSubTree(tree6);
tree3.setRightSubTree(tree7);

console.log("pre order");
tree1.preOrderTraversal(tree1);

console.log("in order");
tree1.inOrderTraversal(tree1);

console.log("post order");
tree1.postOrderTraversal(tree1);
