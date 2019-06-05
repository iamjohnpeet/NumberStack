import * as action from '../../constants/state';

export const updateTime = time => {
    return {
        type: action.UPDATE_TIME,
        time
    }
}
