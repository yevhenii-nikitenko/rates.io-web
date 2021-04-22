import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    ADD_EXCHANGES,
    CLEAR_EXCHANGES,
    SET_EXCHANGES,
} from '../constants';

const initialState = {
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
        return { ...state, list: [...state.list, ...action.payload] };
    }

    if (action.type === SET_EXCHANGES) {
        return { ...state, list: action.payload || [] };
    }

    if (action.type === CLEAR_EXCHANGES) {
        return { ...state, list: [] };
    }

    return state;
};

export default exchangesReducer;
