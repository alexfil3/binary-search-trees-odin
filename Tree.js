import Node from "./Node.js";
import sortArray from "./helpers/sortArray.js";

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

    // if we don't find a value in our root
    // 1 case delete leaf node
    // 2 case delete a node with only one child
    // 3 case the complex one is to delete node with two child
    deleteItem(value, node = this.root) {
        if (node === null) return null;

        if (node.data < value) {
            node.right = this.deleteItem(value, node.right);
        } else if (node.data > value) {
            node.left = this.deleteItem(value, node.left);
        } else {
            if (node.left === null) {
                const temp = node.right;

                return temp;
            } else if (node.right === null) {
                const temp = node.left;
            }
        }
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

// const tree = new Tree([1, 2, 3, 4]);
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

tree.insert(100)
tree.prettyPrint()
