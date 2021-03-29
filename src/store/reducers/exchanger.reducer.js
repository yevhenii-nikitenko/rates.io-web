import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    MARKER_IS_OPENED
 } from '../constants';

// const initialState = {
//     selected: null,
//     markerIsOpened: false
// };

const initialState = null;

const exchangerReducer = (state = initialState, action) => {
    if (action.type === SELECT_EXCHANGE) {
        return { ...action.payload };
    }

    if (action.type === DESELECT_EXCHANGE) {
        return initialState;
    }

    // if (action.type === MARKER_IS_OPENED) {
    //     return { ...state, markerIsOpened: action.payload };
    // }

    return state;
};

export default exchangerReducer;