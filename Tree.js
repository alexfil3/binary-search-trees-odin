import Node from "./Node.js";
import sortArray from "./helpers/sortArray.js";
import prettyPrint from "./helpers/prettyPrint.js";
import getSuccessor from "./helpers/getSuccessor.js";

class Tree {
    constructor(arr) {
        this.root = this.buildTree(sortArray(arr));
    }

    buildTree(arr) {
        if (arr.length === 0) return null;
        if (arr.length === 1) return new Node(arr[0]);

        const mid = Math.floor((arr.length - 1) / 2);

        const root = new Node(arr[mid]);
        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));

        return root;
    }

    insert(value, node = this.root) {
        if (node === null) return new Node(value);

        if (node.data === value) return node;

        if (node.data > value) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (node === null) return null;

        if (node.data < value) {
            node.right = this.deleteItem(value, node.right);
        } else if (node.data > value) {
            node.left = this.deleteItem(value, node.left);
        } else {
            if (node.left === null) return node.right;    
            if (node.right === null) return node.left;

            const successor = getSuccessor(node);
            node.data = successor.data;
            node.right = this.deleteItem(successor.data, node.right);
        }

        return node;
    }
}

// const tree = new Tree([1, 2, 3, 4]);
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

tree.insert(100)
prettyPrint(tree.root);

tree.deleteItem(0)
prettyPrint(tree.root);
