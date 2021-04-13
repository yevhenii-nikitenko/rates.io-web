import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    SET_GOOGLE_MAPS_API,
    SET_MAP_CENTER,
    SET_CURRENT_CITY,
    ADD_EXCHANGES,
    CLEAR_EXCHANGES,
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

export const setGoogleMapsApi = (payload) => {
    return {
        type: SET_GOOGLE_MAPS_API,
        payload,
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

export const clearExchanges = (payload) => {
    return {
        type: CLEAR_EXCHANGES,
        payload,
    };
};

