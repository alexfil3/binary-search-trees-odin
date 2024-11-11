import Tree from "./Tree.js";
import prettyPrint from "./helpers/prettyPrint.js";
import randomArray from "./helpers/randomArray.js";
import showNodeData from "./helpers/showNodeData.js";

// enter number of items that you prefer in randomArray;
const tree = new Tree(randomArray(20));

// check if tree is balanced
console.log(tree.isBalanced());
// show the tree
prettyPrint(tree.root)
// show the node.data in order
tree.inOrder(showNodeData);
// show the node.data pre order
tree.preOrder(showNodeData);
// show the node.data post order
tree.postOrder(showNodeData);
// insert values to unbalance the tree
tree.insert(100)
tree.insert(101)
tree.insert(102)
tree.insert(103)
// check that tree is unbalanced
console.log(tree.isBalanced());
// rebalance the tree
tree.rebalance();
// check if tree is balanced
console.log(tree.isBalanced());
// show the tree
prettyPrint(tree.root)
// show the node.data in order
tree.inOrder(showNodeData);
// show the node.data pre order
tree.preOrder(showNodeData);
// show the node.data post order
tree.postOrder(showNodeData);
