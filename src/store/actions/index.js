import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    SET_MAP_CENTER,
    SET_CURRENT_CITY,
    ADD_EXCHANGES,
    SET_EXCHANGES,
    CLEAR_EXCHANGES,
    SET_SEARCH_PARAMS,
    CLEAR_SEARCH_PARAMS
} from '../constants';

export const selectExchange = (payload) => {
    return {
        type: SELECT_EXCHANGE,
        payload,
    };
};

export const deselectExchange = () => {
    return {
        type: DESELECT_EXCHANGE,
    };
};

export const setMapCenter = (payload) => {
    return {
        type: SET_MAP_CENTER,
        payload,
    };
};

export const setCurrentCity = (payload) => {
    return {
        type: SET_CURRENT_CITY,
        payload,
    };
};

export const addExchanges = (payload) => {
    return {
        type: ADD_EXCHANGES,
        payload,
    };
};

export const setExchanges = (payload) => {
    return {
        type: SET_EXCHANGES,
        payload,
    };
};

export const clearExchanges = (payload) => {
    return {
        type: CLEAR_EXCHANGES,
        payload,
    };
};

export const clearSearchParams = (payload) => {
    return {
        type: CLEAR_SEARCH_PARAMS,
        payload,
    };
};

export const setSearchParams = (payload) => {
    return {
        type: SET_SEARCH_PARAMS,
        payload,
    };
};

