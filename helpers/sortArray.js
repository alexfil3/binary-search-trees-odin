sortArray(arr) {
    const sortedUniqueArr = arr.reduce((acc, n) => {
        if (!acc.includes(n)) acc.push(n);
        return acc;
    }, []).sort((a, b) => a - b);

    return sortedUniqueArr;
}

export default sortArray;