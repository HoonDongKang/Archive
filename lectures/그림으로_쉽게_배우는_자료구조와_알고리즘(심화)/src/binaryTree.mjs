class BinaryTree {
    constructor(data, leftTree = null, rightTree = null) {
        this.data = data;
        this.leftSubTree = leftTree;
        this.rightSubTree = rightTree;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getLeftSubTree() {
        return this.leftSubTree;
    }

    getRightSubTree() {
        return this.rightSubTree;
    }

    setLeftSubTree(tree) {
        this.leftSubTree = tree;
    }

    setRightSubTree(tree) {
        this.rightSubTree = tree;
    }

    preOrderTraversal(tree) {
        if (tree == null) return;

        console.log(tree.data);
        this.preOrderTraversal(tree.getLeftSubTree());
        this.preOrderTraversal(tree.getRightSubTree());
    }

    inOrderTraversal(tree) {
        if (tree == null) return;

        this.preOrderTraversal(tree.getLeftSubTree());
        console.log(tree.data);
        this.preOrderTraversal(tree.getRightSubTree());
    }

    postOrderTraversal(tree) {
        if (tree == null) return;

        this.preOrderTraversal(tree.getLeftSubTree());
        this.preOrderTraversal(tree.getRightSubTree());
        console.log(tree.data);
    }
}

export { BinaryTree };
