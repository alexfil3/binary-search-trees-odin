// n stands for number of items in array
function randomArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        const num = Math.floor(Math.random() * 999);

        arr.push(num);
    }

    return arr;
}

export default randomArray;