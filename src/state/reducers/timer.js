import { UPDATE_TIMER } from '../../constants/actions';

const initialState = {
    time: 0,
}

const timer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TIMER:
            return {
                time: action.payload,
            }
        default:
            return state;
    }
}

export default timer;
