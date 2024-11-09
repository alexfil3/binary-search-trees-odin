function getSuccessor(node) {
    let temp = node.right;

    while(temp !== null && temp.left !== null) {
        temp = temp.left;
    }

    return temp;
}

export default getSuccessor;