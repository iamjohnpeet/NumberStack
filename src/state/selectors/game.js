import { data, emptyStack } from '../../data';
import { randomiseArray, groupArray } from '../../lib/utils';

export const getShuffledData = () => {
    const shuffledData = randomiseArray(data);

    emptyStack.forEach(emptyBlock => {
        shuffledData.push(emptyBlock);
    })

    return shuffledData;
};

export const getGroupData = data => {
    const groupedData = groupArray(data, 3);

    return groupedData;
}
