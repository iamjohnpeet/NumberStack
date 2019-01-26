export const randomiseArray = array => {
    return array.map(currentItem => [Math.random(), currentItem])
            .sort((currentItem, nextItem) => currentItem[0] - nextItem[0])
            .map(currentItem => currentItem[1]);
}

export const groupArray = (array, chunk) => {
    var i, j = chunk;
    let newArray = [];

    for (i = 0, j = array.length; i < j; i += chunk) {
        newArray.push(array.slice(i, i + chunk));
    }

    return newArray;
}

export const swapArrayElements = (array, element1, element2) => {
    const tempArray = array;

    [tempArray[element1], tempArray[element2]] = [tempArray[element2], tempArray[element1]]

    return tempArray;
}

export const compareArrays = (array1, array2) => {
    if (array1 === array2) {
        return true;
    }

    return false
}
