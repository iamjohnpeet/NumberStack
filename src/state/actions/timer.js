import { UPDATE_TIMER } from '../../constants/actions';

export const updateTimer = milliseconds => {
    return ({
        type: UPDATE_TIMER,
        payload: milliseconds,
    })
};
