import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    MARKER_IS_OPENED
 } from '../constants';

const initialState = {
    selectedExchaner: null,
    markerIsOpened: false
};
  
function rootReducer(state = initialState, action) {
    if (action.type === SELECT_EXCHANGE) {
        return { ...state, selectedExchaner: action.payload };
    }

    if (action.type === DESELECT_EXCHANGE) {
        return { ...state, selectedExchaner: null };
    }

    if (action.type === MARKER_IS_OPENED) {
        return { ...state, markerIsOpened: action.payload };
    }

    return state;
};
  
export default rootReducer;