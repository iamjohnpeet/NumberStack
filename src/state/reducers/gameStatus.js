import { UPDATE_HAS_GAME_ENDED } from '../../constants/actions';

const initialState = {
    hasGameEnded: false,
}

const hasGameEnded = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_HAS_GAME_ENDED:
            return {
                hasGameEnded: action.payload,
            }
        default:
            return state;
    }
}

export default hasGameEnded;
