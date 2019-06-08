import { UPDATE_HAS_GAME_ENDED } from '../../constants/actions';

export const updateHasGameEnded = hasGameEnded => {
    return ({
        type: UPDATE_HAS_GAME_ENDED,
        payload: hasGameEnded,
    })
};
