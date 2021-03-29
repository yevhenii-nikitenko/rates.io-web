import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    MARKER_IS_OPENED
 } from '../constants';

const initialState = {
    selected: null,
    markerIsOpened: false
};

const exchangerReducer = (state = initialState, action) => {
    if (action.type === SELECT_EXCHANGE) {
        return { ...state, selected: action.payload };
    }

    if (action.type === DESELECT_EXCHANGE) {
        return { ...state, selected: null };
    }

    if (action.type === MARKER_IS_OPENED) {
        return { ...state, markerIsOpened: action.payload };
    }

    return state;
};

export default exchangerReducer;