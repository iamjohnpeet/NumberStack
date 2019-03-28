import * as action from '../../constants/state';

export const completeGame = isGameComplete => {
    return {
        type: action.GAME_COMPLETE,
        isGameComplete
    }
}
