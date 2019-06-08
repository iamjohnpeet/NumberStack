import { combineReducers } from 'redux';
import timer from './timer';
import hasGameEnded from './gameStatus';

export default combineReducers({
    gameStatus: hasGameEnded,
    timer,
})
