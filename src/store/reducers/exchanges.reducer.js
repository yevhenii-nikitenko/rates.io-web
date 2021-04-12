import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    ADD_EXCHANGES,
    CLEAR_EXCHANGES,
    SET_PRESELECTED,
} from '../constants';

const initialState = {
    preselected: false, // pin is selected
    selected: null, // selected exchanger
    list: [], // list of loaded exchangers
};

const exchangesReducer = (state = initialState, action) => {
    if (action.type === SELECT_EXCHANGE) {
        return { ...state, selected: action.payload };
    }

    if (action.type === DESELECT_EXCHANGE) {
        return { ...state, selected: null };
    }

    if (action.type === ADD_EXCHANGES) {
        return { ...state, list: [...this.state.list, ...action.payload] };
    }

    if (action.type === CLEAR_EXCHANGES) {
        return { ...state, list: [] };
    }

    if (action.type === SET_PRESELECTED) {
        return { ...state, preselected: action.payload };
    }

    return state;
};

export default exchangesReducer;
