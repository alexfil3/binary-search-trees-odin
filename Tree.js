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

    find(value, node = this.root) {
        if (node === null) return null;

        if (node.data === value) return node;

        if (node.data > value) return this.find(value, node.left);
        else return this.find(value, node.right);
    }

    levelOrderRecursive(callback, queue = [this.root]) {
        if (!callback) throw new Error('Callback is required');

        if (queue.length < 1) return;

        const current = queue.shift();

        callback(current);

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);

        this.levelOrderRecursive(callback, queue);
    }

    levelOrderIterative(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required');

        if (node === null) return;

        const queue = [node];

        while (queue.length > 0) {
            const current = queue.shift();

            callback(current);

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }

    inOrder(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required');

        if (node === null) return;

        if (node.left) this.inOrder(callback, node.left);
        callback(node);
        if (node.right) this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required');

        if (node === null) return;

        callback(node);
        if (node.left) this.preOrder(callback, node.left);
        if (node.right) this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (!callback) throw new Error('Callback is required');

        if (node === null) return;

        if (node.left) this.postOrder(callback, node.left);
        if (node.right) this.postOrder(callback, node.right);
        callback(node);
    }

    height(node = this.root) {
        if (node === null) return 0;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(nodeToFind, node = this.root) {
        if (node === null) return -1;

        if (node === nodeToFind ) return 0;

        if (node.data > nodeToFind.data) {
            const leftDepth = this.depth(nodeToFind, node.left);

           return leftDepth === -1 ? -1 : leftDepth + 1; 
        }
        if (node.data < nodeToFind.data) {
            const rightDepth = this.depth(nodeToFind, node.right);

            return rightDepth === -1 ? -1 : rightDepth + 1;
        }
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        const heightDiff = Math.abs(leftHeight - rightHeight);

        if (heightDiff > 1) {
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    } 
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

// tree.insert(100)
// tree.insert(101)
// tree.insert(102)
// tree.insert(103)
prettyPrint(tree.root);
console.log(tree.isBalanced())
